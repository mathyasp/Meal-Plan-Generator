import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MealPlanDisplay() {
  const meals = useSelector(state => state.mealPlan.meals)
  const isLoading = useSelector(state => state.mealPlan.isLoading)
  const error = useSelector(state => state.mealPlan.error)
  const navigate = useNavigate()

  const handleSavePlan = () => {
    const planData = {
      date: new Date().toISOString(),
      meals: meals
    }
    localStorage.setItem('savedMealPlan', JSON.stringify(planData))
    navigate('/saved')
  }

  const handlePrintPlan = () => {
    navigate('/print')
  }

  const handleViewSaved = () => {
    navigate('/saved')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-lg text-gray-600">Loading your meal plan...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg border border-red-100">
        <p className="text-red-600 font-medium">Error: {error}</p>
        <p className="text-red-500 mt-1">Please try again</p>
      </div>
    )
  }

  if (meals.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center bg-white rounded-lg shadow-sm">
        <p className="text-lg text-gray-600 mb-2">Fill out the form to generate your meal plan</p>
        <p className="text-gray-500 mb-6">We'll create a personalized plan based on your preferences</p>
        <button 
          onClick={handleViewSaved}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
        >
          View Saved Plan
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Meal Plan</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleSavePlan}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Plan
          </button>
          <button 
            onClick={handlePrintPlan}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            Print Plan
          </button>
          <button 
            onClick={handleViewSaved}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            View Saved Plan
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {meals.map(meal => (
          <div key={meal.day} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Day {meal.day}</h3>
            </div>
            <div className="p-6 space-y-6">
              {meal.breakfast && meal.breakfast.name && (
                <div className="border-b border-gray-100 pb-6 last:border-0">
                  <h4 className="text-lg font-medium text-indigo-600 mb-2">Breakfast</h4>
                  <p className="text-gray-800 mb-3">{meal.breakfast.name}</p>
                  {meal.breakfast.ingredients && meal.breakfast.ingredients.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {meal.breakfast.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {meal.lunch && meal.lunch.name && (
                <div className="border-b border-gray-100 pb-6 last:border-0">
                  <h4 className="text-lg font-medium text-indigo-600 mb-2">Lunch</h4>
                  <p className="text-gray-800 mb-3">{meal.lunch.name}</p>
                  {meal.lunch.ingredients && meal.lunch.ingredients.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {meal.lunch.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {meal.dinner && meal.dinner.name && (
                <div className="border-b border-gray-100 pb-6 last:border-0">
                  <h4 className="text-lg font-medium text-indigo-600 mb-2">Dinner</h4>
                  <p className="text-gray-800 mb-3">{meal.dinner.name}</p>
                  {meal.dinner.ingredients && meal.dinner.ingredients.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {meal.dinner.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MealPlanDisplay 