import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from '../store/mealPlanSlice'

function MealPlanForm() {
  const dispatch = useDispatch()
  const formData = useSelector(state => state.mealPlan.formData)

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateFormData({ [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Form submitted:', formData)
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
      </div>

      <button type="submit">Generate Meal Plan</button>
    </form>
  )
}

export default MealPlanForm 