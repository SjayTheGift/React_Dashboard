import { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { MdSpaceDashboard } from 'react-icons/md'
import { CgCloseR } from 'react-icons/cg'
import { GoOrganization } from 'react-icons/go'
import { FcLeave } from 'react-icons/fc'




const Main = () => {

    const [nav, setNav] = useState(false)

    const [menuList, setMenuList] = useState(false)

  return (
    <div className='flex h-screen overflow-hidden'>
        <div>
            { nav &&  <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 opacity-100" aria-hidden="true"></div>}
           
            <div id="sidebar" className={`flex flex-col flex-auto w-64 absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen lg:overflow-y-auto no-scrollbar  bg-slate-800 p-4 transition-all duration-200 ease-in-out ${nav ? '-translate-x-0': '-translate-x-64'}`}>
                <div className='space-y-8'>
                    <div className='px-3 rounded-sm mb-0.5 last:mb-0 text-white'>
                        <CgCloseR size={30} className='cursor-pointer block  lg:hidden' onClick={() => setNav(!nav)}/>
                    </div>
                    
                    <div>
                        <ul className='mt-3'>
                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
                                <p href="#0" className="block text-slate-200 truncate transition duration-150 hover:text-slate-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MdSpaceDashboard  size={25}/>
                                            <span className="text-sm font-medium ml-3">Dashboard</span>
                                        </div>
                                    </div>
                                </p>
                            </li>

                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false" onClick={() => setMenuList(!menuList)}>
                                <a href="#0" className="block text-slate-200 truncate transition duration-150 hover:text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <GoOrganization size={25}/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Organization</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${menuList ? 'rotate-180' : 'rotate-260'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                <div className={`${ menuList ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Deparments</span>
                                            </a>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Designation</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false">
                                <a href="#0" className="block text-slate-200 truncate transition duration-150 hover:text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaUsers size={25}/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Employees</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${menuList ? 'rotate-180' : 'rotate-260 translate-x-0'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                <div className={`${ menuList ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Emplooyees</span>
                                            </a>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add Employee</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false">
                                <a href="#0" className="block text-slate-200 truncate transition duration-150 hover:text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FcLeave size={25} className='text-white'/>
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leaves</span>
                                        </div>

                                        <div className="flex shrink-0 ml-2">
                                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${menuList ? 'rotate-180' : 'rotate-260'} `} viewBox="0 0 12 12">
                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                <div className={`${ menuList ? "max-h-40 visible ease-in" : "max-h-0 invisible ease-out"} transition-all duration-500 overflow-hidden`}>
                                    <ul className="pl-9 mt-1 false">
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Holidays</span>
                                            </a>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leave Types</span>
                                            </a>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leave Application</span>
                                            </a>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                            <a className="block transition duration-150 truncate text-slate-400 hover:text-slate-200" href="#">
                                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Earned Leave</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <header className='sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30'>
                <div className='px-4 sm:px-6 lg:px-8'>

                    <div className='flex items-center justify-between h-16 -mb-px'>
                        <div className='relative inline-flex text-white'>
                            <RiMenuUnfoldFill  size={25} className='cursor-pointer block lg:hidden' onClick={() => setNav(!nav)}/>
                        </div>
                        <div className='relative inline-flex'></div>
                        <div className='relative inline-flex'>
                            <button className='inline-flex justify-center items-center group' aria-haspopup="true" aria-expanded="true">
                                <div className='flex items-center truncate'>
                                    <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">Acme Inc.</span>
                                    <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12"><path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path></svg>
                                </div>
                            </button>
                            <div className="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0 enter-done">
                                <div>
                                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
                                        <div className="font-medium text-slate-800 dark:text-slate-100">Acme Inc.</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 italic">Administrator</div>
                                    </div>
                                    <ul>
                                        <li>
                                            <a className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3" href="#">
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3" href="#">
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </div>
  )
}

export default Main
