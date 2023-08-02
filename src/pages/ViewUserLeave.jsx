import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken  } from "react-jwt";

import { fetchUserLeaves } from '../features/leaves/leaveActions'

const ViewUserLeave = ({userLeaveApi}) => {
    const [leaves, setLeaves] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);

    // const [user, setUser] = useState()


     // Get data from state
    const { userToken } = useSelector((state) => state.auth)

    const user = JSON.parse(userToken)
    const user_id = decodeToken(user.access)['user_id']


    const dispatch = useDispatch()

    

    const getSeverity = (status) => {
        switch (status) {
            case 'rejected':
                return 'danger';

            case 'approved':
                return 'success';

            case 'new':
                return 'info';
        }
    };

    useEffect(() => {
      dispatch(fetchUserLeaves(user_id))
      setLeaves(userLeaveApi)
  }, []);


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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} leaves" globalFilter={globalFilter} header={header}>
                    <Column field="reason" header="Reason" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="fromDate" header="From" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="toDate" header="To" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="dateApplied" header="Date Applied" sortable style={{ minWidth: '10rem' }}></Column>
                </DataTable>
          </div>
        </div>
    </>
  )
}

export default ViewUserLeave