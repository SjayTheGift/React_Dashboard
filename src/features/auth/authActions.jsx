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