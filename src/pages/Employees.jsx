import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { useDispatch, useSelector } from 'react-redux'

import { EmployeesService } from '../service/EmployeesService';
import { registerEmployee, fetchEmployee, updateEmployeeAction, deleteEmployeeAction } from '../features/employee/employeeActions';
import { reset } from '../features/employee/employeeSlice';

const Employees = () => {
    let emptyEmployee = {
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        phone: '',
        birth_date: new Date(),
        designation: '',
        department: '',
        // password: '',
        // password2: ''
    };

    const [id, setId] = useState(null)
    const [employees, setEmployees] = useState(null);
    const [employeeDialog, setEmployeeDialog] = useState(false);
    const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
    const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
    const [employee, setEmployee] = useState(emptyEmployee);
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

    const { first_name, last_name, gender, email, phone, birth_date, designation, department } = formData

    const {designationData, departmentData}  = useSelector( (state) => state.organization)
    let designationList = JSON.parse(designationData)
    let departmentList = JSON.parse(departmentData)

    const dispatch = useDispatch()
    // Get data from state
    const {employeeData, isLoading, isEmployeeError,  isEmployeeSuccess, message}  = useSelector(
    (state) => state.employee)


    useEffect(() => {
        // get method to fetch department data
        dispatch(fetchEmployee())
        if(isEmployeeSuccess){
            setEmployees(employeeData)
        }
        // dispatch(reset())
    }, [employeeData, isEmployeeError, isEmployeeSuccess, message]);

    const openNew = () => {
        setSubmitted(false);
        setEmployee(emptyEmployee);
        setEmployeeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEmployeeDialog(false);
        setHideButton(true)
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
            let newDate = new Date(birth_date).toLocaleString('en-CA').split(',')[0]
            let newData = {...formData, 
                "birth_date": newDate, 
                "gender": gender.name, 
                "designation": designation.id, 
                "department": department.id
            }

            // let newData = {
            //     "email": email,
            //     "first_name": first_name,
            //     "last_name": last_name,
            //     "department": department.id,
            //     "designation": designation.id,
            //     "phone": phone,
            //     "gender": gender.name,
            //     "birth_date": newDate,
            // }

            dispatch(registerEmployee(newData))
            // dispatch(reset())

            // setEmployees(_employees);
            setEmployeeDialog(false);
            setEmployee(emptyEmployee);
        }
    };

    const updateEmployee = () => {
        setSubmitted(true);

        // if (first_name.trim() && last_name.trim() && email.trim() && phone.trim() && gender.name.trim() && designation.name.trim(), department.name.trim()) {

            let newDate = new Date(birth_date).toLocaleString('en-CA').split(',')[0]

            id
            const newState ={
                ...formData,
                "id": id,
                "birth_date": newDate, 
                "gender": gender.name, 
                "designation": designation.id, 
                "department": department.id
            }
            
            dispatch(updateEmployeeAction(newState))
            dispatch(reset())
            setEmployeeDialog(false);
        // }
      }

    const editEmployee = (data) => {
        let newDate = new Date(data.birth_date)
        let newData = {...data, birth_date: newDate}
        setId(data.id)
        setFormData(newData)
        setEmployeeDialog(true);
        setHideButton(false)
    };

    const confirmDeleteEmployee = (data) => {
        setEmployee(data);
        setId(data.id)
        setDeleteEmployeeDialog(true);
    };

    const deleteEmployee = () => {
        let data = {...formData, "id": id}
        dispatch(deleteEmployeeAction(data))
        setDeleteEmployeeDialog(false);
        setEmployee(emptyEmployee);
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
        <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            <DataTable ref={dt} value={employees} selection={selectedEmployees} onSelectionChange={(e) => setSelectedEmployees(e.value)}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="id" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="first_name" header="FirstName" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="last_name" header="LastName" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="gender" header="Gender" ></Column>
                <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="phone" header="Phone" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="birth_date" header="Date Of Birth" dataType="date" style={{ minWidth: '10rem' }}></Column>
                <Column field="designation" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>

        {/* Edit Dialog modal  */}
        <Dialog visible={employeeDialog} style={{ width: '50em' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Employee Details" modal className="p-fluid" footer={employeeDialogFooter} onHide={hideDialog}>
                {employee.image && <img src={`${employee.image}`} alt={employee.image} className="block m-auto pb-3" />}
                
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className="field">
                        <label htmlFor="first_name" className="font-bold">
                            First Name
                        </label>
                        <InputText id="first_name" value={first_name} name='first_name' onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !first_name })} />
                        {submitted && !first_name && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field md:mx-4">
                        <label htmlFor="last_name" className="font-bold">
                            Last Name
                        </label>
                        <InputText id="last_name" value={last_name} name='last_name'  onChange={(e) => onInputChange(e)} required className={classNames({ 'p-invalid': submitted && !last_name })} />
                        {submitted && !last_name && <small className="p-error">Field is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="gender" className="font-bold">
                            Gender
                        </label>
                        {/* <InputText id="gender" value={employee.gender} name='gender'  onChange={(e) => onInputChange(e)} required className={classNames({ 'p-invalid': submitted && !employee.gender })}/> */}
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
                        <label htmlFor="birth_date" className="font-bold">
                            Birth Date
                        </label>
                        <Calendar 
                            id="birth_date"  
                            value={birth_date} 
                            name='birth_date' 
                            onChange={(e) => onInputChange(e)}  
                            dateFormat="yy-mm-dd"  
                            required 
                            className={classNames({ 'p-invalid': submitted && !birth_date })}
                        />
                        {submitted && !birth_date && <small className="p-error">Field is required.</small>}
                    </div>
                </div>
                
                <div className='flex flex-col md:flex-row justify-between gap-5'>
                    <div className="field w-full">
                        <label htmlFor="designation" className="font-bold">
                            Title
                        </label>
                        {/* <InputText 
                            id="title" 
                            value={employee.designation} 
                            name='designation' 
                            onChange={(e) => onInputChange(e)} 
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !employee.designation })}
                        /> */}

                        <Dropdown inputId="designation" name='designation'
                            value={designation} onChange={(e) => onInputChange(e)} 
                            options={designationList} optionLabel="name" 
                            className='w-full' 
                            placeholder='Designation'
                            />
                        {submitted && !designation && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field w-full">
                        <label htmlFor="department" className="font-bold">
                            Department
                        </label>
                        {/* <InputText id="department" 
                            value={employee.department} 
                            name='department' onChange={(e) => onInputChange(e)} 
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !employee.department })}
                        /> */}
                        <Dropdown inputId="department" name='department'
                            value={department} onChange={(e) => onInputChange(e)} 
                            options={departmentList} optionLabel="name" 
                            className='w-full' 
                            placeholder='Choose Department'
                            />
                        
                        {submitted && !department && <small className="p-error">Field is required.</small>}
                    </div>
                </div>

                {/* <div className='flex flex-col md:flex-row justify-between gap-5'>
                    <div className="field w-full">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <InputText id="password" 
                            value={employee.password} 
                            name='password' 
                            onChange={(e) => onInputChange(e)}
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !employee.password })}
                            type='password'
                        />
                        {submitted && !employee.password && <small className="p-error">Field is required.</small>}
                    </div>
                    <div className="field w-full">
                        <label htmlFor="title" className="font-bold">
                            Password Again
                        </label>
                        <InputText id="password2" 
                            value={employee.password2} 
                            name='password2' 
                            onChange={(e) => onInputChange(e)} 
                            required 
                            className={'w-full' + classNames({ 'p-invalid': submitted && !employee.password2 })}
                            type='password'
                        />
                        {submitted && !employee.password2 && <small className="p-error">Field is required.</small>}
                    </div>
                </div> */}

            </Dialog>

            <Dialog visible={deleteEmployeeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {employee && (
                        <span>
                            Are you sure you want to delete <b>{employee.first_name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteEmployeesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEmployeesDialogFooter} onHide={hideDeleteEmployeesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {employee && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
      </div>
      
    </>
  )
}

export default Employees