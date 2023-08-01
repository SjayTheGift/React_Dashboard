import React,{useState, useEffect} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


import useFetch  from '../service/FetchNewLeaveService';

const ManageStuffLeave = ({userLeaveApi, setUserLeaveApi}) => {
  const [globalFilter, setGlobalFilter] = useState(null);

  // const [leaves, setLeaves] = useState([])

  let filteredLeaves = userLeaveApi.filter((leave) => {
    return leave.status === 'new';
  });


  const {data : leaves, setData : setLeaves, isPending, error} = useFetch('http://127.0.0.1:8000/api/leave/leave-new/')

  console.log(leaves)
  



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
    const newState = userLeaveApi.map(obj => {
      // 👇️ if id equals to leave id passes, update status to approved
      if(obj.id == leave.id){
        return {...obj, status: status};
      }
      // 👇️ otherwise return the object as is
      return obj;
    })
    setUserLeaveApi(newState)
  }


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
