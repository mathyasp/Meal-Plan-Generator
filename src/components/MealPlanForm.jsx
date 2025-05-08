import { useState } from 'react'

function MealPlanForm() {
  const [formData, setFormData] = useState({
    ingredients: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
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

      <button type="submit">Generate Meal Plan</button>
    </form>
  )
}

export default MealPlanForm 