import React,{ useState, useEffect, useRef } from 'react'
import { classNames } from 'primereact/utils';
import { BiEdit } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux'

// import DepartmentService from '../service/DepartmentService'
import DeleteDialog from '../components/DeleteDialog'

import { fetchDepartment, addDepartment, updateDepartment, deleteDepartment } from '../features/organization/orgActions'
import { reset } from '../features/organization/orgSlice';

const Departments = () => {

  const [departmentList, setDepartmentList] = useState([])
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch()
  // Get data from state
  const {departmentData, isLoading, isError,  isSuccess, AddSuccess, message}  = useSelector(
  (state) => state.organization)

  const [name, setName] = useState('')

  const [deleteDialog, setDeleteDialog] = useState(false)
  const toast = useRef(null);
  const [error, setError] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [id, setId] = useState()
  const [dataToDelete, setDataToDelete] = useState('')




  useEffect(() =>{
    // get method to fetch department data
    dispatch(fetchDepartment())

    if(isSuccess){
      setDepartmentList(departmentData)
    }

  },[isSuccess, isError, message])


  const onChange = (e) =>{
      setName(e.target.value)
  }

  const onSave = (e) => {
    e.preventDefault()
    setSubmitted(true);

    if(name.trim()){
      dispatch(addDepartment({name: name}))
      setName('')
      setError(false)
      setSubmitted(false);
      dispatch(reset())
    }
  }

  const onUpdate = (e) => {
    e.preventDefault()
    setHideButton(false)
    setSubmitted(true);

    if(name.trim()){
      dispatch(updateDepartment({id: id, name:name}))
      dispatch(reset())
      setName('')
      setSubmitted(false);
    }
  }

  const onUpdateName = (department) => {
    setName(department.name)
    setHideButton(true)
    setId(department.id)
  }

  const onCancel = () =>{
    setName('')
    setError(false)
    setHideButton(false)
    setSubmitted(false)
  }

  const onDeleteName = (val) => {
    setDeleteDialog(true)
    setDataToDelete(val)
  }

  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Organization {'>'} Departments</h2>
            </header>
      </div>

      <div className="col-span-full md:col-span-6 mr-8 md:mr-0">
      <Toast ref={toast} />
            <div className="px-5 py-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">Add Departments</h2>
                <hr className='m-2'/>
                <form className="px-4 pt-1 mb-4 text-white">
                    <div className="mb-6">
                        {/* <span className="p-label">
                            <label htmlFor="name" className="block  mb-2">Department Name</label>
                            <InputText id="name" value={name}  
                            onChange={e => onChange(e)}  
                            className={`w-full ${error ? 'p-invalid': ''}`} 
                            />
                            
                        </span> */}
                        <div className="field flex flex-col">
                          <label htmlFor="name" className="block  mb-2">Department Name</label>
                          <InputText id="name" 
                              value={name} 
                              name='name'  
                              onChange={e => onChange(e)}   
                              required 
                              className={ 'w-full'+ classNames({ 'p-invalid border border-red-700': submitted && !name })} 
                          />
                          <span>
                            {submitted && !name && <small className="p-error">Field is required.</small>}
                          </span>
                        
                        </div>

                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between"> 
                     
                     {hideButton ? 
                        <Button className="w-full" 
                        onClick={(e)=> onUpdate(e)}
                        >
                          Update
                        </Button>
                    :
                        <Button className="w-full" 
                        onClick={(e)=> onSave(e)}
                        >
                          Save
                        </Button>
                    }
                      <Button className='w-full' 
                      type="button"
                      onClick={onCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                </form>
            </div>
      </div>

      <div className="col-span-full md:col-span-6 mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <div className="px-5 py-4 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">Departments List</h2>
                <hr className='m-2'/>

                <div className="flex flex-col md:flex-row gap-3 items-center justify-between text-white px-6">  
                      <p>Department Name</p>
                      <p>Action</p>
                </div>


              {departmentData.map((department) =>
                  <div key={department.id} className="flex flex-row gap-3 mt-2 font-semibold items-center justify-between px-6 py-2 bg-gray-100 text-slate-800">  
                      <p>{department.name}</p>
                      <div className='flex gap-2 items-center'>
                        <p className='cursor-pointer bg-white' onClick={() => onUpdateName(department)}><BiEdit  className='text-green-600' size={20}/></p>
                        <p className='cursor-pointer bg-white' onClick={() => onDeleteName(department)}><MdOutlineDelete className='text-red-700' size={20}/></p>
                      </div>
                  </div>
                )}

              
              <DeleteDialog 
                deleteFunction={deleteDepartment}
                dataToDelete={dataToDelete}
                deleteDialog={deleteDialog} 
                setDeleteDialog={setDeleteDialog}
              />

            </div>
      </div>
      
    </>
  )
}

export default Departments