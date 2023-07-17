import { BiEdit } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'

const Designation = () => {
  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Organization {'>'} Designation</h2>
            </header>
      </div>

      <div className="col-span-full md:col-span-6 mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <div className="px-5 py-4 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">Add Designation</h2>
                <hr className='m-2'/>
                <form className="px-4 pt-1 mb-4 text-white">
                    <div className="mb-6">
                      <label className="block mb-2" htmlFor="department-name">
                        Designation Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="department-name" type="text" placeholder="Designation Name"/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">  
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                        Save
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                        Cancel
                      </button>
                    </div>
                </form>
            </div>
      </div>

      <div className="col-span-full md:col-span-6 mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <div className="px-5 py-4 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">Designation List</h2>
                <hr className='m-2'/>

                <div className="flex flex-col md:flex-row gap-3 items-center justify-between text-white px-6">  
                      <p>Designation Name</p>
                      <p>Action</p>
                </div>


                <div className="flex flex-row gap-3 mt-2 font-semibold items-center justify-between px-6 py-2 bg-gray-100 text-slate-800">  
                      <p>ICT</p>
                      <div className='flex gap-2 items-center'>
                        <p className='cursor-pointer bg-white'><BiEdit  className='text-green-600' size={20}/></p>
                        <p className='cursor-pointer bg-white'><MdOutlineDelete className='text-red-700' size={20}/></p>
                      </div>
                </div>
                
                <div className="flex flex-row gap-3 mt-2 font-semibold items-center justify-between px-6 py-2 bg-gray-100 text-slate-800">  
                      <p>ICT</p>
                      <div className='flex gap-2 items-center'>
                        <p className='cursor-pointer bg-white'><BiEdit  className='text-green-600' size={20}/></p>
                        <p className='cursor-pointer bg-white'><MdOutlineDelete className='text-red-700' size={20}/></p>
                      </div>
                </div>
            </div>
      </div>

    </>
  )
}

export default Designation
