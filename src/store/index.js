import { configureStore } from '@reduxjs/toolkit'
import mealPlanReducer from './mealPlanSlice'

export const store = configureStore({
  reducer: {
    mealPlan: mealPlanReducer,
  },
}) 