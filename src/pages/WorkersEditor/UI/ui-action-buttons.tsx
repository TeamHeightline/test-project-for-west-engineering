import {Box, Button, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {openCreateWorkerDialog, openDeleteWorkerDialog, openEditWorkerDialog} from "../Store/workers-editor-slice";


interface IUIActionButtonsProps extends BoxProps {

}


export default function UIActionButtons({...props}: IUIActionButtonsProps) {
    const dispatch = useAppDispatch()

    const selected_worker = useAppSelector(state => state.workersEditor.selected_worker)

    const handleStartEdit = () => {
        if (selected_worker) {
            dispatch(openEditWorkerDialog())
        }
    }

    const handleCreate = () => {
        dispatch(openCreateWorkerDialog())
    }

    const handleDelete = () => {
        dispatch(openDeleteWorkerDialog())
    }

    return (
        <Box {...props}>
            <Stack direction={"row"} spacing={2} justifyContent={"end"} sx={{mt: 2}}>
                <Button onClick={handleCreate} color={"success"} startIcon={<AddIcon/>} variant={"outlined"}>
                    Создать
                </Button>
                <Button disabled={!selected_worker} startIcon={<EditIcon/>} color={"info"} variant={"contained"}
                        onClick={handleStartEdit}>
                    Редактировать
                </Button>
                <Button disabled={!selected_worker} color={"error"} startIcon={<DeleteIcon/>} onClick={handleDelete}>
                    Удалить
                </Button>

            </Stack>

        </Box>
    )
}