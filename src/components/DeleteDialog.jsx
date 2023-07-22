import React,{ useState, useEffect, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const DeleteDialog = ({dataToDelete, setDataToDelete, deleteDialog, setDeleteDialog, dataList, setDataList, toast }) => {

    // const [deleteDialog, setDeleteDialog] = useState(false)
    // const [dataToDelete, setDataToDelete] = useState()

    const onDeleteDialog = () => {
        let _dataList = dataList.filter((val) => val.id !== dataToDelete.id);
    
        setDataList(_dataList);
        setDeleteDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
        setDataToDelete('')
    };


    const hideDeleteDialog = () => {
        setDeleteDialog(false)
    }
    
    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined  onClick={()=> hideDeleteDialog()}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => onDeleteDialog()}/>
        </React.Fragment>
    );

  return (
    <>
        <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                  <div className="confirmation-content">
                      <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                      {dataToDelete && (
                        <span>
                            Are you sure you want to delete <b>{dataToDelete.name}</b>?
                        </span>
                    )}
                  </div>
        </Dialog>

    </>
  )
}

export default DeleteDialog