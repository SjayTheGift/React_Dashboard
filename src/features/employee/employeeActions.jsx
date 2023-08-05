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

export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async () => {
   
  return await axios.get(`${backendURL}/api/user/employee/`, config)
  .then(res => {
      localStorage.setItem('employeeData', JSON.stringify(res.data))
      return res.data
  })
  .catch(error => {
      if (error.response) {
          if(error.response.data.password) {
             for (let x in error.response.data.password) {
                  toast.error(error.response.data.password[x])
              } 
          }
          if(error.response.data.email){
              for (let x in error.response.data.email) {
                  toast.error(error.response.data.email[x])
              } 
          }
        } else if (error.request) {
          toast.error(error.request.data)
        } else {
          toast.error(error.message)
          console.log('Error', error.message);
        }

      toast.error(message)
      // return thunkAPI.rejectWithValue(error.message)
  })
})


export const registerEmployee = createAsyncThunk('employee/registerEmployee', async (user, thunkAPI) => {
  console.log(user)

    return await axios.post(`${backendURL}/api/user/employee/create/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee Registered")
        return res.data
    })
    .catch(error => {
        if (error.response) {
            if(error.response.data.password) {
               for (let x in error.response.data.password) {
                    toast.error(error.response.data.password[x])
                } 
            }
            if(error.response.data.email){
                for (let x in error.response.data.email) {
                    toast.error(error.response.data.email[x])
                } 
            }
          } else if (error.request) {
            toast.error(error.request.data)
          } else {
            toast.error(error.message)
            console.log('Error', error.message);
          }

        toast.error(message)
        // return thunkAPI.rejectWithValue(error.message)
    })
})



export const updateEmployeeAction = createAsyncThunk('employee/updateEmployeeAction', async (user, thunkAPI) => {
  
    return await axios.put(`${backendURL}/api/user/employee/${user.id}/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee Updated")
        return res.data
    })
    .catch(error => {
        if (error.response) {
            if(error.response.data.password) {
               for (let x in error.response.data.password) {
                    toast.error(error.response.data.password[x])
                } 
            }
            if(error.response.data.email){
                for (let x in error.response.data.email) {
                    toast.error(error.response.data.email[x])
                } 
            }
          } else if (error.request) {
            toast.error(error.request.data)
          } else {
            toast.error(error.message)
            console.log('Error', error.message);
          }

        toast.error(message)
        // return thunkAPI.rejectWithValue(error.message)
    })
})

export const deleteEmployeeAction = createAsyncThunk('employee/deleteEmployeeAction', async (user, thunkAPI) => {
  
    return await axios.delete(`${backendURL}/api/user/employee/${user.id}/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee Deleted")
        return res.data
    })
    .catch(error => {
        if (error.response) {
            if(error.response.data.password) {
               for (let x in error.response.data.password) {
                    toast.error(error.response.data.password[x])
                } 
            }
            if(error.response.data.email){
                for (let x in error.response.data.email) {
                    toast.error(error.response.data.email[x])
                } 
            }
          } else if (error.request) {
            toast.error(error.request.data)
          } else {
            toast.error(error.message)
            console.log('Error', error.message);
          }

        toast.error(message)
        // return thunkAPI.rejectWithValue(error.message)
    })
})