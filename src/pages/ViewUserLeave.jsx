import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken  } from "react-jwt";

import { fetchUserLeaves } from '../features/leaves/leaveActions'
import LoadingSpinner  from '../components/LoadingSpinner'

const ViewUserLeave = () => {
    const [leaves, setLeaves] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);


     // Get data from state
    const { userToken } = useSelector((state) => state.auth)
    const { userLeaveData, isLeaveLoading, isLeaveSuccess } = useSelector((state) => state.leave)

    const token = JSON.parse(userToken)
    // const user_id = decodeToken(token.access)['user_id']


    const dispatch = useDispatch()

    

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

    useEffect(() => {
      dispatch(fetchUserLeaves(token))
      if(isLeaveSuccess){
        setLeaves(userLeaveData)
      }
     
  }, [isLeaveSuccess]);


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


  return (
    <>
        {isLeaveLoading ? 
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoadingSpinner />
            </div>
            :
            <>
                <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leaves {'>'}  User Leave</h2>
                    </header>
                </div>

                <div className='col-span-full mr-8 md:mr-0'>
                    <div className="card">
                        <DataTable value={leaves}
                                    dataKey="id"  paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leaves" globalFilter={globalFilter} header={header} loading={isLeaveLoading}>
                                <Column field="title" header="Reason" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="from_date" header="From" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column field="to_date" header="To" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column field="leave_days" header="Number Of Days" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="reason" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
                                <Column field="date_applied" header="Date Applied" sortable style={{ minWidth: '10rem' }}></Column>
                            </DataTable>
                    </div>
                </div>
            </>
        }
      
    </>
  )
}

export default ViewUserLeave