import React, {useState, useEffect, useRef} from 'react'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea  } from 'primereact/inputtextarea';
import { Button  } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

import { LeaveTypeService } from '../service/LeaveTypeService';

const LeaveApplication = ({userLeaveApi, setUserLeaveApi}) => {

    let leaveEmpty = {
      leaveFrom: '',
      leaveTo: '',
      leaveReason: '',
      description: "",
    };

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(leaveEmpty)
    const { leaveFrom, leaveTo, leaveReason, description } = formData
    const [leaveTypes, setLeaveTypes] = useState([]);
    const toast = useRef(null);

    const leaves = [
        { name: 'Sick Leave', days: '12' },
        { name: 'Casual Leave', days: '21' },
        { name: 'Maternity Leave', days: '90' },
        { name: 'Parental Leave', days: '7' },
    ];

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const onSave = () =>{
      setSubmitted(true);
      let leaveFromDate = new Date(formData.leaveFrom).toLocaleString().split(',')[0]
      let leaveToDate = new Date(formData.leaveTo).toLocaleString().split(',')[0]

      if(leaveFromDate.trim() !== 'Invalid Date' && leaveToDate.trim() !== 'Invalid Date' && formData.description.trim().length !== 0 && formData.leaveReason.name.trim() !== 0){
        let id = userLeaveApi.length + 1

        userLeaveApi.push({...userLeaveApi, 
          "id": id,
          "name":'james Bond', 
          "department": "IT", 
          "reason": formData.leaveReason.name, 
          "fromDate": leaveFromDate, 
          "toDate": leaveToDate,
          "status": "new",
          "description": formData.description,
          "dateApplied": "24-07-2023"
        })
  
        console.log(userLeaveApi)
  
        setSubmitted(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Applied for Leave', life: 3000 });
      }
      setFormData('')
    }


    useEffect(() => {
      LeaveTypeService.getLeaveTypes().then((data) => setLeaveTypes(data));
    }, []);

  return (
    <>
          <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'} Leave Application</h2>
            </header>
          </div>

          <div className='col-span-full mr-8 md:mr-0'>
          <Toast ref={toast} />
            <div className="card flex flex-col sm:flex-row justify-between gap-3 text-white mb-8">
                {leaveTypes.map((leaveType) =>
                  <Card key={leaveType.id} title={leaveType.name} className="gap-3 mr-3 bg-slate-800 text-gray-400 md:w-[20%]">
                    <p className="m-0">
                        {leaveType.numberOfDays}
                    </p>
                  </Card>
                )}
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>

              <span>
                <Calendar name='leaveFrom' 
                value={leaveFrom} 
                onChange={(e) => onChange(e)}  
                className={`w-full  ${submitted && !leaveFrom ? 'p-invalid' : ''}`} 
                placeholder='Leave From'/>
                {submitted && !leaveFrom && <small className="p-error">Field is required.</small>}
              </span>
              
              <span>
                <Calendar name='leaveTo' 
                value={leaveTo} 
                onChange={(e) => onChange(e)} 
                className={`w-full  ${submitted && !leaveTo ? 'p-invalid' : ''}`} 
                placeholder='Leave To'/>
                {submitted && !leaveTo && <small className="p-error">Field is required.</small>}
               
              </span>
            
              <div>
                <span className="p-float-label">
                    <Dropdown inputId="leaveReason" name='leaveReason' 
                    value={leaveReason} onChange={(e) => onChange(e)} 
                    options={leaves} optionLabel="name" 
                    className={`w-full  ${submitted && !leaveReason ? 'p-invalid' : ''}`} />
                    <label htmlFor="leaveReason">Leave Reason</label>
                </span>
                {submitted && !leaveReason && <small className="p-error">Field is required.</small>}
              </div>

              <div>
                <span>
                    <InputTextarea id="description" 
                    name='description' 
                    value={description} 
                    onChange={(e) => onChange(e)} 
                    rows={3} cols={30} 
                    className={`w-full  ${submitted && !description ? 'p-invalid' : ''}`}
                    required
                    placeholder='Description'
                    />

                </span>
                {submitted && !description && <small className="p-error">Field is required.</small>}
              </div>
            </div>

            <Button onClick={() => onSave()}>Submit</Button>
            
 
          </div>
    </>
  )
}

export default LeaveApplication
