import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const generateMealPlan = createAsyncThunk(
  'mealPlan/generate',
  async (formData) => {
    const { days, dietaryRestrictions, cuisine, ingredients, mode, meals } = formData
    
    let prompt = `Generate a ${days}-day meal plan`
    
    if (dietaryRestrictions) {
      prompt += ` that is ${dietaryRestrictions}`
    }
    
    if (cuisine) {
      prompt += ` with ${cuisine} cuisine`
    }
    
    if (mode === 'ingredients' && ingredients) {
      prompt += `. Use these ingredients: ${ingredients}`
    }

    // Add selected meals to prompt
    const selectedMeals = Object.entries(meals)
      .filter(([, selected]) => selected)
      .map(([meal]) => meal)
    
    prompt += `. Include these meals: ${selectedMeals.join(', ')}`
    prompt += `. For each meal, provide a simple recipe with 4-6 essential ingredients. Format the response exactly like this:
Day 1:
Breakfast: [meal name]
Ingredients:
- ingredient 1
- ingredient 2
- ingredient 3
- ingredient 4

Keep each recipe simple and focused. Only include ingredients that are actually needed for that specific meal. Do not mix ingredients from other meals.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful meal planning assistant. Generate simple meal plans with focused recipes. Each recipe should have 4-6 essential ingredients. Keep ingredients specific to each meal and do not mix ingredients between different meals."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate meal plan')
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the response into a structured format
    const mealsList = []
    const lines = content.split('\n')
    let currentDay = null
    let currentMeal = null

    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (trimmedLine.includes('Day')) {
        if (currentDay) {
          mealsList.push(currentDay)
        }
        currentDay = {
          day: mealsList.length + 1,
          breakfast: { name: '', ingredients: [] },
          lunch: { name: '', ingredients: [] },
          dinner: { name: '', ingredients: [] }
        }
      } else if (trimmedLine.includes('Breakfast') && meals.breakfast) {
        currentMeal = 'breakfast'
        currentDay.breakfast.name = trimmedLine.split(':')[1].trim()
      } else if (trimmedLine.includes('Lunch') && meals.lunch) {
        currentMeal = 'lunch'
        currentDay.lunch.name = trimmedLine.split(':')[1].trim()
      } else if (trimmedLine.includes('Dinner') && meals.dinner) {
        currentMeal = 'dinner'
        currentDay.dinner.name = trimmedLine.split(':')[1].trim()
      } else if (trimmedLine.startsWith('-') && currentMeal) {
        const ingredient = trimmedLine.substring(1).trim()
        if (currentMeal === 'breakfast' && meals.breakfast) {
          currentDay.breakfast.ingredients.push(ingredient)
        } else if (currentMeal === 'lunch' && meals.lunch) {
          currentDay.lunch.ingredients.push(ingredient)
        } else if (currentMeal === 'dinner' && meals.dinner) {
          currentDay.dinner.ingredients.push(ingredient)
        }
      }
    }

    if (currentDay) {
      mealsList.push(currentDay)
    }

    return mealsList
  }
)

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: {
    meals: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateMealPlan.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(generateMealPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.meals = action.payload
      })
      .addCase(generateMealPlan.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export default mealPlanSlice.reducer 