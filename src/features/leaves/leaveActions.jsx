// authActions.js
import React,{useRef} from 'react';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { decodeToken  } from "react-jwt";

let backendURL = ''

const host_name = window.location.hostname

if(host_name === 'localhost'){
  backendURL = import.meta.env.VITE_LOCAL_BACKEND_URL
}
else{
  backendURL = import.meta.env.VITE_PRODUCTION_URL
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Get all pending leaves for all users
export const fetchNewLeaves = createAsyncThunk('employee/fetchNewLeaves', async () => {
  return await axios.get(`${backendURL}/api/leave/leave-pending/`, config)
  .then(res => {
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})


// Approve or Reject pending leave
export const updateNewLeaves = createAsyncThunk('employee/updateNewLeaves', async (data) => {
  
  return await axios.put(`${backendURL}/api/leave/leave-pending/${data.id}/`, data, config)
  .then(res => {
      toast.success(`${data.status} Successfully!!!`)
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})


// Get all Leave Types
export const fetchLeaveType = createAsyncThunk('employee/fetchLeaveType', async () => {
   
  return await axios.get(`${backendURL}/api/leave/leave-type/`, config)
  .then(res => {
      localStorage.setItem('leaveTypeData', JSON.stringify(res.data))
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})

// Add leave type
export const addLeaveType = createAsyncThunk('employee/addLeaveType', async (data) => {
  console.log(data)
  return await axios.post(`${backendURL}/api/leave/leave-type/`, data, config)
  .then(res => {
      toast.success("Leave Type Added!!!")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})

// Update leave type
export const updateLeaveType = createAsyncThunk('employee/updateLeaveType', async (data) => {
  return await axios.put(`${backendURL}/api/leave/leave-type/${data.id}/`, data, config)
  .then(res => {
      toast.success("Leave Type Updated!!!")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
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
  })
})


// Fetch a single user leave
export const fetchUserLeaves = createAsyncThunk('employee/fetchUserLeaves', async (token) => {
  const user_id = decodeToken(token.access)['user_id']
 
  return await axios.get(`${backendURL}/api/leave/user-leave/`,  {
    headers: {
      "Authorization": `${JSON.stringify(user_id)}`,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})

// User apply for a leave
export const addUserLeaves = createAsyncThunk('employee/addUserLeaves', async (data) => {
  return await axios.post(`${backendURL}/api/leave/user-leave/application/`, data,  config)
  .then(res => {
      toast.success("Applied for Leave")
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})

// Get leave Balance for single user
export const fetchUserLeaveBalance = createAsyncThunk('employee/fetchUserLeaveBalance', async (token) => {
  const user_id = decodeToken(token.access)['user_id']
 
  return await axios.get(`${backendURL}/api/leave/leave-balance/`,  {
    headers: {
      "Authorization": `${JSON.stringify(user_id)}`,
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
      return res.data
  })
  .catch(error => {
      toast.error(error.message)
  })
})
