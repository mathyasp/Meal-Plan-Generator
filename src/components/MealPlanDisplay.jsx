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
      <div>
        <div>Loading your meal plan...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>Please try again</p>
      </div>
    )
  }

  if (meals.length === 0) {
    return (
      <div>
        <p>Fill out the form to generate your meal plan</p>
        <p>We'll create a personalized plan based on your preferences</p>
        <button onClick={handleViewSaved}>View Saved Plan</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Your Meal Plan</h2>
      <div>
        <button onClick={handleSavePlan}>Save Plan</button>
        <button onClick={handlePrintPlan}>Print Plan</button>
        <button onClick={handleViewSaved}>View Saved Plan</button>
      </div>
      <div>
        {meals.map(meal => (
          <div key={meal.day}>
            <h3>Day {meal.day}</h3>
            <div>
              {meal.breakfast && meal.breakfast.name && (
                <div>
                  <h4>Breakfast</h4>
                  <p>{meal.breakfast.name}</p>
                  {meal.breakfast.ingredients && meal.breakfast.ingredients.length > 0 && (
                    <div>
                      <h5>Ingredients:</h5>
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
                <div>
                  <h4>Lunch</h4>
                  <p>{meal.lunch.name}</p>
                  {meal.lunch.ingredients && meal.lunch.ingredients.length > 0 && (
                    <div>
                      <h5>Ingredients:</h5>
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
                <div>
                  <h4>Dinner</h4>
                  <p>{meal.dinner.name}</p>
                  {meal.dinner.ingredients && meal.dinner.ingredients.length > 0 && (
                    <div>
                      <h5>Ingredients:</h5>
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

export default MealPlanDisplay 