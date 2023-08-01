// authActions.js
import React,{useRef} from 'react';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:8000'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async () => {
   
  await axios.get(`${backendURL}/api/user/employee/`, config)
  .then(res => {
      localStorage.setItem('employeeData', JSON.stringify(res.data))
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

    await axios.post(`${backendURL}/api/user/employee/create/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee Registered successfully")
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
  
    await axios.put(`${backendURL}/api/user/employee/${user.id}/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee updated")
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
  
    await axios.delete(`${backendURL}/api/user/employee/${user.id}/`, user, config)
    .then(res => {
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        toast.success("Employee Deleted")
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