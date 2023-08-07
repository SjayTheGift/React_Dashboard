import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Departments from '../pages/Departments'
import Designation from '../pages/Designation'
import Employees from '../pages/Employees'
import AddEmployee from '../pages/AddEmployee'
import LeaveApplication from '../pages/LeaveApplication'
import ManageStuffLeave from '../pages/ManageStuffLeave'
import ViewUserLeave from '../pages/ViewUserLeave'
import LeaveType from '../pages/LeaveType'
import EarnedLeave from '../pages/EarnedLeave'
import Home from '../pages/Home'
import SideNavBar from './SideNavBar'
import Header from './Header'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Forbidden from '../pages/Forbidden'
import { PrivateRoute } from '../utils/PrivateRoute'
import { ForbiddenRoutes } from '../utils/ForbiddenRoutes';

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
            <ToastContainer />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden gap-6">
                <>
                <Header nav={nav} setNav={setNav} display={display}/>
                </>
            
                {/* Cards */}
                <div className="grid grid-cols-12 gap-6 ml-6 md:mr-6">
                    <Routes>
                        <Route path='*' element={<NotFound />}/>
                        <Route path='/' element={<Login />} />
                        <Route path='/forbidden'  element={
                            <PrivateRoute>
                                <Forbidden/>
                            </PrivateRoute>
                        }/>
                        <Route path='/dashboard'  element={
                            <PrivateRoute>
                                <Home/>
                            </PrivateRoute>
                        }/>
                        <Route path='/employees'  element={
                            <PrivateRoute>
                                <Employees/>
                            </PrivateRoute>
                        }/>
                        <Route path='/add-employee'  element={
                            <PrivateRoute>
                                <AddEmployee/>
                            </PrivateRoute>
                        }/>
                        <Route path='/departments'  element={
                            <PrivateRoute>
                                <ForbiddenRoutes>
                                    <Departments />
                                </ForbiddenRoutes>
                            </PrivateRoute>
                        }/>
                        <Route path='/designation'  element={
                            <PrivateRoute>
                                <ForbiddenRoutes>
                                    <Designation/>
                                </ForbiddenRoutes>
                            </PrivateRoute>
                        }/>
                        <Route path='/apply-leave'  element={
                            <PrivateRoute>
                                <LeaveApplication />
                            </PrivateRoute>
                        }/>
                        <Route path='/manage-stuff-leave'  element={
                            <PrivateRoute>
                                 <ForbiddenRoutes>
                                    <ManageStuffLeave />
                                 </ForbiddenRoutes>
                            </PrivateRoute>
                        }/>
                        {/* <Route path='/stuff-leave-history'  element={<LeaveApplication/>}/> */}
                        <Route path='/view-my-leave'  element={
                            <PrivateRoute>
                                <ViewUserLeave />
                            </PrivateRoute>
                        }/>
                        <Route path='/leave-type'  element={
                            <PrivateRoute>
                                <LeaveType/>
                            </PrivateRoute>
                        }/>
                        <Route path='/earned-leave'  element={
                            <PrivateRoute>
                                <EarnedLeave/>
                            </PrivateRoute>
                        }/>
                    </Routes>
                </div>
            </div>
    </div>

    </>
  )
}

export default Dashboard
