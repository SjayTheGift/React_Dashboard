import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

import { EmployeesService } from '../service/EmployeesService';

const Employees = () => {
    let emptyEmployee = {
        id: null,
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        birthDate: new Date('2018-06-09T00:00:00.000Z'),
        image: null,
        title: ""
    };
    // let date = new Date('2018-06-09T00:00:00.000Z');

    const [employees, setEmployees] = useState(null);
    const [employeeDialog, setEmployeeDialog] = useState(false);
    const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
    const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
    const [employee, setEmployee] = useState(emptyEmployee);
    const [selectedEmployees, setSelectedEmployees] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        EmployeesService.getEmployees().then((data) => setEmployees(data));
    }, []);

    const openNew = () => {
        setSubmitted(false);
        setEmployee(emptyEmployee);
        setEmployeeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEmployeeDialog(false);
    };

    const hideDeleteEmployeeDialog = () => {
        setDeleteEmployeeDialog(false);
    };

    const hideDeleteEmployeesDialog = () => {
        setDeleteEmployeesDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (employee.firstName.trim()) {
            let _employees = [...employees];
            let _employee = { ...employee };

            if (employee.id) {
                const index = findIndexById(employee.id);

                _employees[index] = _employee;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
            } else {
                _employee.id = createId();
                _employees.push(_employee);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
            }

            setEmployees(_employees);
            setEmployeeDialog(false);
            setEmployee(emptyEmployee);
        }
    };

    const editProduct = (employee) => {
        setEmployee({ ...employee });
        setEmployeeDialog(true);
    };

    const confirmDeleteEmployee = (employee) => {
        setEmployee(employee);
        setDeleteEmployeeDialog(true);
    };

    const deleteEmployee = () => {
        let _employees = employees.filter((val) => val.id !== employee.id);

        setEmployees(_employees);
        setDeleteEmployeeDialog(false);
        setEmployee(emptyEmployee);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteEmployeesDialog(true);
    };

    const deleteSelectedEmployees = () => {
        let _employees = employees.filter((val) => !selectedEmployees.includes(val));

        setEmployees(_employees);
        setDeleteEmployeesDialog(false);
        setSelectedEmployees(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
    };

    const formatDate = (value) => {
        return value;
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.name) || '';
        let _employee = { ...employee };

        _employee[`${name}`] = val;

        setEmployee(_employee);
    };

    const onInputChangeDate = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _employee = { ...employee };

        _employee[`${name}`] = val;

        console.log(e.target)

        setEmployee(_employee);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _employee = { ...employee };

        _employee[`${name}`] = val;

        setEmployee(_employee);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Add Employee" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedEmployees || !selectedEmployees.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.image}`} alt={rowData.image} className="shadow-md rounded-lg" style={{ width: '100px' }} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
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
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
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
                <Column field="firstName" header="FirstName" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="lastName" header="LastName" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="gender" header="Gender" ></Column>
                <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="phone" header="Phone" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="birthDate" header="Birth Date" dataType="date" style={{ minWidth: '10rem' }}></Column>
                <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>

        {/* Edit Dialog modal  */}
        <Dialog visible={employeeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Employee Details" modal className="p-fluid" footer={employeeDialogFooter} onHide={hideDialog}>
                {employee.image && <img src={`${employee.image}`} alt={employee.image} className="block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="firstName" className="font-bold">
                        First Name
                    </label>
                    <InputText id="firstName" value={employee.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.firstName })} />
                    {submitted && !employee.firstName && <small className="p-error">FirstName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Last Name
                    </label>
                    <InputText id="description" value={employee.lastName} onChange={(e) => onInputChange(e, 'lastName')} required className={classNames({ 'p-invalid': submitted && !employee.lastName })} />
                    {submitted && !employee.lastName && <small className="p-error">LastName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="gender" className="font-bold">
                        Gender
                    </label>
                    <InputText id="gender" value={employee.gender} onChange={(e) => onInputChange(e, 'gender')} required className={classNames({ 'p-invalid': submitted && !employee.gender })}/>
                    {submitted && !employee.gender && <small className="p-error">Gender is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !employee.email })}/>
                    {submitted && !employee.email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="phone" className="font-bold">
                        Phone
                    </label>
                    <InputText id="phone" value={employee.phone} onChange={(e) => onInputChange(e, 'phone')} required className={classNames({ 'p-invalid': submitted && !employee.phone })}/>
                    {submitted && !employee.phone && <small className="p-error">Phone is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="birthDate" className="font-bold">
                        Birth Date
                    </label>
                    <Calendar id="birthDate"  value={employee.birthDate} name={employee.birthDate} onChange={(e) => onInputChangeDate(e, 'birthDate')}  dateFormat="yy-mm-dd"  required className={classNames({ 'p-invalid': submitted && !employee.birthDate })} ></Calendar>
                    {submitted && !employee.birthDate && <small className="p-error">Birth Date is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <InputText id="title" value={employee.title} onChange={(e) => onInputChange(e, 'title')} required className={classNames({ 'p-invalid': submitted && !employee.title })}/>
                    {submitted && !employee.title && <small className="p-error">Title is required.</small>}
                </div>

            </Dialog>

            <Dialog visible={deleteEmployeeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {employee && (
                        <span>
                            Are you sure you want to delete <b>{employee.firstName}</b>?
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