import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch} from "../../../RootStore";
import {useEffect} from "react";
import {loadLevels} from "../Store/async-actions";
import UILevelsOfEducationTable from "./ui-tabls";
import UiCreateEducationLevelDialog from "./ui-create-education-level-dialog";
import UIDeleteLevelOfEducationDialog from "./ui-delete-level-of-education-dialog";

interface ILevelOfEducationEditorProps extends BoxProps {

}


export default function LevelOfEducationEditor({...props}: ILevelOfEducationEditorProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadLevels())
    }, []);
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