import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { generateMealPlan } from '../api/mealPlanApi'

// Create the async thunk
export const fetchMealPlan = createAsyncThunk(
  'mealPlan/fetchMealPlan',
  async (formData) => {
    const response = await generateMealPlan(formData)
    return response
  }
)

const initialState = {
  formData: {
    ingredients: '',
    timeline: 1,
    preferences: '',
    theme: ''
  },
  errors: {
    ingredients: '',
    timeline: '',
    theme: ''
  },
  meals: [],
  isLoading: false,
  error: null
}

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setError: (state, action) => {
      const { field, message } = action.payload
      state.errors[field] = message
    },
    clearForm: (state) => {
      state.formData = initialState.formData
      state.errors = initialState.errors
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealPlan.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMealPlan.fulfilled, (state, action) => {
        state.isLoading = false
        state.meals = action.payload.meals
      })
      .addCase(fetchMealPlan.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { updateFormData, setError, clearForm } = mealPlanSlice.actions
export default mealPlanSlice.reducer 