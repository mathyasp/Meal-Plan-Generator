import { useSelector } from 'react-redux'

function MealPlanDisplay() {
  const meals = useSelector(state => state.mealPlan.meals)
  const isLoading = useSelector(state => state.mealPlan.isLoading)

  if (isLoading) {
    return <div>Loading your meal plan...</div>
  }

  if (meals.length === 0) {
    return <div>Fill out the form to generate a meal plan</div>
  }

  return (
    <div>
      <h2>Your Meal Plan</h2>
      {meals.map(meal => (
        <div key={meal.day}>
          <h3>Day {meal.day}</h3>
          <p>Breakfast: {meal.breakfast}</p>
          <p>Lunch: {meal.lunch}</p>
          <p>Dinner: {meal.dinner}</p>
        </div>
      ))}
    </div>
  )
}

export default MealPlanDisplay 