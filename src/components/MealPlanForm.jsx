import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { generateMealPlan } from '../store/mealPlanSlice'

function MealPlanForm() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    days: 3,
    dietaryRestrictions: '',
    cuisine: '',
    ingredients: '',
    mode: 'new',
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(generateMealPlan(formData))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        meals: {
          ...prev.meals,
          [name]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Plan Mode:
          <select 
            name="mode" 
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="new">Generate New Plan</option>
            <option value="ingredients">Use My Ingredients</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Number of Days:
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            min="1"
            max="7"
          />
        </label>
      </div>

      <div>
        <p>Meals to Include:</p>
        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={formData.meals.breakfast}
            onChange={handleChange}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            name="lunch"
            checked={formData.meals.lunch}
            onChange={handleChange}
          />
          Lunch
        </label>
        <label>
          <input
            type="checkbox"
            name="dinner"
            checked={formData.meals.dinner}
            onChange={handleChange}
          />
          Dinner
        </label>
      </div>

      <div>
        <label>
          Dietary Restrictions (optional):
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            placeholder="e.g., vegetarian, gluten-free"
          />
        </label>
      </div>

      <div>
        <label>
          Preferred Cuisine (optional):
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., Italian, Mexican, Asian fusion"
          />
        </label>
      </div>

      {formData.mode === 'ingredients' && (
        <div>
          <label>
            Available Ingredients:
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List your ingredients, separated by commas"
              rows="4"
            />
          </label>
        </div>
      )}

      <button type="submit">Generate Meal Plan</button>
    </form>
  )
}

export default MealPlanForm 