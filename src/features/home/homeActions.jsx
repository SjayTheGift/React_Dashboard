import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

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

// fetch home data count

export const fetchHomeData = createAsyncThunk('organization/fetchHomeData', async (thunkAPI) => {

    return await axios.get(`${backendURL}/api/data/count/`, config)
    .then(res => {
        localStorage.setItem('homeData', JSON.stringify(res.data))
        return res.data
    })
    .catch(error => {
      console.log(error)
      toast.error(error.message)
    })
  }
)

