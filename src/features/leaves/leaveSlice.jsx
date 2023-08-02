import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNewLeaves, updateNewLeaves, fetchLeaveType, addLeaveType, updateLeaveType, deleteLeaveType, fetchUserLeaves } from './leaveActions'

// const leavesData = localStorage.getItem('newLeavesData')
// ? localStorage.getItem('newLeavesData')
// : null

// const leaveTypeData = localStorage.getItem('leaveTypeData')
// ? localStorage.getItem('leaveTypeData')
// : null

const initialState = {
  userLeaveData: [],
  leavesData: [],
  leaveTypeData: [],
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
      state.userLeaveData = state.userLeaveData
      state.leavesData = state.leavesData
      state.leaveTypeData = state.leaveTypeData
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
        state.leavesData =  action.payload
      })
      .addCase(fetchNewLeaves.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      .addCase(updateNewLeaves.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(updateNewLeaves.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
       
      })
      .addCase(updateNewLeaves.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      // Leave Type Cases
      .addCase(fetchLeaveType.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(fetchLeaveType.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
        state.leaveTypeData = action.payload
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
      .addCase(deleteLeaveType.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(deleteLeaveType.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
      })
      .addCase(deleteLeaveType.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
      // Fetch Leave
      .addCase(fetchUserLeaves.pending, (state) => {
        state.isLeaveLoading = true;
      })
      .addCase(fetchUserLeaves.fulfilled, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveSuccess = true;
        state.userLeaveData = action.payload
      })
      .addCase(fetchUserLeaves.rejected, (state, action) => {
        state.isLeaveLoading = false;
        state.isLeaveError = true;
        state.message = action.payload;
      })
  },
})

export const selectAllLeaves = (state) => state.leave.leave

export const { reset  } = leaveSlice.actions
export default leaveSlice.reducer