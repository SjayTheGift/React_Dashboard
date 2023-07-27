import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logout } from './authActions'

// Get user from localStorage
// const user = localStorage.getItem('userInfo')
//   ? localStorage.getItem('userInfo')
//   : null


const userToken = localStorage.getItem('userToken')
? localStorage.getItem('userToken')
: null

const initialState = {
  userToken,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(register.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(register.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isRegistered = true;
    //   })
    //   .addCase(register.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userToken = localStorage.getItem('userToken');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userToken = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer