import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNewLeaves, fetchLeaveType, addLeaveType, updateLeaveType } from './leaveActions'

const newLeavesData = localStorage.getItem('newLeavesData')
? localStorage.getItem('newLeavesData')
: null

const leaveTypeData = localStorage.getItem('leaveTypeData')
? localStorage.getItem('leaveTypeData')
: null

const initialState = {
  newLeavesData,
  leaveTypeData,
  isLeaveError: false,
  isLeaveSuccess: false,
  isLeaveLoading: false,
  message: '',
}

export const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLeaveLoading = false
      state.isLeaveSuccess = false
      state.isLeaveError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewLeaves.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(fetchNewLeaves.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
        state.newLeavesData = JSON.parse(localStorage.getItem('newLeavesData'))
      })
      .addCase(fetchNewLeaves.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      .addCase(fetchLeaveType.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(fetchLeaveType.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
        state.leaveTypeData = JSON.parse(localStorage.getItem('leaveTypeData'))
      })
      .addCase(fetchLeaveType.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      .addCase(addLeaveType.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(addLeaveType.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
      })
      .addCase(addLeaveType.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      .addCase(updateLeaveType.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(updateLeaveType.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
      })
      .addCase(updateLeaveType.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer