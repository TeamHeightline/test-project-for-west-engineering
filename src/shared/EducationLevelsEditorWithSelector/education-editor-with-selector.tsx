import {Box, Button, Dialog, DialogActions} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import LevelOfEducationEditor from "../../pages/LevelsOfEducationEditor/UI/levels-of-education-editor";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

interface IEducationEditorWithSelectorProps extends BoxProps {
    open: boolean;
    onClose: () => void;
    onSelectEducationLevel: (level_id: number) => void;
}


export default function EducationEditorWithSelector({
                                                        open,
                                                        onClose,
                                                        onSelectEducationLevel,
                                                        ...props
                                                    }: IEducationEditorWithSelectorProps) {
    const [selectedLevel, setSelectedLevel] = useState(null as number | null)
    const handleSelectEducationLevel = (level_id: number) => {
        setSelectedLevel(level_id)
    }
    const handleFinallySelectEducationLevel = () => {
        if (selectedLevel && onSelectEducationLevel && onClose) {
            onSelectEducationLevel(selectedLevel)
            onClose()
        }
    }

    return (
        <Box {...props}>
            <Dialog open={open} onClose={onClose}>
                <LevelOfEducationEditor onSelectEducationLevel={handleSelectEducationLevel}/>
                <DialogActions>
                    <Button onClick={onClose} color={"error"} startIcon={<CloseIcon/>}>Закрыть</Button>
                    <Button color={"info"} startIcon={<DoneIcon/>} onClick={handleFinallySelectEducationLevel}
                            variant={"contained"}>Выбрать</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}