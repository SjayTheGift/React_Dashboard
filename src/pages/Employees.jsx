import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const Employees = () => {

  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'employeeName',
        header: 'Employee Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'contact',
        header: 'Contact',
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'department',
        header: 'Department',
      },
      {
        accessorKey: 'startDate',
        header: 'StartDate',
      },
      
      //end
    ],
    [],
  );

  const data = useMemo(
    //data definitions...
    () => [
      {
        id: 1,
        employeeName: 'Hugh Jay',
        email: 'HughJay@email.com',
        contact: '067-052-5566',
        title: 'Software Developer',
        department: 'ICT',
        startDate: '2015-02-03'
      },
    ],
    [],
    //end
  );


  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Organization {'>'} Employees</h2>
            </header>
      </div>
      <div className='col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700'>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnFilters={false} //disable all column filters
          />
      </div>
      
    </>
  )
}

export default Employees