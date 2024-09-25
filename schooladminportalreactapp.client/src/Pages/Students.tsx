import { useState, useEffect } from 'react'
import { Typography, Box, IconButton, Tooltip, Stack, Button, TextField } from "@mui/material"
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { IStudent, IStudentPagedRequest } from '../Interfaces/Student'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IDataGridState, IPaginationState } from '../Interfaces/DataGrid';
import { IDialog } from '../Interfaces/Dialog';
import { useForm } from 'react-hook-form';
import DeleteConfirmDialog from '../Components/DeleteConfirmDialog'

const Students = () => {
    const [dataGrid, setDataGrid] = useState<IDataGridState>({
        rows: [],
        columns: [
            {
                type: 'string',
                field: 'fullName',
                headerName: 'Name',
                valueGetter: (value: any, row: IStudent) => {
                    var val = value;
                    val = val;

                    return `${row.firstName} ${row.lastName}`;
                },
                flex: 1,
                filterable: false,
            },
            {
                type: 'number',
                field: 'yearGroup',
                headerName: 'Year',
                flex: 1,
                filterable: false,
            },
            {
                type: 'string',
                field: 'emergencyContact',
                headerName: 'Emergency Contact',
                flex: 1,
                filterable: false,
            },
            {
                type: 'string',
                field: 'created',
                headerName: 'Created',
                flex: 1,
                filterable: false,
                valueGetter: (value: Date) => {
                    const date = new Date(value);
                    const formattedDate = date.toLocaleString();
                    return formattedDate;
                },
            },
            {
                field: "action",
                headerName: "",
                sortable: false,
                flex: 1,
                renderCell: (params: any) => {
                    return (
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit" onClick={() => onEditClick(params.row)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete" onClick={() => setDialog({ ...dialog, openDeleteConfirm:true, deleteId: params.row.id })}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    );
                }
            },

        ],
        total: 0,
        loading: true
    })
    const [paginationModel, setPaginationModel] = useState<IPaginationState>({
        page: 0,
        pageSize: 10,
    });
    const [dialog, setDialog] = useState<IDialog>({ openDeleteConfirm: false, openCreateEdit: false, isEdit: false, deleteId:"" });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IStudent>({
        defaultValues: {
            firstName: "",
            lastName: "",
            yearGroup: 7,
            emergencyContact: ""
        }
    });

    useEffect(() => {
        GetStudents(paginationModel.page, paginationModel.pageSize)
    }, [setPaginationModel, paginationModel])

    async function GetStudents(page: number, pageSize: number) {
        const response = await fetch(`/student/getAll/${page}/${pageSize}`);
        const result = await response.json() as IStudentPagedRequest;
        setDataGrid({
            ...dataGrid,
            rows: result.data,
            total: result.totalItems,
            loading: false
        });
    }

    function closeDialog() {
        setDialog({ ...dialog, openCreateEdit: false, openDeleteConfirm:false });
        setTimeout(() => {
            setDialog({ ...dialog, isEdit: false, openCreateEdit: false, openDeleteConfirm: false });
            reset({
                firstName: "",
                lastName: "",
                yearGroup: 7,
                emergencyContact: ""
            });
        }, 200)

    }

    function onEditClick(data: IStudent) {
        reset({ ...data });
        setDialog({ ...dialog, openCreateEdit: true, isEdit: true });
    }

    function onSubmit(data: IStudent) {
        if (dialog.isEdit) editStudent(data);
        else createStudent(data);
    }

    function createStudent(data: IStudent) {
        fetch("/student/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                // handle success or error from the server
                console.log(data);
                if (data.ok) {
                    closeDialog();
                    setDataGrid({ ...dataGrid, loading: true });
                    GetStudents(0, 10);
                }
                else
                    alert("Failed to create student. Please try again later.")

            })
            .catch((error) => {
                // handle network error
                console.error(error);
            });
    }

    function editStudent(data: IStudent) {
        fetch("/student/update", {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                // handle success or error from the server
                console.log(data);
                if (data.ok) {
                    closeDialog();
                    setDataGrid({ ...dataGrid, loading: true });
                    GetStudents(0, 10);
                }
                else
                    alert("Failed to create student. Please try again later.")

            })
            .catch((error) => {
                // handle network error
                console.error(error);
            });
    }

    function onDelete() {
        fetch(`/student/delete/${dialog.deleteId}`, {
            method: "DELETE",
        })
            .then(() => {
                closeDialog();
                GetStudents(0, 10);
            })
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 5 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Typography variant="h6">Students</Typography>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setDialog({...dialog, openCreateEdit: true, isEdit: false })}>
                        Create
                    </Button>
                </Stack>
                <Box width="100%" height={500}>
                    <DataGrid
                        loading={dataGrid.loading}
                        disableRowSelectionOnClick
                        disableColumnMenu
                        disableColumnFilter
                        disableMultipleRowSelection
                        rows={dataGrid.rows}
                        columns={dataGrid.columns}
                        pagination
                        paginationMode="server"
                        pageSizeOptions={[5, 10, 15]}
                        rowCount={dataGrid.total}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    />
                </Box>
            </Box>
            <Dialog onClose={closeDialog} open={dialog.openCreateEdit} fullWidth maxWidth="sm">
                <DialogTitle>{dialog.isEdit ? "Edit Student" : "Create Student"}</DialogTitle>
                <DialogContent>
                    <Box component="form">
                        <TextField label="First Name" {...register("firstName", { required: "Requried field" })} margin="normal" fullWidth />
                        <Typography color="error">
                            {errors.firstName && errors.firstName.message}
                        </Typography>
                        <TextField label="Last Name" {...register("lastName", { required: "Requried field" })} margin="normal" fullWidth />
                        <Typography color="error">
                            {errors.lastName && errors.lastName.message}
                        </Typography>
                        <TextField type="number" label="Year" {...register("yearGroup", { required: "Requried field", min: 7, max: 13 })} margin="normal" fullWidth />
                        <Typography color="error">
                            {errors.yearGroup && errors.yearGroup.message}
                        </Typography>
                        <TextField label="Emergency Contact" {...register("emergencyContact", { required: "Requried field" })} margin="normal" fullWidth />
                        <Typography color="error">
                            {errors.emergencyContact && errors.emergencyContact.message}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "right" }}>
                    <Button size="small" color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{dialog.isEdit ? "Edit" : "Create"}</Button>
                </DialogActions>
            </Dialog>
            <DeleteConfirmDialog
                open={dialog.openDeleteConfirm}
                title="Are you sure you want to delete this student?"
                handleClose={closeDialog}
                onDelete={onDelete}
            />
        </>
    );
}

export default Students;