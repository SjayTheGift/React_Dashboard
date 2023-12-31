import { useState, useEffect } from 'react';
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken  } from "react-jwt";
import { logout } from '../features/auth/authActions';
import { reset } from '../features/auth/authSlice';

const Header = ({nav, setNav, display}) => {
    const [dropDown, setDropDown] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken }  = useSelector((state) => state.auth)
    const token = JSON.parse(userToken)
    let data  = ''
    if(token){
        data = decodeToken(token.access)
    }

    useEffect(() => {
        dispatch(reset());
      }, [userToken]);

    const onLogout = () => {
        navigate('/')
        dispatch(logout());
    }

  return (
    <>
       <div className={` ${display} sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30`}>
            <div className='px-4 sm:px-6 lg:px-8'>

                <div className='flex items-center justify-between h-16 -mb-px'>
                    <div className='relative inline-flex text-white'>
                        <RiMenuUnfoldFill  size={25} className='cursor-pointer block lg:hidden' onClick={() => setNav(!nav)}/>
                    </div>
                    <div className='relative inline-flex'></div>
                    <div className='relative inline-flex' onClick={() => setDropDown(!dropDown)}>
                        <button className='inline-flex justify-center items-center group' aria-haspopup="true" aria-expanded="true">
                            <div className='flex items-center truncate'>
                                <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">HR Lab.</span>
                                <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12"><path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path></svg>
                            </div>
                        </button>
                        {dropDown && 
                            <div className="origin-top-right z-10 absolute top-full w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0">
                                <div>
                                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">{data.designation}</p>
                                    </div>
                                    <ul>
                                        <li>
                                            <a className="font-medium text-sm text-slate-400 hover:text-slate-200 flex items-center py-1 px-3" href="#">
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <p className="font-medium text-sm text-slate-400 hover:text-slate-200 flex items-center py-1 px-3 cursor-pointer" 
                                                onClick={()=>onLogout()}>
                                                    Sign Out
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header
