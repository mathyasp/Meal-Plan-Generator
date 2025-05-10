import { useSelector, useDispatch } from 'react-redux'
import { updateFormData, setError, fetchMealPlan } from '../store/mealPlanSlice'

function MealPlanForm() {
  const dispatch = useDispatch()
  const formData = useSelector(state => state.mealPlan.formData)
  const errors = useSelector(state => state.mealPlan.errors)
  const isLoading = useSelector(state => state.mealPlan.isLoading)
  const error = useSelector(state => state.mealPlan.error)

  const handleChange = (e) => {
    const { name, value } = e.target
    // Convert timeline to number, keep other values as strings
    const newValue = name === 'timeline' ? Number(value) : value
    dispatch(updateFormData({ [name]: newValue }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if ingredients are empty
    if (!formData.ingredients) {
      dispatch(setError({ field: 'ingredients', message: 'Please add some ingredients' }))
      return
    }

    // Check if timeline is valid
    if (formData.timeline < 1 || formData.timeline > 7) {
      dispatch(setError({ field: 'timeline', message: 'Pick between 1 and 7 days' }))
      return
    }

    // Check if theme is empty
    if (!formData.theme) {
      dispatch(setError({ field: 'theme', message: 'Please pick a cuisine theme' }))
      return
    }

    // Use dispactch to generate meal plan
    dispatch(fetchMealPlan(formData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ingredients">Ingredients Available:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="List your available ingredients..."
        />
        <small>Enter ingredients separated by commas (e.g., chicken, rice, tomatoes)</small>
        {errors.ingredients && <div className="error">{errors.ingredients}</div>}
      </div>

      <div>
        <label htmlFor="timeline">Number of Days (1-7):</label>
        <input
          type="number"
          id="timeline"
          name="timeline"
          min="1"
          max="7"
          value={formData.timeline}
          onChange={handleChange}
        />
        {errors.timeline && <div className="error">{errors.timeline}</div>}
      </div>

      <div>
        <label htmlFor="preferences">Dietary Preferences:</label>
        <input
          type="text"
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          placeholder="e.g., vegetarian, gluten-free"
        />
        <small>Enter any dietary restrictions or preferences</small>
      </div>

      <div>
        <label htmlFor="theme">Meal Theme:</label>
        <input
          type="text"
          id="theme"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          placeholder="e.g., Italian, Japanese"
        />
        <small>Enter a cuisine type or theme for your meals</small>
        {errors.theme && <div className="error">{errors.theme}</div>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Meal Plan'}
      </button>

      {error && <div className="error">Error: {error}</div>}
    </form>
  )
}

export default MealPlanForm 