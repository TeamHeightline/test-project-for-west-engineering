import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {closeDeleteWorkerDialog} from "../Store/workers-editor-slice";
import {deleteWorker, loadWorkers} from "../Store/async-actions";
import DeleteIcon from '@mui/icons-material/Delete';

interface IUIDeleteWorkerDialogProps extends BoxProps {

}


export default function UIDeleteWorkerDialog({...props}: IUIDeleteWorkerDialogProps) {
    const dispatch = useAppDispatch()

    const is_open_delete_worker_dialog = useAppSelector(state => state.workersEditor.is_open_delete_worker_dialog)
    const selected_worker = useAppSelector(state => state.workersEditor.selected_worker)

    const handleClose = () => {
        dispatch(closeDeleteWorkerDialog())
    }

    const handleDelete = () => {
        if (selected_worker) {
            dispatch(deleteWorker(selected_worker))
                .then(() => {
                    dispatch(loadWorkers())
                })
        }
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_delete_worker_dialog && !!selected_worker} onClose={handleClose}
                    fullWidth maxWidth={"xs"}>
                <DialogTitle>Удаление сотрудника</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Вы действительно хотите удалить сотрудника {selected_worker?.name || "Имя не указано"}?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color={"info"} variant={"contained"}
                            startIcon={<CloseIcon/>}>Отмена</Button>
                    <Button onClick={handleDelete} color={"error"} startIcon={<DeleteIcon/>}>Удалить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}