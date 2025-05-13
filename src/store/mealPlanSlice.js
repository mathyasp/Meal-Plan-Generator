import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

function buildPrompt(formData) {
  const { days, dietaryRestrictions, cuisine, ingredients, mode, meals } = formData
  
  let prompt = `Generate a ${days}-day meal plan`
  
  if (dietaryRestrictions) {
    prompt += ` that is ${dietaryRestrictions}`
  }
  if (cuisine) {
    prompt += `. IMPORTANT: All meals must be ${cuisine} cuisine. Use traditional ${cuisine} ingredients and cooking methods.`
  }
  
  if (mode === 'ingredients' && ingredients) {
    prompt += `. IMPORTANT: You must ONLY use ingredients from this list: ${ingredients}. You do not need to use all ingredients in each recipe - just use what makes sense for each meal. Do not add any ingredients that aren't in this list.`
  }

  const selectedMeals = Object.entries(meals)
    .filter(([, selected]) => selected)
    .map(([meal]) => meal)
  prompt += `. Include these meals: ${selectedMeals.join(', ')}`
  
  if (mode === 'ingredients') {
    prompt += `. For each meal, create a recipe using ONLY the ingredients provided above. Format the response exactly like this:
Day 1:
Breakfast: [meal name]
Ingredients:
- ingredient 1 (must be from the provided list)
- ingredient 2 (must be from the provided list)
- ingredient 3 (must be from the provided list)
- ingredient 4 (must be from the provided list)

Keep each recipe simple and focused. Only use ingredients from the provided list. Do not add any ingredients that weren't provided.`
  } else {
    prompt += `. For each meal, provide a simple recipe with 4-6 essential ingredients. Format the response exactly like this:
Day 1:
Breakfast: [meal name]
Ingredients:
- ingredient 1
- ingredient 2
- ingredient 3
- ingredient 4

Keep each recipe simple and focused. Only include ingredients that are actually needed for that specific meal. Do not mix ingredients from other meals.`
  }

  return prompt
}

function parseMealPlanResponse(content, selectedMeals) {
  const mealsList = []
  const lines = content.split('\n')
  let currentDay = null
  let currentMeal = null

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (!trimmedLine) continue

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
      continue
    }

    const mealTypes = {
      'Breakfast': 'breakfast',
      'Lunch': 'lunch',
      'Dinner': 'dinner'
    }

    for (const [mealName, mealType] of Object.entries(mealTypes)) {
      if (trimmedLine.includes(mealName) && selectedMeals[mealType]) {
        currentMeal = mealType
        currentDay[mealType].name = trimmedLine.split(':')[1].trim()
        break
      }
    }

    if (trimmedLine.startsWith('-') && currentMeal && selectedMeals[currentMeal]) {
      const ingredient = trimmedLine.substring(1).trim()
      currentDay[currentMeal].ingredients.push(ingredient)
    }
  }

  if (currentDay) {
    mealsList.push(currentDay)
  }

  return mealsList
}

export const generateMealPlan = createAsyncThunk(
  'mealPlan/generate',
  async (formData) => {
    const prompt = buildPrompt(formData)

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
            content: formData.mode === 'ingredients' 
              ? "You are a helpful meal planning assistant. Generate meal plans using ONLY the ingredients provided by the user. Do not add any ingredients that weren't provided. Keep recipes simple and focused."
              : "You are a helpful meal planning assistant. Generate simple meal plans with focused recipes. Each recipe should have 4-6 essential ingredients. Keep ingredients specific to each meal and do not mix ingredients between different meals."
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
    return parseMealPlanResponse(content, formData.meals)
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