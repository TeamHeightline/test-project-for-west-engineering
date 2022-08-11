import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useEffect} from "react";
import {useAppDispatch} from "../../../RootStore";
import {loadWorkers} from "../Store/async-actions";
import UIWorkerTable from "./ui-worker-table";

interface IUIWorkerEditorProps extends BoxProps {

}


export default function UIWorkerEditor({...props}: IUIWorkerEditorProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadWorkers())
    }, [])
    return (
        <Box {...props}>
            <Stack alignItems={"center"}>
                <UIWorkerTable/>
            </Stack>
        </Box>
    )
}