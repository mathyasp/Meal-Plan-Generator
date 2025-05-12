import { useState, useEffect } from 'react'

function SavedPlans() {
  const [savedPlan, setSavedPlan] = useState(null)

  useEffect(() => {
    const loadSavedPlan = () => {
      const plan = localStorage.getItem('savedMealPlan')
      if (plan) {
        setSavedPlan(JSON.parse(plan))
      }
    }
    loadSavedPlan()
  }, [])

  if (!savedPlan) {
    return null
  }

  const savedDate = new Date(savedPlan.date).toLocaleDateString()

  return (
    <div>
      <h3>Saved Meal Plan</h3>
      <p>Saved on {savedDate}</p>
      <div>
        {savedPlan.meals.map(meal => (
          <div key={meal.day}>
            <h4>Day {meal.day}</h4>
            <div>
              <p><span>Breakfast:</span> {meal.breakfast}</p>
              <p><span>Lunch:</span> {meal.lunch}</p>
              <p><span>Dinner:</span> {meal.dinner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPlans