import React,{useState, useEffect, useCallback } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux'

import { fetchNewLeaves, updateNewLeaves } from '../features/leaves/leaveActions'
import { reset } from '../features/leaves/leaveSlice';
import LoadingSpinner  from '../components/LoadingSpinner'

const ManageStuffLeave = () => {
  const [globalFilter, setGlobalFilter] = useState(null);



  const dispatch = useDispatch()
  // Get data from state
  const {leavesData, isIdle, isLeaveLoading, isLeaveSuccess,  isLeaveError, message}  = useSelector(
  (state) => state.leave)
  

  const initFetch = useCallback(() => {
    dispatch(fetchNewLeaves());
  }, [dispatch])

  useEffect(() => {
    initFetch()
    
  },[isLeaveSuccess, isLeaveError, initFetch])

    const getSeverity = (status) => {
      switch (status) {
          case 'rejected':
              return 'danger';

          case 'approved':
              return 'success';

          case 'pending':
              return 'info';
      }
    };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };



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
    const newState = {...leave, status: status}
    dispatch(updateNewLeaves(newState))
    dispatch(reset())
    
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
        {isLeaveLoading ?
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <LoadingSpinner />
          </div>
         : 
         <div className="card">
              <DataTable value={leavesData}
                        dataKey="id"  paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leaves" globalFilter={globalFilter} header={header} loading={isLeaveLoading}>
                    <Column field="full_name" header="Stuff Name" sortable style={{ minWidth: '12rem' }}></Column>
                    {/* <Column field="department" header="Department" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="title" header="Reason" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="from_date" header="From" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="to_date" header="To" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="leave_days" header="Number Of Days" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="reason" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="date_applied" header="Date Applied" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="Approve or Reject" body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
              </DataTable>
          </div>
         
         }
          
      </div>
    </>
  )
}

export default ManageStuffLeave
