import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {closeCreateLevelsDialog, setNewLevelsName} from "../Store/levels-of-education-editor-slice";
import {createLevel, loadLevels} from "../Store/async-actions";

interface IUICreateEducationLevelProps extends BoxProps {

}


export default function UiCreateEducationLevelDialog({...props}: IUICreateEducationLevelProps) {
    const dispatch = useAppDispatch()
    const is_open_create_levels_dialog = useAppSelector((state) => state.levelsOfEducationEditor.is_open_create_levels_dialog)
    const new_level_name = useAppSelector((state) => state.levelsOfEducationEditor.new_level_name)

    const handleClose = () => {
        dispatch(closeCreateLevelsDialog())
    }
    const handleChangeEducationLevelName = (event: { target: { value: string; }; }) => {
        dispatch(setNewLevelsName(event.target.value))
    }

    const handleCreateProfession = async () => {
        dispatch(createLevel({name: new_level_name}))
            .then(() => {
                dispatch(loadLevels())
            })
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_create_levels_dialog} onClose={handleClose} fullWidth maxWidth={"xs"}>
                <DialogTitle>Создание уровня образования</DialogTitle>
                <DialogContent>
                    <TextField
                        value={new_level_name}
                        onChange={handleChangeEducationLevelName}
                        autoFocus
                        margin="dense"
                        id="education-level-name"
                        label="Название уровня образования"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<CloseIcon/>} color={"error"}>Отмена</Button>
                    <Button onClick={handleCreateProfession} startIcon={<AddIcon/>}>Создать</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}