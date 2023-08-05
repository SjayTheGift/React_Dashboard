// authActions.js
import React,{useRef} from 'react';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

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

// Department CRUD 

export const fetchDepartment = createAsyncThunk('organization/fetchDepartment', async (thunkAPI) => {

    return await axios.get(`${backendURL}/api/user/department/`, config)
    .then(res => {
        // localStorage.setItem('departmentData', JSON.stringify(res.data))
        return res.data
    })
    .catch(error => {
      console.log(error)
      toast.error(error.message)
    })
  }
)

export const addDepartment = createAsyncThunk('organization/addDepartment', async (data, thunkAPI) => {
    return await axios.post(`${backendURL}/api/user/department/`, data, config)
    .then(res => {
        // localStorage.setItem('departmentData', JSON.stringify(res.data)
        toast.success(res.data.name + ' Added')
        return res.data
    })
    .catch(error => {
      console.log(error.response.data.name)
      toast.error(error.response.data.name[0])
    })
  }
)

export const updateDepartment = createAsyncThunk('organization/updateDepartment', async (data, thunkAPI) => {
    return await axios.put(`${backendURL}/api/user/department/${data.id}/`,  data , config)
    .then(res => {
        toast.success(res.data.name + ' Updated')
        return res.data
    })
    .catch(error => {
      console.log(error.response.data.name)
      toast.error(error.response.data.name[0])
    })
})

export const deleteDepartment = createAsyncThunk('organization/deleteDepartment', async (data, thunkAPI) => {
    return await axios.delete(`${backendURL}/api/user/department/${data.id}/`,  data , config)
    .then(res => {
        toast.success('Successful Deleted')
        return res.data
    })
    .catch(error => {
      console.log(error.response.data.name)
      toast.error(error.response.data.name[0])
    })
})


// Designation CRUD 

export const fetchDesignation = createAsyncThunk('organization/fetchDesignation', async (thunkAPI) => {

  return await axios.get(`${backendURL}/api/user/designation/`, config)
  .then(res => {
      localStorage.setItem('designationData', JSON.stringify(res.data))
      return res.data
  })
  .catch(error => {
    console.log(error)
    toast.error(error.message)
  })
}
)

export const addDesignation = createAsyncThunk('organization/addDesignation', async (data, thunkAPI) => {
  return await axios.post(`${backendURL}/api/user/designation/`, data, config)
  .then(res => {
      toast.success(res.data.name + ' Added')
      return res.data
  })
  .catch(error => {
    console.log(error.response.data.name)
    toast.error(error.response.data.name[0])
  })
}
)

export const updateDesignation = createAsyncThunk('organization/updateDesignation', async (data, thunkAPI) => {
  return await axios.put(`${backendURL}/api/user/designation/${data.id}/`,  data , config)
  .then(res => {
      console.log(res)
      toast.success(res.data.name + ' Updated')
      return res.data
  })
  .catch(error => {
    console.log(error.response.data.name)
    toast.error(error.response.data.name[0])
  })
})

export const deleteDesignation = createAsyncThunk('organization/deleteDesignation', async (data, thunkAPI) => {
  return await axios.delete(`${backendURL}/api/user/designation/${data.id}/`,  data , config)
  .then(res => {
      // localStorage.setItem('departmentData', JSON.stringify(res.data)
      toast.success('Successful Deleted')
      return res.data
  })
  .catch(error => {
    console.log(error.response.data.name)
    toast.error(error.response.data.name[0])
  })
})