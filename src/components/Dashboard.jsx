import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Departments from '../pages/Departments'
import Designation from '../pages/Designation'
import Employees from '../pages/Employees'
import AddEmployee from '../pages/AddEmployee'
import LeaveApplication from '../pages/LeaveApplication'
import LeaveType from '../pages/LeaveType'
import EarnedLeave from '../pages/EarnedLeave'
import Home from '../pages/Home'
import SideNavBar from './SideNavBar'
import Header from './Header'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'

const Dashboard = () => {

    const [nav, setNav] = useState(false)
    const location = useLocation()

    console.log(location.pathname)

    // const ss = location.pathname
    let display = ''
    if (location.pathname == '/'){
        display = 'hidden'
    }else{
        display = 'block'
    }

    console.log(display)
  return (
    <>

    <div className='flex h-screen overflow-hidden'>
            <SideNavBar nav={nav} setNav={setNav} display={display}/>
            
            
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden gap-6">
                <>
                <Header nav={nav} setNav={setNav} display={display}/>
                </>
           
            
                {/* Cards */}
                <div className="grid grid-cols-12 gap-6 ml-6 md:mr-6">
                    <Routes>
                        <Route path='*' element={<NotFound />}/>
                        <Route path='/' element={<Login />} />
                        <Route path='/dashboard'  element={<Home/>}/>
                        <Route path='/employees'  element={<Employees/>}/>
                        <Route path='/add-employee'  element={<AddEmployee/>}/>
                        <Route path='/departments'  element={<Departments/>}/>
                        <Route path='/designation'  element={<Designation/>}/>
                        <Route path='/apply-leave'  element={<LeaveApplication/>}/>
                        <Route path='/manage-stuff-leave'  element={<LeaveApplication/>}/>
                        {/* <Route path='/stuff-leave-history'  element={<LeaveApplication/>}/> */}
                        {/* <Route path='/view-my-leave'  element={<LeaveApplication/>}/> */}
                        <Route path='/leave-type'  element={<LeaveType/>}/>
                        <Route path='/earned-leave'  element={<EarnedLeave/>}/>
                    </Routes>
                </div>
            </div>
    </div>

    </>
  )
}

export default Dashboard
