import React, {useState} from 'react'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea  } from 'primereact/inputtextarea';

const LeaveApplication = () => {
  const [leaveType, setLeaveType] = useState(null);
    const cities = [
        { name: 'Sick Leave', days: '12' },
        { name: 'Casual Leave', days: '21' },
        { name: 'Maternity Leave', days: '90' },
        { name: 'Parental Leave', days: '7' },
    ];

    const [date, setDate] = useState(null);

  return (
    <>
          <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'} Leave Application</h2>
            </header>
          </div>

          <div className='col-span-full mr-8 md:mr-0'>
            <div className='grid sm:grid-cols-2 gap-4'>

            <span className="p-float-label">
                  <Calendar id="in"  value={date} onChange={(e) => setDate(e.value)} className='w-full'/>
                  <label htmlFor="in">Leave To</label>
              </span>
           
              
              <span className="p-float-label">
                  <Calendar id="in" value={date} onChange={(e) => setDate(e.value)} className='w-full'/>
                  <label htmlFor="in">Leave From</label>
              </span>
              <div>
              <span className="p-float-label">
                  <Dropdown inputId="dd-city" value={leaveType} onChange={(e) => setLeaveType(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" />
                  <label htmlFor="dd-city">Leave Reason</label>
              </span>
             
              </div>
              <div>
                
                <span className="p-float-label">
                    <InputTextarea id="username" rows={3} cols={30} className="w-full"/>
                    <label htmlFor="username">Description</label>
                </span>
              </div>

              

              

            </div>
            
 
          </div>
    </>
  )
}

export default LeaveApplication
