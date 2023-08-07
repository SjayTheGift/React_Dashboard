import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken  } from "react-jwt";
import { fetchHomeData} from '../features/home/homeActions'
import LoadingSpinner  from '../components/LoadingSpinner'

const Home = () => {


    const { userToken }  = useSelector((state) => state.auth)
    const token = JSON.parse(userToken)
    const data = decodeToken(token.access)

    const { homeData, isLoading} = useSelector((state) => state.home)

    const dispatch = useDispatch()

    let count_data = JSON.parse(homeData)



    

    useEffect(()=>{
      dispatch(fetchHomeData())
    },[homeData])

    

  return (
    <>
        <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Welcome {data.full_name}!</h2>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Start managing your employees from anywhere.</h2>
            </header>
        </div>
        {isLoading
        ?
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoadingSpinner />
            </div>
        :
        <>
            <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Departments</h2>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count_data[0].total_department}</h2>
                </header>
            </div>

            <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Employees</h2>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count_data[0].total_users}</h2>
                </header>
            </div>

            <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pending Leaves</h2>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count_data[0].total_pending_leave}</h2>
                </header>
            </div>
        
        </>
        }
                
    </>
  )
}

export default Home