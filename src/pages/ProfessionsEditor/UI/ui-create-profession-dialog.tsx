import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {closeCreateProfessionDialog, setNewProfessionName} from "../Store/professions-slice";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {createProfession, loadProfessions} from "../Store/async-actions";


interface IUICreateProfessionDialogProps extends BoxProps {

}


export default function UICreateProfessionDialog({...props}: IUICreateProfessionDialogProps) {
    const dispatch = useAppDispatch()
    const is_open_create_profession_dialog = useAppSelector((state) => state.professionsEditor.is_open_create_profession_dialog)
    const new_profession_name = useAppSelector((state) => state.professionsEditor.new_profession_name)


    const handleClose = () => {
        dispatch(closeCreateProfessionDialog())
    }
    const handleCreateProfession = async () => {
        dispatch(createProfession({name: new_profession_name}))
            .then(() => {
                dispatch(loadProfessions())
            })
    }
    const handleChangeProfessionName = (event: { target: { value: string; }; }) => {
        dispatch(setNewProfessionName(event.target.value))
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_create_profession_dialog} onClose={handleClose} fullWidth maxWidth={"xs"}>
                <DialogTitle>Создание должности</DialogTitle>
                <DialogContent>
                    <TextField
                        value={new_profession_name}
                        onChange={handleChangeProfessionName}
                        autoFocus
                        margin="dense"
                        id="profession-name"
                        label="Название должности"
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