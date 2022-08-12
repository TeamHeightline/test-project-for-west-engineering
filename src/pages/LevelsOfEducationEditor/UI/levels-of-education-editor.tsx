import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {useEffect} from "react";
import {loadLevels} from "../Store/async-actions";
import UILevelsOfEducationTable from "./ui-tabls";
import UiCreateEducationLevelDialog from "./ui-create-education-level-dialog";
import UIDeleteLevelOfEducationDialog from "./ui-delete-level-of-education-dialog";

interface ILevelOfEducationEditorProps extends BoxProps {
    onSelectEducationLevel?: (level_id: number) => void;

}


export default function LevelOfEducationEditor({onSelectEducationLevel, ...props}: ILevelOfEducationEditorProps) {
    const dispatch = useAppDispatch()
    const selected_level_id = useAppSelector(state => state.levelsOfEducationEditor.selected_level_id)

    useEffect(() => {
        dispatch(loadLevels())
    }, []);

    useEffect(() => {
        if (!!onSelectEducationLevel && !!selected_level_id) {
            onSelectEducationLevel(selected_level_id)
        }
    }, [selected_level_id])

    return (
        <Box {...props}>
            <Stack alignItems={"center"}>
                <UILevelsOfEducationTable/>
                <UiCreateEducationLevelDialog/>
                <UIDeleteLevelOfEducationDialog/>
            </Stack>
        </Box>
    )
}