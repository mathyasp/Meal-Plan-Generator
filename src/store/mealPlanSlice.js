import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  formData: {
    ingredients: '',
    timeline: 1,
    preferences: '',
    theme: ''
  },
  mealPlan: null,
  isLoading: false,
  error: null
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
    clearForm: (state) => {
      state.formData = initialState.formData
    }
  }
})

export const { updateFormData, clearForm } = mealPlanSlice.actions
export default mealPlanSlice.reducer 