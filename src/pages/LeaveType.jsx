import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux'

import { fetchLeaveType, addLeaveType, updateLeaveType, deleteLeaveType } from '../features/leaves/leaveActions'
import { reset } from '../features/leaves/leaveSlice';



const LeaveType = () => {
 
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hideButton, setHideButton] = useState(true)
  const [id, setId] = useState()


  const toast = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    number_of_leaves_per_year: '',
  })

  const { title, number_of_leaves_per_year } = formData
  
  const dispatch = useDispatch()
  // Get data from state
  const {leaveTypeData, isLeaveLoading, isLeaveSuccess,  isLeaveError, message}  = useSelector(
  (state) => state.leave)
  

  useEffect(() => {
    dispatch(fetchLeaveType())

    if(isLeaveSuccess){
      setLeaveTypes(leaveTypeData)
    }

  }, [isLeaveError, isLeaveSuccess]);


  const openNew = () => {
    setSubmitted(false);
    setVisible(true);
    setFormData('');
    setHideButton(true)
};

 const onEdit = (obj) =>{
    setSubmitted(false);
    setVisible(true);
    setFormData(obj)
    setHideButton(false)
    setId(obj.id)
 }


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const saveLeave = () => {
    setSubmitted(true);

    if (title.trim() && number_of_leaves_per_year.trim()) {
      dispatch(addLeaveType({...formData}))
      dispatch(reset())

      setVisible(false);
      setFormData(formData);
    }
  };

  const updateLeave = () => {
    if(title.trim()){
      const newState = {
        ...formData,
        "id": id,
      }

      dispatch(updateLeaveType(newState))
      dispatch(reset())
      setVisible(false); 
    }
    else{
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Designation Name Required', life: 3000 });
    }
  }

  // const [deleteLeaveDialog, setDeleteLeaveDialog] = useState(false);
  // const [name, setName] = useState('');
  

  // const hideDeleteLeaveDialog = () => {
  //   setDeleteLeaveDialog(false);
  // };

  // const confirmDeleteEmployee = (data) => {
  //   setLeaveTypes(data);
  //   setName(data.title)
  //   setId(data.id)
  //   setDeleteLeaveDialog(true);
  //   dispatch(reset())
  // };

  // const deleteLeave = () => {
  //   let data = {...formData, "id": id}
  //   dispatch(deleteLeaveType(data))
  //   setDeleteLeaveDialog(false);
  //   setLeaveTypes(formData);
  //   dispatch(reset())
  // }

  // const deleteLeaveDialogFooter = (
  //   <React.Fragment>
  //       <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteLeaveDialog} />
  //       <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteLeave} />
  //   </React.Fragment>
  // );

  


  return (
      <>
            <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                  <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                      <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'} Leave Type</h2>
                  </header>
            </div>

            <div className='col-span-full'>
            <Toast ref={toast} />
              <div className='mb-5'>
                <Button label="Add Leave-Type" icon="pi pi-plus" className='' onClick={() => openNew()} />
                
              </div>
              <div className="card flex flex-col sm:flex-row justify-between gap-3 text-white mr-5">
                {leaveTypeData.map((leaveType) =>
                  <Card key={leaveType.id} title={leaveType.title} className="gap-3 mr-3 bg-slate-800 text-gray-400 md:w-[20%]">
                    <p className="m-0">
                        {leaveType.number_of_leaves_per_year}
                    </p>
                    <div className='flex flex-row mt-6'>
                      <p className='mr-3 cursor-pointer' onClick={()=> onEdit(leaveType)}>Edit</p>
                      {/* <p className='cursor-pointer' onClick={() => confirmDeleteEmployee(leaveType)}>Delete</p> */}
                    </div>
                  </Card>
                )}



              </div>


            {/* Edit Dialog modal  */}
            <Dialog header="Add Leave Type" visible={visible} className='md:w-[35%] max-h-full' onHide={() => setVisible(false)}>

                <div className="field">
                    <InputText id="name" name='title' 
                      onChange={e => onChange(e)} 
                      value={title} 
                      placeholder='Name' type='text' 
                      className={`w-full  ${submitted && !title ? 'p-invalid' : ''}`}/>
                    {submitted && !title && <small className="p-error">Field is required.</small>}
                </div>

                <div className="field mt-2">
                    <InputText id="number_of_leaves_per_year" name='number_of_leaves_per_year' onChange={e => onChange(e)} 
                    value={number_of_leaves_per_year}  
                    placeholder='Number of days' 
                    type='number' min={0} 
                    className={`w-full  ${submitted && !number_of_leaves_per_year ? 'p-invalid' : ''}`}
                    required
                    />
                    {submitted && !number_of_leaves_per_year && <small className="p-error">Field is required.</small>}
                </div>

                <div className="field mt-2">
                  { hideButton ? 
                  <Button label='Submit'  className='w-full' onClick={ () => saveLeave()}/>
                  :
                  <Button label='Update'  className='w-full' onClick={ () => updateLeave()}/>
                }
                    
                   
                </div>

            </Dialog>


            {/* <Dialog visible={deleteLeaveDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteLeaveDialogFooter} onHide={hideDeleteLeaveDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {LeaveType && (
                        <span>
                            Are you sure you want to delete <b>{name}</b>?
                        </span>
                    )}
                </div>
            </Dialog> */}

            </div>
      </>
  )
}

export default LeaveType
