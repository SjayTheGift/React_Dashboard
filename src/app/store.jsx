import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import organizationReducer from '../features/organization/orgSlice'
import employeeReducer from '../features/employee/employeeSlice'
import leaveReducer from '../features/leaves/leaveSlice'
import homeReducer from '../features/home/homeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    employee: employeeReducer,
    leave: leaveReducer,
    home: homeReducer,
  },
})