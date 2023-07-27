import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchEmployee, registerEmployee, updateEmployeeAction, deleteEmployeeAction } from './employeeActions'

const employeeData = localStorage.getItem('employeeData')
? localStorage.getItem('employeeData')
: null

const initialState = {
  employeeData,
  isEmployeeError: false,
  isEmployeeSuccess: false,
  isEmployeeLoading: false,
  message: '',
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => {
      state.isEmployeeLoading = false
      state.isEmployeeSuccess = false
      state.isEmployeeError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.isEmployeeLoading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeSuccess = true;
        state.employeeData = JSON.parse(localStorage.getItem('employeeData'))
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeError = true;
        state.message = action.payload;
      })
      .addCase(registerEmployee.pending, (state) => {
        state.isEmployeeLoading = true;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeSuccess = true;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeError = true;
        state.message = action.payload;
      })
      .addCase(updateEmployeeAction.pending, (state) => {
        state.isEmployeeLoading = true;
      })
      .addCase(updateEmployeeAction.fulfilled, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeSuccess = true;
      })
      .addCase(updateEmployeeAction.rejected, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmployeeAction.pending, (state) => {
        state.isEmployeeLoading = true;
      })
      .addCase(deleteEmployeeAction.fulfilled, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeSuccess = true;
      })
      .addCase(deleteEmployeeAction.rejected, (state, action) => {
        state.isEmployeeLoading = false;
        state.isEmployeeError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer