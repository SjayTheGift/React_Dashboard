import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchHomeData} from './homeActions'

const homeData = localStorage.getItem('homeData')
? localStorage.getItem('homeData')
: null

const initialState = {
  homeData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    reset: (state) => {
      state.homeData = state.homeData
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Department
      .addCase(fetchHomeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.departmentData = localStorage.getItem('departmentData');
        state.homeData = action.payload
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = homeSlice.actions
export default homeSlice.reducer