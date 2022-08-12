import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useEffect} from "react";
import {useAppDispatch} from "../../../RootStore";
import {loadWorkers} from "../Store/async-actions";
import UIWorkerTable from "./ui-worker-table";
import UIEditWorkerDialog from "./ui-edit-worker-dialog";
import {loadLevels} from "../../LevelsOfEducationEditor/Store/async-actions";
import {loadProfessions} from "../../ProfessionsEditor/Store/async-actions";

interface IUIWorkerEditorProps extends BoxProps {

}


export default function UIWorkerEditor({...props}: IUIWorkerEditorProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadWorkers())
        dispatch(loadLevels())
        dispatch(loadProfessions())
    }, [])
    return (
        <Box {...props}>
            <Stack alignItems={"center"}>
                <UIWorkerTable/>
                <UIEditWorkerDialog/>
            </Stack>
        </Box>
    )
}