import React, {useState, useEffect, useRef} from 'react'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText  } from 'primereact/inputtext';
import { Button  } from 'primereact/button';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken  } from "react-jwt";


import { fetchLeaveType, fetchUserLeaveBalance, addUserLeaves } from '../features/leaves/leaveActions'
import LoadingSpinner  from '../components/LoadingSpinner'

const LeaveApplication = () => {

    let leaveEmpty = {
      leaveFrom: '',
      leaveTo: '',
      leaveReason: '',
      description: ''
    };

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(leaveEmpty)
    const { leaveFrom, leaveTo, leaveReason, description } = formData
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState([])
    const toast = useRef(null);


    const leaves = []

    leaveTypes.map((leave) => {
      leaves.push(leave.title)
    })

  

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const dispatch = useDispatch()
    // Get data from state
    const {leaveTypeData, userLeaveBalance, isLeaveLoading, isLeaveSuccess,  isLeaveError, message}  = useSelector(
    (state) => state.leave)

    const { userToken }  = useSelector((state) => state.auth)

    const token = JSON.parse(userToken)
    const user_id = decodeToken(token.access)['user_id']

    const [isLeaveType, setIsLeaveType] = useState(true)

    
    const leave = leaveTypeData.filter((data) =>{
      if (leaveReason === data.title){
        return data.title
      }
    })

    const onSave = () =>{
      
      setSubmitted(true);
      let leaveFromDate = new Date(formData.leaveFrom).toLocaleString('en-CA').split(',')[0]
      let leaveToDate = new Date(formData.leaveTo).toLocaleString('en-CA').split(',')[0]

      // if(leaveFromDate !== 'Invalid Date' && leaveToDate !== 'Invalid Date' && formData.description && formData.leaveReason.name){

        

      const data = {
        "from_date": leaveFromDate,
        "to_date": leaveToDate,
        "reason": description,
        "user": user_id,
        "leave_type": leave[0]['id']
      }



      dispatch(addUserLeaves(data))
      formData.description = ''
      setSubmitted(false);
      setFormData(leaveEmpty)
      
    }

  
    useEffect(() => {
      dispatch(fetchLeaveType())
      dispatch(fetchUserLeaveBalance(token))
      if(isLeaveSuccess){
        setLeaveTypes(leaveTypeData)
        setIsLeaveType(false)
      }
      
    }, [isLeaveError, isLeaveSuccess]);


    const array = []

    leaveTypeData.map((item) => {
        userLeaveBalance.map((balance) => {
          if(item.id === balance.leave_type){
            array.push({'leave_types': item, 'leave_balances': balance})
          }
        })
        
    });


  return (
    <>
   
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'} Leave Application</h2>
        </header>
      </div>

      <div className='col-span-full mr-8 md:mr-0'>
        <div className="card flex flex-col sm:flex-row justify-between gap-3 text-white mb-8">

        {isLeaveLoading ?
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <LoadingSpinner />
          </div>
          : 
            <>
              {array.map((arr_data) =>
                <Card key={arr_data.leave_types.id} title={arr_data.leave_types.title} className="gap-3 mr-3 bg-slate-800 text-gray-400 md:w-[20%]">
                  <p className="m-0">
                      Leave Balance - <span className='font-bold'>{arr_data.leave_balances.number_of_days}</span>
                  </p>
                </Card>
              )}
            </>
            }
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
                  options={leaves}
                  className={`w-full  ${submitted && !leaveReason ? 'p-invalid' : ''}`} />
                  <label htmlFor="leaveReason">Leave Reason</label>
              </span>
              {submitted && !leaveReason && <small className="p-error">Field is required.</small>}
            </div>

            <div>
              <span>
                  <InputText id="description" 
                  name='description' 
                  value={description} 
                  onChange={(e) => onChange(e)} 
                  className={`w-full  ${submitted && !description ? 'p-invalid' : ''}`}
                  required
                  placeholder='Description'
                  />

              </span>
              {submitted && !description && <small className="p-error">Field is required.</small>}
            </div>
          </div>
        <Button className='mt-5' onClick={() => onSave()}>Submit</Button>
        
      </div>
    

         
    </>
  )
}

export default LeaveApplication
