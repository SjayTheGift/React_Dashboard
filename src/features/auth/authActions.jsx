// authActions.js
import React,{useRef} from 'react';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:8000'

// export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
   
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     await axios.post(`${backendURL}/api/user/register/`, user, config)
//     .then(res => {
//         // localStorage.setItem('userInfo', JSON.stringify(res.data))
//         toast.success("Registered successfully")
//     })
//     .catch(error => {
//         // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
//   }
// )


export const login = createAsyncThunk('auth/login',async (user) => {
   
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  await axios.post(`${backendURL}/api/user/login/`, user, config)
  .then(res => {
      localStorage.setItem('userToken', JSON.stringify(res.data))
      toast.success("Successfully logged-in")
  })
  .catch(error => {
      // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      if (error.response) {

        if(error.response.data) {
          for (let x in error.response.data) {
               toast.error(error.response.data.detail)
           } 
           Navigate('/')
       }
          if(error.response.data.password) {
             for (let x in error.response.data.password) {
                  toast.error(error.response.data.password[x])
              } 
              Navigate('/')
          }
          if(error.response.data.email){
              for (let x in error.response.data.email) {
                  toast.error(error.response.data.email[x])
              } 
              Navigate('/')
          }
        } else if (error.request) {
          toast.error(error.request.data)
          Navigate('/')
        } else {
          toast.error(error.message)
          Navigate('/')
        }
  })
})

export const logout = createAsyncThunk('auth/logout',async () => {
    localStorage.removeItem('userToken')
    
})