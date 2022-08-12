import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack,
    TextField
} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {
    closeEditWorkerDialog,
    selSelectedWorkerName,
    setSelectedWorkerLevelOfEducation,
    setSelectedWorkerProfession
} from "../Store/workers-editor-slice";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {loadWorkers, updateWorker} from "../Store/async-actions";


interface IUIEditWorkerDialogProps extends BoxProps {

}


export default function UIEditWorkerDialog({...props}: IUIEditWorkerDialogProps) {
    const dispatch = useAppDispatch()

    const is_open_edit_worker_dialog = useAppSelector(state => state.workersEditor.is_open_edit_worker_dialog)
    const selected_worker = useAppSelector(state => state.workersEditor.selected_worker)

    const professions = useAppSelector(state => state.workersEditor.professions)
    const levelsOfEducation = useAppSelector(state => state.workersEditor.levelsOfEducation)

    const handleClose = () => {
        dispatch(closeEditWorkerDialog())
    }

    const handleWorkerNameChange = (event: { target: { value: string; }; }) => {
        dispatch(selSelectedWorkerName(event.target.value))
    }

    const handleProfessionChange = (event: { target: { value: string; }; }) => {
        dispatch(setSelectedWorkerProfession(Number(event.target.value)))
    }

    const handleLevelOfEducationChange = (event: { target: { value: string; }; }) => {
        dispatch(setSelectedWorkerLevelOfEducation(Number(event.target.value)))
    }

    const handleSave = () => {
        if (selected_worker) {
            dispatch(updateWorker(selected_worker))
                .then(() => {
                    dispatch(loadWorkers())
                })
        }
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_edit_worker_dialog && !!selected_worker} onClose={handleClose}
                    fullWidth maxWidth={"xs"}>
                <DialogTitle>Редактирование сотрудника</DialogTitle>

                <DialogContent>
                    <Stack direction={"column"} spacing={2}>

                        <TextField
                            onChange={handleWorkerNameChange}
                            value={selected_worker?.name || ""}
                            autoFocus
                            margin="dense"
                            id="worker-name"
                            label="ФИО сотрудника"
                            fullWidth
                            variant="standard"
                        />

                        <FormControl fullWidth>
                            <InputLabel id="worker-profession">Должность</InputLabel>
                            <Select
                                labelId="worker-profession-select-label"
                                id="worker-profession-select"
                                value={String(selected_worker?.profession_id) || "0"}
                                label="Должность"
                                onChange={handleProfessionChange}
                            >
                                {professions.map(profession => (
                                    <MenuItem key={profession.id} value={profession.id}>{profession.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="worker-education-level">Образование</InputLabel>
                            <Select
                                labelId="worker-education-level-select-label"
                                id="worker-education-level-select"
                                value={String(selected_worker?.level_of_education_id) || "0"}
                                label="Образование"
                                onChange={handleLevelOfEducationChange}
                            >
                                {levelsOfEducation.map(profession => (
                                    <MenuItem key={profession.id} value={profession.id}>{profession.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color={"error"} startIcon={<CloseIcon/>}>Отмена</Button>
                    <Button onClick={handleSave} color={"info"} startIcon={<DoneIcon/>}
                            variant={"contained"}>Ок</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}