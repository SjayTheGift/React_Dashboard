import React from 'react'

const Home = () => {
  return (
    <>
        <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Welcome Dana!</h2>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Start managing your employees from anywhere.</h2>
            </header>
        </div>


        <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Departments</h2>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">6</h2>
            </header>
        </div>

        <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total Employees</h2>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">8</h2>
            </header>
        </div>

        <div className="col-span-full mr-8 md:mr-0 md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Pending Leaves</h2>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">8</h2>
            </header>
        </div>
    </>
  )
}

export default Home