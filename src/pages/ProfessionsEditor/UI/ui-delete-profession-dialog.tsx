import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {closeDeleteProfessionDialog} from "../Store/professions-slice";
import {deleteProfession, loadProfessions} from "../Store/async-actions";
import DeleteIcon from '@mui/icons-material/Delete';


interface IUIDeleteProfessionDialogProps extends BoxProps {

}


export default function UIDeleteProfessionDialog({...props}: IUIDeleteProfessionDialogProps) {
    const dispatch = useAppDispatch()
    const is_open_delete_profession_dialog = useAppSelector((state) => state.professionsEditor.is_open_delete_profession_dialog)
    const selected_profession_id = useAppSelector((state) => state.professionsEditor.selected_profession_id)
    const professions = useAppSelector((state) => state.professionsEditor.professions)

    const handleClose = () => {
        dispatch(closeDeleteProfessionDialog())
    }

    const handleDeleteProfession = async () => {
        if (selected_profession_id) {
            dispatch(deleteProfession(selected_profession_id))
                .then(() => {
                    dispatch(loadProfessions())
                })
        }
    }
    return (
        <Box {...props}>
            <Dialog open={is_open_delete_profession_dialog && !!selected_profession_id}
                    onClose={handleClose} fullWidth maxWidth={"xs"}>
                <DialogTitle>Удаление должности</DialogTitle>
                <DialogContent>
                    Вы уверены, что хотите удалить должность
                    "{professions?.find((profession) => profession.id === selected_profession_id)?.name || "Должность без названия"}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<CloseIcon/>} color={"info"}>Отмена</Button>
                    <Button onClick={handleDeleteProfession} startIcon={<DeleteIcon/>} color={"error"}>Удалить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}