import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {
    closeCreateWorkerDialog,
    setCreateWorkerName,
    setCreateWorkerLevelOfEducation,
    setCreateWorkerProfession,
    openProfessionsEditorWithSelector,
    closeProfessionsEditorWithSelector,
    openLevelsOfEducationEditorWithSelector, closeLevelsOfEducationEditorWithSelector
} from "../Store/workers-editor-slice";
import {createWorker, loadWorkers} from "../Store/async-actions";
import EditIcon from "@mui/icons-material/Edit";
import ProfessionsEditorWithSelector
    from "../../../shared/ProfessionsEditorWithSelector/professions-editor-with-selector";
import EducationEditorWithSelector
    from "../../../shared/EducationLevelsEditorWithSelector/education-editor-with-selector";

interface IUICreateWorkerDialogProps extends BoxProps {

}


export default function UICreateWorkerDialog({...props}: IUICreateWorkerDialogProps) {
    const dispatch = useAppDispatch()
    const is_open_create_worker_dialog = useAppSelector(state => state.workersEditor.is_open_create_worker_dialog)
    const worker_for_create = useAppSelector(state => state.workersEditor.worker_for_create)

    const professions = useAppSelector(state => state.workersEditor.professions)
    const levelsOfEducation = useAppSelector(state => state.workersEditor.levelsOfEducation)

    const is_open_professions_editor_with_selector = useAppSelector(state => state.workersEditor.is_open_professions_editor_with_selector)
    const is_open_levels_of_education_editor_with_selector = useAppSelector(state => state.workersEditor.is_open_levels_of_education_editor_with_selector)


    const handleClose = () => {
        dispatch(closeCreateWorkerDialog())
    }

    const handleWorkerNameChange = (event: { target: { value: string; }; }) => {
        dispatch(setCreateWorkerName(event.target.value))
    }

    const handleProfessionChange = (event: { target: { value: string; }; }) => {
        dispatch(setCreateWorkerProfession(Number(event.target.value)))
    }

    const handleLevelOfEducationChange = (event: { target: { value: string; }; }) => {
        dispatch(setCreateWorkerLevelOfEducation(Number(event.target.value)))
    }


    const handleClearWorkerProfession = () => {
        dispatch(setCreateWorkerProfession(null))
    }

    const handleClearWorkerLevelOfEducation = () => {
        dispatch(setCreateWorkerLevelOfEducation(null))
    }

    const handleOpenProfessionsEditorWithSelectDialog = () => {
        dispatch(openProfessionsEditorWithSelector())
    }

    const handleCloseProfessionsEditorWithSelectDialog = () => {
        dispatch(closeProfessionsEditorWithSelector())
    }
    const handleProfessionChangeFromCreateAndSelectDialog = (profession_id: number) => {
        dispatch(setCreateWorkerProfession(profession_id))
    }

    const handleLevelOfEducationChangeFromCreateAndSelectDialog = (level_of_education_id: number) => {
        dispatch(setCreateWorkerLevelOfEducation(level_of_education_id))
    }
    const handleOpenLevelsOfEducationEditorWithSelectDialog = () => {
        dispatch(openLevelsOfEducationEditorWithSelector())
    }
    const handleCloseLevelsOfEducationEditorWithSelectDialog = () => {
        dispatch(closeLevelsOfEducationEditorWithSelector())
    }

    const handleSave = () => {
        if (worker_for_create) {
            dispatch(createWorker(worker_for_create))
                .then(() => {
                    dispatch(loadWorkers())
                })
        }
    }

    return (
        <Box {...props}>
            <Dialog open={is_open_create_worker_dialog} onClose={handleClose}
                    fullWidth maxWidth={"xs"}>
                <DialogTitle>Добавление сотрудника</DialogTitle>

                <DialogContent>

                    <Stack direction={"column"} spacing={2}>
                        <TextField
                            onChange={handleWorkerNameChange}
                            value={worker_for_create?.name || ""}
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
                                    value={String(worker_for_create?.profession_id) || "0"}
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
                                    value={String(worker_for_create?.level_of_education_id) || "0"}
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
                    <Button onClick={handleSave} color={"success"} startIcon={<DoneIcon/>}
                            variant={"contained"} disabled={!worker_for_create?.name}>Создать</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}