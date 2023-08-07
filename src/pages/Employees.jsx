import React, { useState, useEffect, useRef, useCallback } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { useDispatch, useSelector } from 'react-redux'

import { registerEmployee, fetchEmployee, updateEmployeeAction, deleteEmployeeAction } from '../features/employee/employeeActions';
import { reset } from '../features/employee/employeeSlice';

import { fetchDepartment, fetchDesignation } from '../features/organization/orgActions'
import LoadingSpinner  from '../components/LoadingSpinner'

const Employees = () => {
    let emptyEmployee = {
        first_name: '',
        last_name: '',
        middle_name: null,
        is_hr: false,
        is_employee: false,
        start_date: null,
        gender: '',
        email: '',
        phone: '',
        date_of_birth: new Date(),
        designation: '',
        department: '',
        password: '',
        password2: ''
    };

    const [id, setId] = useState(null)
    const [employees, setEmployees] = useState(null);
    const [employeeDialog, setEmployeeDialog] = useState(false);
    const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
    const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
    const [formData, setFormData] = useState(emptyEmployee);
    const [selectedEmployees, setSelectedEmployees] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [hideButton, setHideButton] = useState(true)

    const genderType = [
        {name:'Male'}, 
        {name:'Female'},
    ]

   

    const { first_name, last_name, gender, email, phone, date_of_birth, designation, department, start_date, is_hr, is_employee, password, password2 } = formData

    const {departmentData, designationData}  = useSelector((state) => state.organization)
    
    let designationList = designationData
    let departmentList = departmentData

    const dispatch = useDispatch()
    // Get data from state
    const {employeeData, isEmployeeError, isEmployeeLoading, isEmployeeSuccess, message}  = useSelector((state) => state.employee)


    // const initFetch = useCallback(() => {
       
    //   }, [dispatch])

    useEffect(() => {
        // get method to fetch department data
  
        dispatch(fetchEmployee())
        dispatch(fetchDepartment())
        dispatch(fetchDesignation())

    }, [isEmployeeError, isEmployeeSuccess, message]);


    const openNew = () => {
        setSubmitted(false);
        setFormData(emptyEmployee);
        setEmployeeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEmployeeDialog(false);
        setHideButton(true)
        setFormData('')
    };

    const hideDeleteEmployeeDialog = () => {
        setDeleteEmployeeDialog(false);
    };

    const hideDeleteEmployeesDialog = () => {
        setDeleteEmployeesDialog(false);
    };

    const saveEmployee = () => {
        setSubmitted(true);

        if (first_name.trim() && last_name.trim() && email.trim() && phone.trim() && gender.name.trim() && designation.name.trim(), department.name.trim()) {
            let newDate = new Date(date_of_birth).toLocaleString('en-CA').split(',')[0]
            let startDate = new Date(start_date).toLocaleString('en-CA').split(',')[0]
            let newData = {...formData, 
                "date_of_birth": newDate, 
                "start_date": startDate, 
                "gender": gender.name, 
                "designation": designation.id, 
                "department": department.id
            }

            dispatch(registerEmployee(newData))
            dispatch(reset())

            setEmployeeDialog(false);
            setFormData(formData);
            
        }
    };

    const updateEmployee = () => {
        if(first_name && last_name && email && phone && gender.name && designation.name, department.name){
            setSubmitted(true);
            let newDate = new Date(date_of_birth).toLocaleString('en-CA').split(',')[0]
            let startDate = new Date(start_date).toLocaleString('en-CA').split(',')[0]

            id
            const newState ={
                ...formData,
                "id": id,
                "date_of_birth": newDate, 
                "start_date": startDate, 
                "gender": gender.name, 
                "designation": designation.id, 
                "department": department.id
            }
            
            dispatch(updateEmployeeAction(newState))
            dispatch(reset())

            setEmployeeDialog(false);
            setFormData(newState);

        }
       
      }

    const editEmployee = (data) => {
        let newDate = new Date(data.date_of_birth)
        let newData = {...data, date_of_birth: newDate}
        setId(data.id)
        setFormData(newData)
        setEmployeeDialog(true);
        setHideButton(false)
        dispatch(reset())
    };

    const confirmDeleteEmployee = (data) => {
        setFormData(data);
        setId(data.id)
        setDeleteEmployeeDialog(true);
        dispatch(reset())
    };

    const deleteEmployee = () => {
        let data = {...formData, "id": id}
        dispatch(deleteEmployeeAction(data))
        setDeleteEmployeeDialog(false);
        setFormData(emptyEmployee);
        dispatch(reset())
    };


    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteEmployeesDialog(true);
    };

    const deleteSelectedEmployees = () => {
        let _employees = employees.filter((val) => !selectedEmployees.includes(val));

        console.log(selectedEmployees)

        setEmployees(_employees);
        setDeleteEmployeesDialog(false);
        setSelectedEmployees(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
    };


    const onInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))

          if(e.target.name === 'is_hr'){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: !e.target.value,
              }))
          }

          if(e.target.name === 'is_employee'){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: !e.target.value,
              }))
          }
    };

   



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Add Employee" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedEmployees || !selectedEmployees.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.image}`} alt={rowData.image} className="shadow-md rounded-lg" style={{ width: '100px' }} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editEmployee(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteEmployee(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0">Manage Employees</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const employeeDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />

            { hideButton ? 
                <Button label="Save" icon="pi pi-check" onClick={saveEmployee} />
                  :
                <Button label='Update' icon="pi pi-pencil"  className='w-full' onClick={updateEmployee}/>
            }

        </React.Fragment>
    );
    const deleteEmployeeDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteEmployeeDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteEmployee} />
        </React.Fragment>
    );
    const deleteEmployeesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteEmployeesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedEmployees} />
        </React.Fragment>
    );


  return (
    <>
      <div className="col-span-full mr-8 md:mr-0 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-1 py-1 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Employees {'>'} Employees</h2>
            </header>
      </div>
      <div className='col-span-full'>
      <Toast ref={toast} />

        {isEmployeeLoading ? 
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoadingSpinner />
            </div>
         :
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={employeeData} selection={selectedEmployees} onSelectionChange={(e) => setSelectedEmployees(e.value)}
                        dataKey="id"  paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header} loading={isEmployeeLoading}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {/* <Column field="id" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="first_name" header="FirstName" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_name" header="LastName" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="gender" header="Gender" ></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="phone" header="Phone" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="date_of_birth" header="Date Of Birth" dataType="date" style={{ minWidth: '10rem' }}></Column>
                    <Column field="designation" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="start_date" header="Start Date" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="is_hr" header="Is HR" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="is_employee" header="Is Employee" sortable style={{ minWidth: '16rem' }}></Column>
                    {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
        }

        

        {/* Edit Dialog modal  */}
        <Dialog visible={employeeDialog} style={{ width: '50em' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Employee Details" modal className="p-fluid" footer={employeeDialogFooter} onHide={hideDialog}>
                
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="field">
                        <label htmlFor="first_name" className="font-bold">
                            First Name
                        </label>
                        <InputText 
                            id="first_name" 
                            value={first_name} 
                            name='first_name' 
                            onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !first_name })} 
                        />
                        {submitted && !first_name && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field md:mx-4">
                        <label htmlFor="last_name" className="font-bold">
                            Last Name
                        </label>
                        <InputText 
                            id="last_name" 
                            value={last_name} 
                            name='last_name'  
                            onChange={(e) => onInputChange(e)} required className={classNames({ 'p-invalid': submitted && !last_name })} 
                        />
                        {submitted && !last_name && <small className="p-error">Field is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="gender" className="font-bold">
                            Gender
                        </label>
                        <Dropdown inputId="gender" name='gender'
                            value={gender} onChange={(e) => onInputChange(e)} 
                            options={genderType} optionLabel="name" 
                            className='full' 
                            placeholder='Choose Gender'
                            />

                        
                        {submitted && !gender && <small className="p-error">Field is required.</small>}
                    </div>
                
                </div>
                
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="field">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <InputText 
                            id="email" 
                            type='email' 
                            value={email} 
                            name='email'  
                            onChange={(e) => onInputChange(e)} 
                            required 
                            className={classNames({ 'p-invalid': submitted && !email })}
                        />
                        {submitted && !email && <small className="p-error">Field is required.</small>}
                    </div>

                    <div className="field md:mx-4">
                        <label htmlFor="phone" className="font-bold">
                            Phone
                        </label>
                        <InputText 
                            id="phone" 
                            value={phone} 
                            name='phone' 
                            onChange={(e) => onInputChange(e)} 
                            required 
                            className={classNames({ 'p-invalid': submitted && !phone })}
                        />
                        {submitted && !phone && <small className="p-error">Field is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="date_of_birth" className="font-bold">
                            Birth Date
                        </label>
                        <Calendar 
                            id="date_of_birth"  
                            value={date_of_birth} 
                            name='date_of_birth' 
                            onChange={(e) => onInputChange(e)}  
                            dateFormat="yy-mm-dd"  
                            required 
                            className={classNames({ 'p-invalid': submitted && !date_of_birth })}
                        />
                        {submitted && !date_of_birth && <small className="p-error">Field is required.</small>}
                    </div>
                </div>
                
                <div className='flex flex-col md:flex-row justify-between gap-5'>
                    <div className="field w-full">
                        <label htmlFor="designation" className="font-bold">
                            Title
                        </label>

                        <Dropdown inputId="designation" name='designation'
                            value={designation} onChange={(e) => onInputChange(e)} 
                            options={designationList} optionLabel="name" 
                            className='w-full' 
                            placeholder='Choose Role'
                            />
                        {submitted && !designation && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field w-full">
                        <label htmlFor="department" className="font-bold">
                            Department
                        </label>
                        <Dropdown inputId="department" name='department'
                            value={department} onChange={(e) => onInputChange(e)} 
                            options={departmentList} optionLabel="name" 
                            className='w-full' 
                            placeholder='Choose Department'
                            />
                        
                        {submitted && !department && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field w-full">
                        <label htmlFor="start_date" className="font-bold">
                            Start Date
                        </label>
                        <Calendar 
                            id="start_date"  
                            value={start_date} 
                            name='start_date' 
                            onChange={(e) => onInputChange(e)}  
                            dateFormat="yy-mm-dd"  
                            className=''
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-content-center gap-3 my-4">
                    <div className="flex align-items-center">
                        <Checkbox inputId="is_hr" name="is_hr" value={is_hr}  onChange={(e) => onInputChange(e)}  checked={is_hr}/>
                        <label htmlFor="is_hr" className="ml-2">Is HR</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox inputId="is_employee" name="is_employee" value={is_employee}  onChange={(e) => onInputChange(e)} checked={is_employee}/>
                        <label htmlFor="is_employee" className="ml-2">Is Employee</label>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between gap-5'>
                    <div className="field w-full">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <InputText id="password" 
                            value={password} 
                            name='password' 
                            onChange={(e) => onInputChange(e)}
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !password })}
                            type='password'
                        />
                        {submitted && !password && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field w-full">
                        <label htmlFor="title" className="font-bold">
                            Password Again
                        </label>
                        <InputText id="password2" 
                            value={password2} 
                            name='password2' 
                            onChange={(e) => onInputChange(e)} 
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !password2 })}
                            type='password'
                        />
                        {submitted && !password2 && <small className="p-error">Field is required.</small>}
                    </div>
                </div>

            </Dialog>

            <Dialog visible={deleteEmployeeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {formData && (
                        <span>
                            Are you sure you want to delete <b>{first_name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteEmployeesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEmployeesDialogFooter} onHide={hideDeleteEmployeesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {formData && <span>Are you sure you want to delete the selected employees?</span>}
                </div>
            </Dialog>
      </div>
      
    </>
  )
}

export default Employees