import { useNavigate } from 'react-router-dom'

function SavedPlans() {
  const navigate = useNavigate()
  const savedPlan = JSON.parse(localStorage.getItem('savedMealPlan'))

  const handleBack = () => {
    navigate('/')
  }

  if (!savedPlan || !savedPlan.meals) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto p-6 text-center bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600 mb-4">No saved meal plan found.</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Back to Meal Planner
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Saved Meal Plan</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Saved on: {new Date(savedPlan.date).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Back to Meal Planner
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {savedPlan.meals.map(meal => (
              <div key={meal.day} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Day {meal.day}</h2>
                </div>
                <div className="p-6 space-y-6">
                  {meal.breakfast && meal.breakfast.name && (
                    <div className="border-b border-gray-100 pb-6 last:border-0">
                      <h3 className="text-lg font-medium text-indigo-600 mb-2">Breakfast</h3>
                      <p className="text-gray-800 mb-3">{meal.breakfast.name}</p>
                      {meal.breakfast.ingredients && meal.breakfast.ingredients.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
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
                      <h3 className="text-lg font-medium text-indigo-600 mb-2">Lunch</h3>
                      <p className="text-gray-800 mb-3">{meal.lunch.name}</p>
                      {meal.lunch.ingredients && meal.lunch.ingredients.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
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
                      <h3 className="text-lg font-medium text-indigo-600 mb-2">Dinner</h3>
                      <p className="text-gray-800 mb-3">{meal.dinner.name}</p>
                      {meal.dinner.ingredients && meal.dinner.ingredients.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
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
      </div>
    </div>
  )
}

export default SavedPlans