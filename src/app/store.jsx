import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import organizationReducer from '../features/organization/orgSlice'
import employeeReducer from '../features/employee/employeeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    employee: employeeReducer,
  },
})