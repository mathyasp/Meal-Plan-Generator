export const generateMealPlan = async (formData) => {
  try {
    console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY ? 'Present' : 'Missing')
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful meal planning assistant. Generate a meal plan based on the given ingredients and preferences. Always respond with valid JSON."
          },
          {
            role: "user",
            content: `Create a ${formData.timeline}-day meal plan using these ingredients: ${formData.ingredients}. 
            Theme: ${formData.theme}. 
            Dietary preferences: ${formData.preferences}. 
            Return the response in this exact JSON format:
            {
              "meals": [
                {
                  "day": 1,
                  "breakfast": "meal name",
                  "lunch": "meal name",
                  "dinner": "meal name"
                }
              ]
            }`
          }
        ]
      })
    })

    const data = await response.json()
    console.log('API Response:', data)
    console.log('Message Content:', data.choices[0].message.content)
    
    if (!response.ok) {
      console.error('API Error:', data)
      throw new Error(data.error?.message || 'Failed to generate meal plan')
    }

    const mealPlan = JSON.parse(data.choices[0].message.content)
    return mealPlan
  } catch (error) {
    console.error('Error in generateMealPlan:', error)
    throw error
  }
}