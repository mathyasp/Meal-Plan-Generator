import { useSelector } from 'react-redux'

function DebugPanel() {
  const formData = useSelector(state => state.mealPlan.formData)
  const errors = useSelector(state => state.mealPlan.errors)
  const meals = useSelector(state => state.mealPlan.meals)
  const isLoading = useSelector(state => state.mealPlan.isLoading)
  const error = useSelector(state => state.mealPlan.error)

  return (
    <div>
      <h3>Debug Info:</h3>
      <pre>
        Form Data: {JSON.stringify(formData, null, 2)}
      </pre>
      <pre>
        Errors: {JSON.stringify(errors, null, 2)}
      </pre>
      <pre>
        Meals: {JSON.stringify(meals, null, 2)}
      </pre>
      <pre>
        Loading: {isLoading ? 'true' : 'false'}
      </pre>
      {error && <pre>Error: {error}</pre>}
    </div>
  )
}

export default DebugPanel 