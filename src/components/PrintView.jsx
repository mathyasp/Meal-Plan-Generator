import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrintView() {
  const meals = useSelector(state => state.mealPlan.meals)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Print controls - hidden when printing */}
      <div className="print:hidden mb-8 flex justify-end space-x-4">
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
        >
          Back to Meal Plan
        </button>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Print
        </button>
      </div>
      
      {/* Print content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meal Plan</h1>
        
        <div className="space-y-8">
          {meals.map(meal => (
            <div key={meal.day} className="break-inside-avoid">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Day {meal.day}</h2>
              
              <div className="space-y-6">
                {meal.breakfast && meal.breakfast.name && (
                  <div className="break-inside-avoid">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Breakfast</h3>
                    <p className="text-gray-700 mb-3">{meal.breakfast.name}</p>
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
                  <div className="break-inside-avoid">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Lunch</h3>
                    <p className="text-gray-700 mb-3">{meal.lunch.name}</p>
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
                  <div className="break-inside-avoid">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Dinner</h3>
                    <p className="text-gray-700 mb-3">{meal.dinner.name}</p>
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
  )
}

export default PrintView 