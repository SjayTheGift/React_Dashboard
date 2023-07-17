import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const NotFound = () => {
  return (
    

    <div className="col-span-full mr-8 md:mr-0 text-white bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h1 className='text-2xl sm:text-3xl md:text-5xl text-center'>404 Error</h1>
              <h2 className='text-2xl sm:text-3xl md:text-5xl text-center'>Page Not Found</h2>
            </header>
    </div>
  )
}

export default NotFound