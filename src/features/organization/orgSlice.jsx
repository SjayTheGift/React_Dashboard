import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
  fetchDepartment, 
  addDepartment, 
  updateDepartment,  
  deleteDepartment,
  fetchDesignation,
  addDesignation,
  updateDesignation,
  deleteDesignation,

} from './orgActions'

const departmentData = localStorage.getItem('departmentData')
? localStorage.getItem('departmentData')
: null


const designationData = localStorage.getItem('designationData')
? localStorage.getItem('designationData')
: null

const initialState = {
  departmentData,
  designationData,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.addSuccess = false
      state.updatedSuccess = false
      state.deleteSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Department
      .addCase(fetchDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departmentData = localStorage.getItem('departmentData');
        // state.departmentData = action.payload
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addSuccess = true;
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedSuccess = true;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // End Department

      // Designation
      .addCase(fetchDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.designationData = localStorage.getItem('designationData');
        // state.designationData = action.payload
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addSuccess = true;
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedSuccess = true;
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = organizationSlice.actions
export default organizationSlice.reducer