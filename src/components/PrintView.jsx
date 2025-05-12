import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function PrintView() {
  const meals = useSelector(state => state.mealPlan.meals)
  const navigate = useNavigate()
  const hasPrinted = useRef(false)

  useEffect(() => {
    if (!hasPrinted.current) {
      hasPrinted.current = true
      window.print()
    }
  }, [])

  return (
    <div className="print-view">
      <div className="print-controls">
        <button onClick={() => navigate('/')}>Back to Meal Plan</button>
        <button onClick={() => window.print()}>Print Again</button>
      </div>
      <h1>Meal Plan</h1>
      <div>
        {meals.map(meal => (
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
  )
}

export default PrintView 