import { createSlice } from '@reduxjs/toolkit'

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
  mealPlan: null
}

export const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      }
    },
    setError: (state, action) => {
      state.errors[action.payload.field] = action.payload.message
    },
    clearForm: (state) => {
      state.formData = initialState.formData
      state.errors = initialState.errors
    }
  }
})

export const { updateFormData, setError, clearForm } = mealPlanSlice.actions
export default mealPlanSlice.reducer 