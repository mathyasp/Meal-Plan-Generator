import { useSelector } from 'react-redux'

function DebugPanel() {
  const formData = useSelector(state => state.mealPlan.formData)
  const errors = useSelector(state => state.mealPlan.errors)

  return (
    <div>
      <h3>Debug Info:</h3>
      <pre>
        Form Data: {JSON.stringify(formData, null, 2)}
      </pre>
      <pre>
        Errors: {JSON.stringify(errors, null, 2)}
      </pre>
    </div>
  )
}

export default DebugPanel 