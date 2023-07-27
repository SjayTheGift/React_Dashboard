import React,{ useState, useEffect, useRef } from 'react'

import { BiEdit } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux'

import DesignationService from '../service/DesignationService'
import DeleteDialog from '../components/DeleteDialog'

import { 
  fetchDesignation,
  addDesignation,
  updateDesignation,
  deleteDesignation,
} from '../features/organization/orgActions'

import { reset } from '../features/organization/orgSlice';

const Designations = () => {

  const [name, setName] = useState('')

  const [designationList, setDesignationList] = useState([])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [dataToDelete, setDataToDelete] = useState('')
  const toast = useRef(null);
  const [error, setError] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [id, setId] = useState()

  const dispatch = useDispatch()
  // Get data from state
  const {designationData, isLoading, isError,  isSuccess, AddSuccess, message}  = useSelector(
  (state) => state.organization)

  useEffect(()=>{
    // get method to fetch department data
    dispatch(fetchDesignation())

    if(isSuccess){
      setDesignationList(JSON.parse(designationData))
    }
  }, [isSuccess, isError, message, designationData])

  const onChange = (e) =>{
      setName(e.target.value)
  }

  const onSave = (e) => {
    e.preventDefault()
    const newId = designationList.length + 1

    if(name.trim().length === 0){
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Designation Name Required', life: 4000 });
      console.log('error')
      setError(true)
    }else{
      // designationList.push({"id": newId, "name": name})
      // setDesignationList([...designationList])
      dispatch(addDesignation({name: name}))
      setName('')
      setError(false)
      dispatch(reset())
    }
  }

  const onUpdate = (e) => {
    e.preventDefault()

    setHideButton(false)

    if(name.trim().length === 0){
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Designation Name Required', life: 3000 });
      setError(true)
    }else{

          // const newState = designationList.map(obj => {
          //   // 👇️ if id equals to leave id passes, update status to approved
          //   if(obj.id == id){
          //     return {...obj, name: name};
          //   }
          //   // 👇️ otherwise return the object as is
          //   return obj;
          // })

          // setDesignationList(newState)
          dispatch(updateDesignation({id: id, name:name}))
          dispatch(reset())
          setName('')
    
    }
  }

  const onUpdateName = (Designation) => {
    setName(Designation.name)
    setHideButton(true)
    setId(Designation.id)
  }

  const onCancel = () =>{
    setName('')
    setError(false)
    setHideButton(false)
  }

  const onDeleteName = (val) => {
    setDeleteDialog(true)
    setDataToDelete(val)
    dispatch(deleteDesignation(val))
    dispatch(reset())
  }



  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Organization {'>'} Designation</h2>
            </header>
      </div>

      <div className="col-span-full md:col-span-6 mr-8 md:mr-0">
      <Toast ref={toast} />
            <div className="px-5 py-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">Add Designation</h2>
                <hr className='m-2'/>
                <form className="px-4 pt-1 mb-4 text-white">
                    <div className="mb-6">
                        <span className="p-label">
                            <label htmlFor="name" className="block  mb-2">Designation Name</label>
                            <InputText id="name" value={name}  
                            onChange={e => onChange(e)}  
                            className={`w-full ${error ? 'p-invalid': ''}`} 
                            />
                            
                        </span>

                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between"> 
                     
                     {hideButton ? 
                        <Button className="w-full" 
                        onClick={(e) => onUpdate(e)}
                        >
                          Update
                        </Button>
                    :
                        <Button className="w-full" 
                        onClick={(e) => onSave(e)}
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
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 px-2">designationList List</h2>
                <hr className='m-2'/>

                <div className="flex flex-col md:flex-row gap-3 items-center justify-between text-white px-6">  
                      <p>Designation Name</p>
                      <p>Action</p>
                </div>


              {designationList.map((obj) =>
                  <div key={obj.id} className="flex flex-row gap-3 mt-2 font-semibold items-center justify-between px-6 py-2 bg-gray-100 text-slate-800">  
                      <p>{obj.name}</p>
                      <div className='flex gap-2 items-center'>
                        <p className='cursor-pointer bg-white' onClick={() => onUpdateName(obj)}><BiEdit  className='text-green-600' size={20}/></p>
                        <p className='cursor-pointer bg-white' onClick={() => onDeleteName(obj)}><MdOutlineDelete className='text-red-700' size={20}/></p>
                      </div>
                  </div>
                )}

              <DeleteDialog 
              dataToDelete={dataToDelete}
              setDataToDelete={setDataToDelete}
              deleteDialog={deleteDialog} 
              setDeleteDialog={setDeleteDialog}
              dataList={designationList}
              setDataList={setDesignationList}
              toast={toast}
              />

            </div>
      </div>
      
    </>
  )
}

export default Designations