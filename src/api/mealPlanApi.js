// Mock API response for testing
export const generateMealPlan = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock response
  return {
    meals: [
      {
        day: 1,
        breakfast: "Scrambled Eggs with Toast",
        lunch: "Chicken Sandwich",
        dinner: "Spaghetti with Tomato Sauce"
      },
      {
        day: 2,
        breakfast: "Cereal with Milk",
        lunch: "Rice and Beans",
        dinner: "Baked Chicken with Potatoes"
      }
    ]
  }
} 