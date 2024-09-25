import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'

interface IDeleteConfirmProps{
    open: boolean;
    title: string;
    handleClose: () => void;
    onDelete: () => void;
}

const DeleteConfirmDialog = ({ open, handleClose, title, onDelete }: IDeleteConfirmProps) => {
    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
            <DialogTitle>{title}</DialogTitle>
            <DialogActions sx={{ justifyContent: "right" }}>
                <Button size="small" color="error" variant="contained" onClick={handleClose}>No</Button>
                <Button size="small" color="primary" variant="contained" onClick={onDelete}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteConfirmDialog;