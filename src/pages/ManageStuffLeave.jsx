import React,{useState, useEffect} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ManageStuffLeave = () => {

  const userLeaveApi = [
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

  const [leaves, setLeaves] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    setLeaves(userLeaveApi)
  }, []);


  let filteredLeaves = leaves.filter((leave) => {
    return leave.status === 'new';
  });

  // console.log(filteredLeaves)

  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between">
        <h4 className="m-0">Manage Leaves</h4>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
  );

  const handleLeave = (leave, status) => {
    const newState = leaves.map(obj => {
      // 👇️ if id equals to leave id passes, update status to approved
      if(obj.id == leave.id){
        return {...obj, status: status};
      }
      // 👇️ otherwise return the object as is
      return obj;
    })
    setLeaves(newState)
  }

  // const rejectLeave = (leave) => {
  //   const newState = leaves.map(obj => {
  //     // 👇️ if id equals to leave id passes, update status to approved
  //     if(obj.id == leave.id){
  //       return {...obj, status: 'reject'};
  //     }
  //     // 👇️ otherwise return the object as is
  //     return obj;
  //   })
  //   setLeaves(newState)
  // }

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
          <div className='flex justify-between'>
            <Button label='Approve' icon="pi pi-check" rounded outlined className="mr-2" onClick={() => handleLeave(rowData, 'approved')} />
            <Button label='Reject' icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleLeave(rowData, 'rejected')} />
          </div>
            
        </React.Fragment>
    );
  };

  console.log(leaves)

  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'} Manage Stuff Leave</h2>
          </header>
      </div>

      <div className='col-span-full mr-8 md:mr-0'>
          <div className="card">
              <DataTable value={filteredLeaves}
                        dataKey="id"  paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leaves" globalFilter={globalFilter} header={header}>
                    <Column field="name" header="Stuff Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="department" header="Department" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="reason" header="Reason" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="fromDate" header="From" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="toDate" header="To" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="dateApplied" header="Date Applied" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="Approve or Reject" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
              </DataTable>
          </div>
      </div>
    </>
  )
}

export default ManageStuffLeave
