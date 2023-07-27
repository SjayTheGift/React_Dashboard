import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';                                  


function App() {

  const userApi = [
    {
      "id": '1',
      "name": "John Doe",
      "department": "IT",
      "reason": "Sick Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "new",
      "description": "what ever sdsdwpopdfsd is it",
      "dateApplied": "09-11-2022"
    },
    {
      "id": '2',
      "name": "Chris Hani",
      "department": "HR",
      "reason": "Maternity Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "approved",
      "description": "what ever rtty fgsd ",
      "dateApplied": "09-11-2022"
    },
    {
      "id": '3',
      "name": "Sinazo Jacobs",
      "department": "Data Science",
      "reason": "Parental Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "new",
      "description": "what ever popopopo",
      "dateApplied": "09-11-2022"
    },
    {
      "id": '14',
      "name": "Thabiso Monyane",
      "department": "IT",
      "reason": "Sick Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "rejected",
      "description": "what ever yydsds",
      "dateApplied": "09-11-2022"
    },
    {
      "id": '5',
      "name": "Bernado Silva",
      "department": "Software Engineering",
      "reason": "Sick Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "approved",
      "description": "what ever asa as as as",
      "dateApplied": "09-11-2022"
    },
    {
      "id": '6',
      "name": "LoLo Mandla",
      "department": "IT",
      "reason": "Maternity Leave",
      "fromDate": "01-09-2022",
      "toDate": "02-01-2023",
      "status": "approved",
      "description": "what ever",
      "dateApplied": "09-11-2022"
    }
  ]

  const [userLeaveApi, setUserLeaveApi] = useState(userApi)

  return (
    <>
    <Dashboard 
    userLeaveApi={userLeaveApi} setUserLeaveApi={setUserLeaveApi}/>
    </>
  )
}

export default App
