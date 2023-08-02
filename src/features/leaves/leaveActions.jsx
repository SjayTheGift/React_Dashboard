// authActions.js
import React,{useRef} from 'react';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { decodeToken  } from "react-jwt";

const backendURL = 'http://127.0.0.1:8000'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchNewLeaves = createAsyncThunk('employee/fetchNewLeaves', async () => {
   
  return await axios.get(`${backendURL}/api/leave/leave-new/`, config)
  .then(res => {
      // localStorage.setItem('newLeavesData', JSON.stringify(res.data))
      console.log( res.data)
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})

export const updateNewLeaves = createAsyncThunk('employee/updateNewLeaves', async (data) => {
  
  return await axios.put(`${backendURL}/api/leave/leave-new/${data.id}/`, data, config)
  .then(res => {
      // localStorage.setItem('newLeavesData', JSON.stringify(res.data))
      toast.success(`${data.status} Successfully!!!`)
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})



export const fetchLeaveType = createAsyncThunk('employee/fetchLeaveType', async () => {
   
  return await axios.get(`${backendURL}/api/leave/leave-type/`, config)
  .then(res => {
      localStorage.setItem('leaveTypeData', JSON.stringify(res.data))
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
      // return thunkAPI.rejectWithValue(error.message)
  })
})

export const addLeaveType = createAsyncThunk('employee/addLeaveType', async (data) => {
  return await axios.post(`${backendURL}/api/leave/leave-type/`, data, config)
  .then(res => {
      toast.success("Leave Type Added!!!")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
      // return thunkAPI.rejectWithValue(error.message)
  })
})

export const updateLeaveType = createAsyncThunk('employee/updateLeaveType', async (data) => {
  return await axios.put(`${backendURL}/api/leave/leave-type/${data.id}/`, data, config)
  .then(res => {
      toast.success("Leave Type Updated!!!")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
      // return thunkAPI.rejectWithValue(error.message)
  })
})

export const deleteLeaveType = createAsyncThunk('employee/deleteLeaveType', async (data) => {
  return await axios.delete(`${backendURL}/api/leave/leave-type/${data.id}/`, data, config)
  .then(res => {
      toast.success("Delete Successfully!!!")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
      // return thunkAPI.rejectWithValue(error.message)
  })
})


export const fetchUserLeaves = createAsyncThunk('employee/fetchUserLeaves', async (token) => {
  console.log(token)
  const user_id = decodeToken(token.access)['user_id']
 
  return await axios.get(`${backendURL}/api/leave/user-leave/`,  {
    headers: {
      "Authorization": `${JSON.stringify(user_id)}`,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
      // localStorage.setItem('newLeavesData', JSON.stringify(res.data))
      // alert('hi')
      console.log(res.data)
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})


// export const registerEmployee = createAsyncThunk('employee/registerEmployee', async (user, thunkAPI) => {
//   console.log(`test - ${user} `)

//     let data = {
//       "email": "aZuma0@sohu.com",
//       "first_name": "Zuma",
//       "last_name": "Medhurst",
//       "department": 2,
//       "designation": 3,
//       "phone": "06758914",
//       "gender": "Male",
//       "birth_date": "2000-12-25"
//   }
   
//     await axios.post(`${backendURL}/api/user/employee/create/`, user, config)
//     .then(res => {
//         // localStorage.setItem('userInfo', JSON.stringify(res.data))
//         toast.success("Employee Registered successfully")
//     })
//     .catch(error => {
//         if (error.response) {
//             if(error.response.data.password) {
//                for (let x in error.response.data.password) {
//                     toast.error(error.response.data.password[x])
//                 } 
//             }
//             if(error.response.data.email){
//                 for (let x in error.response.data.email) {
//                     toast.error(error.response.data.email[x])
//                 } 
//             }
//           } else if (error.request) {
//             toast.error(error.request.data)
//           } else {
//             toast.error(error.message)
//             console.log('Error', error.message);
//           }

//         toast.error(message)
//         // return thunkAPI.rejectWithValue(error.message)
//     })
// })



// export const updateEmployeeAction = createAsyncThunk('employee/updateEmployeeAction', async (user, thunkAPI) => {
  
//     await axios.put(`${backendURL}/api/user/employee/${user.id}/`, user, config)
//     .then(res => {
//         // localStorage.setItem('userInfo', JSON.stringify(res.data))
//         toast.success("Employee updated")
//     })
//     .catch(error => {
//         if (error.response) {
//             if(error.response.data.password) {
//                for (let x in error.response.data.password) {
//                     toast.error(error.response.data.password[x])
//                 } 
//             }
//             if(error.response.data.email){
//                 for (let x in error.response.data.email) {
//                     toast.error(error.response.data.email[x])
//                 } 
//             }
//           } else if (error.request) {
//             toast.error(error.request.data)
//           } else {
//             toast.error(error.message)
//             console.log('Error', error.message);
//           }

//         toast.error(message)
//         // return thunkAPI.rejectWithValue(error.message)
//     })
// })

// export const deleteEmployeeAction = createAsyncThunk('employee/deleteEmployeeAction', async (user, thunkAPI) => {
  
//     await axios.delete(`${backendURL}/api/user/employee/${user.id}/`, user, config)
//     .then(res => {
//         // localStorage.setItem('userInfo', JSON.stringify(res.data))
//         toast.success("Employee Deleted")
//     })
//     .catch(error => {
//         if (error.response) {
//             if(error.response.data.password) {
//                for (let x in error.response.data.password) {
//                     toast.error(error.response.data.password[x])
//                 } 
//             }
//             if(error.response.data.email){
//                 for (let x in error.response.data.email) {
//                     toast.error(error.response.data.email[x])
//                 } 
//             }
//           } else if (error.request) {
//             toast.error(error.request.data)
//           } else {
//             toast.error(error.message)
//             console.log('Error', error.message);
//           }

//         toast.error(message)
//         // return thunkAPI.rejectWithValue(error.message)
//     })
// })