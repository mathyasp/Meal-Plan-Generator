// Mock API response for testing
export const generateMealPlan = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Use the ingredients from form data
  const ingredients = formData.ingredients.split(',').map(i => i.trim())
  
  // Mock response using the ingredients
  return {
    meals: [
      {
        day: 1,
        breakfast: "Scrambled Eggs with Toast",
        lunch: `${ingredients[0]} and ${ingredients[1]} Salad`,
        dinner: `Baked ${ingredients[0]} with ${ingredients[2]}`
      },
      {
        day: 2,
        breakfast: "Cereal with Milk",
        lunch: `${ingredients[1]} and Beans`,
        dinner: `${ingredients[0]} with ${ingredients[2]} Sauce`
      }
    ]
  }
} 