import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { CgCloseR } from 'react-icons/cg'
import { GoOrganization } from 'react-icons/go'
import { FcLeave } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { decodeToken  } from "react-jwt";

const SideNavBar = ({nav, setNav, display}) => {
  // const [nav, setNav] = useState(false)
    const [organization, setOrganization] = useState(false)
    const [employee, setEmployee] = useState(false)
    const [leave, setLeave] = useState(false)
  // const [dropDown, setDropDown] = useState(false)

    const [is_hr, setIsHr] = useState(false)
    const { userToken, isLoading } = useSelector((state) => state.auth)

    const convertTextToBoolean = (val) =>{
        if(val.toLowerCase()  === 'true'){
            return true
        }
        return false
    }

   



    // const is_hr = 
    
    useEffect(() =>{
        if(userToken) {
            const user = JSON.parse(userToken)
            setIsHr(convertTextToBoolean(decodeToken(user.access)['is_hr']))
        }
    },[userToken, isLoading])


  return (
    <>
    {!isLoading &&

    <div className={`${display}`}>
            { nav &&  <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 opacity-100`} aria-hidden="true"></div>}
           
            <div id="sidebar" className={`flex flex-col flex-auto w-64 absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen lg:overflow-y-auto no-scrollbar  bg-slate-800 p-4 transition-all duration-200 ease-in-out ${nav ? '-translate-x-0': '-translate-x-64'}`}>
                <div className='space-y-8'>
                    <div className='px-3 rounded-sm mb-0.5 last:mb-0 text-white'>
                        <CgCloseR size={30} className='cursor-pointer block  lg:hidden' onClick={() => setNav(!nav)}/>
                    </div>
                    
                    <div>
                        <ul className='mt-3'>
                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                                <Link to="/dashboard" className="block text-slate-200 truncate transition duration-150 hover:text-slate-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MdSpaceDashboard  size={25}/>
                                            <span className="text-sm font-medium ml-3">Dashboard</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>

                            {is_hr &&
                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false" onClick={() => {

                                setOrganization(!organization)

                                if (employee || leave){
                                    setEmployee(false)
                                    setLeave(false)
                                }

                            }}>
                                <div href="#0" className="block text-slate-200 truncate transition duration-150 hover:text-white cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <GoOrganization size={25}/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Organization</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${organization ? 'rotate-180' : 'rotate-260'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${ organization ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        <li className="mb-1 last:mb-0">
                                            <Link to="/departments" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Deparments</span>
                                            </Link>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <Link to="/designation" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Designation</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            }

                            {is_hr &&
                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false"  onClick={() => {
                                setEmployee(!employee)

                                if (organization || leave){
                                    setOrganization(false)
                                    setLeave(false)
                                }
                            }}>
                                <div className="block text-slate-200 truncate transition duration-150 hover:text-white cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaUsers size={25}/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Employees</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${employee ? 'rotate-180' : 'rotate-260 translate-x-0'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${ employee ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        <li className="mb-1 last:mb-0">
                                            <Link to="/employees" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Emplooyees</span>
                                            </Link>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <Link to='/add-employee' className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add Employee</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            }

                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false"  onClick={() => {
                                setLeave(!leave)

                                if (employee || organization){
                                    setEmployee(false)
                                    setOrganization(false)
                                }
                            }}>
                                <div className="block text-slate-200 truncate transition duration-150 hover:text-white cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FcLeave size={25} className='text-white'/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leaves</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${leave ? 'rotate-180' : 'rotate-260'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${ leave ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        {is_hr &&
                                            <li className="mb-1 last:mb-0">
                                                <Link to="/leave-type" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leave Types</span>
                                                </Link>
                                            </li>
                                        }
                                        <li className="mb-1 last:mb-0">
                                            <Link to="/apply-leave" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Apply Leave</span>
                                            </Link>
                                        </li>
                                        {is_hr && 
                                            <li className="mb-1 last:mb-0">
                                                <Link to="/manage-stuff-leave" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Manage Stuff Leave</span>
                                                </Link>
                                            </li>
                                        }
                                        <li className="mb-1 last:mb-0">
                                            <Link to="/view-my-leave" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Leaves</span>
                                            </Link>
                                        </li>
                                        {/* <li className="mb-1 last:mb-0">
                                            <Link to="/earned-leave" className="block transition duration-150 truncate text-slate-400 hover:text-slate-200">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Earned Leave</span>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default SideNavBar
