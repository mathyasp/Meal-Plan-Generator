import { useNavigate } from 'react-router-dom'

function SavedPlans() {
  const navigate = useNavigate()
  
  const savedPlan = localStorage.getItem('savedMealPlan')
  const planData = savedPlan ? JSON.parse(savedPlan) : null

  return (
    <div>
      <div>
        <button onClick={() => navigate('/')}>Back to Meal Plan</button>
      </div>
      
      <h1>Saved Meal Plan</h1>
      
      {planData ? (
        <div>
          <p>Saved on: {new Date(planData.date).toLocaleDateString()}</p>
          <div>
            {planData.meals.map(meal => (
              <div key={meal.day}>
                <h2>Day {meal.day}</h2>
                <div>
                  <div>
                    <h3>Breakfast</h3>
                    <p>{meal.breakfast}</p>
                  </div>
                  <div>
                    <h3>Lunch</h3>
                    <p>{meal.lunch}</p>
                  </div>
                  <div>
                    <h3>Dinner</h3>
                    <p>{meal.dinner}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No saved meal plan found</p>
      )}
    </div>
  )
}

export default SavedPlans