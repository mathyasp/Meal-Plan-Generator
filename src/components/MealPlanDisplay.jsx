import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MealPlanDisplay() {
  const meals = useSelector(state => state.mealPlan.meals)
  const isLoading = useSelector(state => state.mealPlan.isLoading)
  const error = useSelector(state => state.mealPlan.error)
  const [saveMessage, setSaveMessage] = useState('')
  const navigate = useNavigate()

  const handleSavePlan = () => {
    const planData = {
      date: new Date().toISOString(),
      meals: meals
    }
    localStorage.setItem('savedMealPlan', JSON.stringify(planData))
    setSaveMessage('Meal plan saved!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handlePrintPlan = () => {
    navigate('/print')
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
      </div>
    )
  }

  return (
    <div>
      <h2>Your Meal Plan</h2>
      <div>
        <button onClick={handleSavePlan}>Save Plan</button>
        <button onClick={handlePrintPlan}>Print Plan</button>
      </div>
      {saveMessage && <p>{saveMessage}</p>}
      <div>
        {meals.map(meal => (
          <div key={meal.day}>
            <h3>Day {meal.day}</h3>
            <div>
              <div>
                <h4>Breakfast</h4>
                <p>{meal.breakfast}</p>
              </div>
              <div>
                <h4>Lunch</h4>
                <p>{meal.lunch}</p>
              </div>
              <div>
                <h4>Dinner</h4>
                <p>{meal.dinner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MealPlanDisplay 