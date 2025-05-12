import { useNavigate } from 'react-router-dom'

function SavedPlans() {
  const navigate = useNavigate()
  const savedPlan = JSON.parse(localStorage.getItem('savedMealPlan'))

  const handleBack = () => {
    navigate('/')
  }

  if (!savedPlan) {
    return (
      <div>
        <h2>No Saved Plan</h2>
        <p>You haven't saved any meal plans yet.</p>
        <button onClick={handleBack}>Back to Meal Planner</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Saved Meal Plan</h2>
      <p>Saved on: {new Date(savedPlan.date).toLocaleDateString()}</p>
      <div>
        {savedPlan.meals.map(meal => (
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
      <button onClick={handleBack}>Back to Meal Planner</button>
    </div>
  )
}

export default SavedPlans