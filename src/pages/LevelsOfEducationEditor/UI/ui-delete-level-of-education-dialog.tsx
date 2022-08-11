import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {closeDeleteLevelsDialog} from "../Store/levels-of-education-editor-slice";
import {deleteLevel, loadLevels} from "../Store/async-actions";

interface IUIDeleteLevelOfEducationDialogProps extends BoxProps {

}


export default function UIDeleteLevelOfEducationDialog({...props}: IUIDeleteLevelOfEducationDialogProps) {
    const dispatch = useAppDispatch()

    const is_open_delete_level_dialog = useAppSelector((state) => state.levelsOfEducationEditor.is_open_delete_level_dialog)
    const selected_level_id = useAppSelector((state) => state.levelsOfEducationEditor.selected_level_id)
    const levels = useAppSelector((state) => state.levelsOfEducationEditor.levels)

    const handleClose = () => {
        dispatch(closeDeleteLevelsDialog())
    }

    const handleDeleteLevel = async () => {
        if (selected_level_id) {
            dispatch(deleteLevel(selected_level_id))
                .then(() => {
                    dispatch(loadLevels())
                })
        }
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_delete_level_dialog && !!selected_level_id}
                    onClose={handleClose} fullWidth maxWidth={"xs"}>
                <DialogTitle>Удаление уровня образования</DialogTitle>
                <DialogContent>
                    Вы уверены, что хотите удалить уровень образования
                    "{levels?.find((profession) => profession.id === selected_level_id)?.name || "Уровень образования без названия"}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<CloseIcon/>} color={"info"}>Отмена</Button>
                    <Button onClick={handleDeleteLevel} startIcon={<DeleteIcon/>} color={"error"}>Удалить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}