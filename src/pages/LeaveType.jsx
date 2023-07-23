import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { LeaveTypeService } from '../service/LeaveTypeService';

const LeaveType = () => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hideButton, setHideButton] = useState(true)
  const [id, setId] = useState()


  const toast = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    numberOfDays: '',
  })

  const { name, numberOfDays } = formData


  

  const openNew = () => {
    setSubmitted(false);
    setVisible(true);
    setFormData('');
    setHideButton(true)
    // setEmployeeDialog(true);
};

const hideDialog = () => {
    setSubmitted(false);
    // setEmployeeDialog(false);
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

    if (name.trim() && numberOfDays.trim()) {

      let _leaveTypes = [...leaveTypes];
      let _formData = { ...formData };

      _formData.id = leaveTypes.length + 1;

      let newData = {'id': _formData.id, 'name': _formData.name, 'numberOfDays': formData.numberOfDays}
      _leaveTypes.push(newData);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
        
      setLeaveTypes(_leaveTypes);
      setVisible(false);
      setFormData(formData);
    }
  };

  const updateLeave = () => {
    if(name.trim()){

      console.log(id)
      // console.log(formData)
      const newState = leaveTypes.map(obj => {
        // 👇️ if id equals to leave id passes, update status to approved
        if(obj.id == id){
          return {...formData};
        }
        // 👇️ otherwise return the object as is
        return obj;
      })

      setLeaveTypes(newState);
      setVisible(false); 
    }
    else{
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Designation Name Required', life: 3000 });
    }
  }


  useEffect(() => {
    LeaveTypeService.getLeaveTypes().then((data) => setLeaveTypes(data));
  }, []);

  // console.log(leaveTypes)
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
                {leaveTypes.map((leaveType) =>
                  <Card key={leaveType.id} title={leaveType.name} className="gap-3 mr-3 bg-slate-800 text-gray-400 md:w-[20%]">
                    <p className="m-0">
                        {leaveType.numberOfDays}
                    </p>
                    <div className='flex flex-row mt-6'>
                      <p className='mr-3 cursor-pointer' onClick={()=> onEdit(leaveType)}>Edit</p>
                      <p>Delete</p>
                    </div>
                  </Card>
                )}
              </div>


            {/* Edit Dialog modal  */}
            <Dialog header="Add Leave Type" visible={visible} className='md:w-[35%] max-h-full' onHide={() => setVisible(false)}>

                <div className="field">
                    <InputText id="name" name='name' 
                      onChange={e => onChange(e)} 
                      value={name} 
                      placeholder='Name' type='text' 
                      className={`w-full  ${submitted && !name ? 'p-invalid' : ''}`}/>
                    {submitted && !name && <small className="p-error">name is required.</small>}
                </div>

                <div className="field mt-2">
                    <InputText id="numberOfDays" name='numberOfDays' onChange={e => onChange(e)} 
                    value={numberOfDays}  
                    placeholder='Number of days' 
                    type='number' min={0} 
                    className={`w-full  ${submitted && !numberOfDays ? 'p-invalid' : ''}`}
                    required
                    />
                    {submitted && !numberOfDays && <small className="p-error">Number of is required.</small>}
                </div>

                <div className="field mt-2">
                  { hideButton ? 
                  <Button label='Submit'  className='w-full' onClick={ () => saveLeave()}/>
                  :
                  <Button label='Update'  className='w-full' onClick={ () => updateLeave()}/>
                }
                    
                   
                </div>

            </Dialog>

            </div>
      </>
  )
}

export default LeaveType
