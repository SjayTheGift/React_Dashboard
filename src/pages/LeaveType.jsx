import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { LeaveTypeService } from '../service/LeaveTypeService';

const LeaveType = () => {

  const [leaveTypes, setLeaveTypes] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    numberOfDays: '',
  })

  const { name, numberOfDays } = formData


  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const openNew = () => {
    setSubmitted(false);
    setFormData(formData);
    // setEmployeeDialog(true);
};

const hideDialog = () => {
    setSubmitted(false);
    // setEmployeeDialog(false);
};


  const onChange = (e) => {
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const saveLeave = () => {
    setSubmitted(true);

        let _leaveTypes = [...leaveTypes];
        let _formData = { ...formData };

        _formData.id = createId();
        _leaveTypes.push(_formData);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
        

        console.log(_leaveTypes)
        // setLeaveTypes(_leaveTypes);
        // setEmployeeDialog(false);
        setFormData(formData);

};

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
                <Button label="Add Leave-Type" icon="pi pi-plus" className='' onClick={() => setVisible(true)} />
                
              </div>
              <div className="card flex flex-col sm:flex-row justify-between gap-3 text-white mr-5">
                {leaveTypes.map((leaveType) =>
                  <Card title={leaveType.name} className="gap-3 mr-3 bg-slate-800 text-gray-400 md:w-[20%]">
                    <p className="m-0">
                        {leaveType.numberOfDays}
                    </p>
                  </Card>
                )}
              </div>


            {/* Edit Dialog modal  */}
            <Dialog header="Add Leave Type" visible={visible} className='md:w-[35%] max-h-full' onHide={() => setVisible(false)}>

                <div className="field">
                    <InputText id="name" onChange={e => onChange(e)} name={name} placeholder='Name' type='text' className='w-full'/>
                </div>

                <div className="field mt-2">
                    <InputText id="numberOfDays" onChange={e => onChange(e)} name={numberOfDays}  placeholder='Number of days' type='number' min={0} className='w-full'/>
                </div>

                <div className="field mt-2">
                    <Button label='Submit'  className='w-full' onClick={ () => saveLeave()}/>
                </div>

            </Dialog>

            </div>
      </>
  )
}

export default LeaveType
