import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrintView() {
  const meals = useSelector(state => state.mealPlan.meals)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="print-view">
      <div className="print-controls">
        <button onClick={handleBack}>Back to Meal Plan</button>
        <button onClick={() => window.print()}>Print</button>
      </div>
      
      <div className="print-content">
        <h1>Meal Plan</h1>
        {meals.map(meal => (
          <div key={meal.day} className="meal-day">
            <h2>Day {meal.day}</h2>
            <div className="meals">
              {meal.breakfast && meal.breakfast.name && (
                <div className="meal">
                  <h3>Breakfast</h3>
                  <p>{meal.breakfast.name}</p>
                  {meal.breakfast.ingredients && meal.breakfast.ingredients.length > 0 && (
                    <div>
                      <h4>Ingredients:</h4>
                      <ul>
                        {meal.breakfast.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {meal.lunch && meal.lunch.name && (
                <div className="meal">
                  <h3>Lunch</h3>
                  <p>{meal.lunch.name}</p>
                  {meal.lunch.ingredients && meal.lunch.ingredients.length > 0 && (
                    <div>
                      <h4>Ingredients:</h4>
                      <ul>
                        {meal.lunch.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {meal.dinner && meal.dinner.name && (
                <div className="meal">
                  <h3>Dinner</h3>
                  <p>{meal.dinner.name}</p>
                  {meal.dinner.ingredients && meal.dinner.ingredients.length > 0 && (
                    <div>
                      <h4>Ingredients:</h4>
                      <ul>
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

export default PrintView 