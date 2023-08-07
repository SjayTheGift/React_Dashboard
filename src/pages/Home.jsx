import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken  } from "react-jwt";
import { fetchHomeData} from '../features/home/homeActions'
import LoadingSpinner  from '../components/LoadingSpinner'

const Home = () => {


    const { userToken }  = useSelector((state) => state.auth)
    const token = JSON.parse(userToken)
    const data = decodeToken(token.access)

    const { homeData, isLoading, isSuccess} = useSelector((state) => state.home)
    const [totalData, setTotalData] = useState(false)

    const dispatch = useDispatch()

    let count_data = JSON.parse(homeData)

    console.log(data)

    

    useEffect(()=>{
      dispatch(fetchHomeData())

      if(isSuccess){
        setTotalData(true)
      }


    },[homeData, isSuccess])

    

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
        
        {count_data.map((count) => 
            <>
                <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Departments</h2>
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count.total_department}</h2>
                    </header>
                </div>

                <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Employees</h2>
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count.total_users}</h2>
                    </header>
                </div>

                <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pending Leaves</h2>
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{count.total_pending_leave}</h2>
                    </header>
                </div>
            </>
        
        )}
        

        </>
        }
                
    </>
  )
}

export default Home