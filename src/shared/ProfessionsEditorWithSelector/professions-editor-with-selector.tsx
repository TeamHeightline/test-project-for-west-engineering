import {Box, Button, Dialog, DialogActions} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import ProfessionsEditor from "../../pages/ProfessionsEditor/UI/professions-editor";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {useState} from "react";

interface IProfessionsEditorWithSelectorProps extends BoxProps {
    open: boolean;
    onClose: () => void;
    onSelectProfession: (profession: number) => void;

}


export default function ProfessionsEditorWithSelector({
                                                          open,
                                                          onClose,
                                                          onSelectProfession,
                                                          ...props
                                                      }: IProfessionsEditorWithSelectorProps) {
    const [selectedProfession, setSelectedProfession] = useState(null as number | null)
    const handleSelectProfession = (profession: number) => {
        setSelectedProfession(profession)
    }

    const handleFinallySelectProfession = () => {
        if (selectedProfession && onSelectProfession && onClose) {
            onSelectProfession(selectedProfession)
            onClose()
        }
    }

    return (
        <Box {...props}>
            <Dialog open={open} onClose={onClose}>
                <ProfessionsEditor onSelectProfession={handleSelectProfession}/>
                <DialogActions>
                    <Button onClick={onClose} color={"error"} startIcon={<CloseIcon/>}>Закрыть</Button>
                    <Button color={"info"} startIcon={<DoneIcon/>} onClick={handleFinallySelectProfession}
                            variant={"contained"}>Выбрать</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}