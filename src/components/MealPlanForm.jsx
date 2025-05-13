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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Mode
          </label>
          <select 
            name="mode" 
            value={formData.mode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="new">Generate New Plan</option>
            <option value="ingredients">Use My Ingredients</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Days
          </label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            min="1"
            max="7"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Meals to Include</p>
          <div className="space-y-2">
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <label key={meal} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name={meal}
                  checked={formData.meals[meal]}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{meal}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dietary Restrictions (optional)
          </label>
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            placeholder="e.g., vegetarian, gluten-free"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Cuisine (optional)
          </label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., Italian, Mexican, Japanese"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {formData.mode === 'ingredients' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Ingredients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List your ingredients, separated by commas"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Generate Meal Plan
        </button>
      </div>
    </form>
  )
}

export default MealPlanForm 