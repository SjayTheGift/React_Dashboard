import { useState, useEffect } from "react"
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { login } from '../features/auth/authActions';
import LoadingSpinner  from '../components/LoadingSpinner'

const Login = () => {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  })

  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard"

  const [submitted, setSubmitted] = useState(false);

   // Get data from state
   const {userToken, isLoading, isError,  isSuccess, message}  = useSelector(
    (state) => state.auth)

    useEffect(() => {
      if (isError) {
          console.log('error loading')
      }
  
      if (isSuccess || userToken) {
          navigate(from, {replace: true})
      }

    }, [userToken, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const onSubmit =  (e) => {
    e.preventDefault()
    console.log(formData)
    setSubmitted(true)
  
    if(email.trim() !== '' &&  password.trim() !== ''){
      dispatch(login(formData))
    }

     // Run the authentication function
    
  }

  return (
    <>

      <div className="col-span-12 mr-8 md:mr-0 relative top-[50%] text-white">
        <div className="flex justify-center items-center">


      {isLoading ?
        <LoadingSpinner />
      :
    
        <>
          <form className="bg-slate-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => onSubmit(e)}>
              <h3 className="mb-3 text-center text-2xl">HR Lab</h3>
              <div className="my-6">
                <span className="p-float-label">
                        <InputText
                            id="input_email"
                            name="email"
                            className={`w-full  ${submitted && !email ? 'p-invalid' : ''}`} 
                            type='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                        <label htmlFor="input_email">Email</label>
                  </span>
                  {submitted && !email && <small className="p-error">Field is required.</small>}
              </div>
              <div className="my-6">
                {/* <InputText className="" id="password" type="password" placeholder="password"/> */}
                <span className="p-float-label">
                      <InputText
                          id="input_value"
                          name="password"
                          className={`w-full  ${submitted && !password ? 'p-invalid' : ''}`} 
                          type='password'
                          value={password}
                          onChange={(e) => onChange(e)}
                      />
                      <label htmlFor="input_value">Password</label>
                </span>
                {submitted && !password && <small className="p-error">Field is required.</small>}
              </div>
              <div className="flex flex-col items-center justify-between">

                  
                  <Button className="w-full flex justify-center">
                    Sign In
                  </Button>
              </div>
          </form>
        
        </>
    }



          
        </div>
        </div>
    </>
  )
}

export default Login
