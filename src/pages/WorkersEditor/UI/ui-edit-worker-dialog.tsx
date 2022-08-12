import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack,
    TextField
} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {
    closeEditWorkerDialog, closeProfessionsEditorWithSelector, openProfessionsEditorWithSelector,
    selSelectedWorkerName,
    setSelectedWorkerLevelOfEducation,
    setSelectedWorkerProfession,
    openLevelsOfEducationEditorWithSelector,
    closeLevelsOfEducationEditorWithSelector

} from "../Store/workers-editor-slice";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {loadWorkers, updateWorker} from "../Store/async-actions";
import ProfessionsEditorWithSelector
    from "../../../shared/ProfessionsEditorWithSelector/professions-editor-with-selector";
import EducationEditorWithSelector
    from "../../../shared/EducationLevelsEditorWithSelector/education-editor-with-selector";


interface IUIEditWorkerDialogProps extends BoxProps {

}


export default function UIEditWorkerDialog({...props}: IUIEditWorkerDialogProps) {
    const dispatch = useAppDispatch()

    const is_open_edit_worker_dialog = useAppSelector(state => state.workersEditor.is_open_edit_worker_dialog)
    const selected_worker = useAppSelector(state => state.workersEditor.selected_worker)

    const professions = useAppSelector(state => state.workersEditor.professions)
    const levelsOfEducation = useAppSelector(state => state.workersEditor.levelsOfEducation)

    const is_open_professions_editor_with_selector = useAppSelector(state => state.workersEditor.is_open_professions_editor_with_selector)
    const is_open_levels_of_education_editor_with_selector = useAppSelector(state => state.workersEditor.is_open_levels_of_education_editor_with_selector)


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

    const handleClearWorkerProfession = () => {
        dispatch(setSelectedWorkerProfession(null))
    }

    const handleClearWorkerLevelOfEducation = () => {
        dispatch(setSelectedWorkerLevelOfEducation(null))
    }

    const handleOpenProfessionsEditorWithSelectDialog = () => {
        dispatch(openProfessionsEditorWithSelector())
    }

    const handleCloseProfessionsEditorWithSelectDialog = () => {
        dispatch(closeProfessionsEditorWithSelector())
    }
    const handleProfessionChangeFromCreateAndSelectDialog = (profession_id: number) => {
        dispatch(setSelectedWorkerProfession(profession_id))
    }

    const handleLevelOfEducationChangeFromCreateAndSelectDialog = (level_of_education_id: number) => {
        dispatch(setSelectedWorkerLevelOfEducation(level_of_education_id))
    }
    const handleOpenLevelsOfEducationEditorWithSelectDialog = () => {
        dispatch(openLevelsOfEducationEditorWithSelector())
    }
    const handleCloseLevelsOfEducationEditorWithSelectDialog = () => {
        dispatch(closeLevelsOfEducationEditorWithSelector())
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


                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
                            <Stack direction={"row"}>
                                <IconButton onClick={handleClearWorkerProfession}>
                                    <CloseIcon/>
                                </IconButton>
                                <IconButton onClick={handleOpenProfessionsEditorWithSelectDialog}>
                                    <EditIcon/>
                                </IconButton>
                            </Stack>
                            <ProfessionsEditorWithSelector open={is_open_professions_editor_with_selector}
                                                           onClose={handleCloseProfessionsEditorWithSelectDialog}
                                                           onSelectProfession={handleProfessionChangeFromCreateAndSelectDialog}/>

                        </Stack>

                        <Stack direction={"row"} alignItems={"center"} spacing={2}>

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
                            <Stack direction={"row"}>
                                <IconButton onClick={handleClearWorkerLevelOfEducation}>
                                    <CloseIcon/>
                                </IconButton>
                                <IconButton onClick={handleOpenLevelsOfEducationEditorWithSelectDialog}>
                                    <EditIcon/>
                                </IconButton>
                            </Stack>
                            <EducationEditorWithSelector open={is_open_levels_of_education_editor_with_selector}
                                                         onClose={handleCloseLevelsOfEducationEditorWithSelectDialog}
                                                         onSelectEducationLevel={handleLevelOfEducationChangeFromCreateAndSelectDialog}/>
                        </Stack>
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