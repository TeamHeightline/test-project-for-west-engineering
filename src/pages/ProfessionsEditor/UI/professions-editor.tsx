import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useEffect} from "react";
import {loadProfessions} from "../Store/async-actions";
import {useAppDispatch} from "../../../RootStore";
import UIProfessionsTable from "./ui-table";

interface IProfessionsEditorProps extends BoxProps {

}


export default function ProfessionsEditor({...props}: IProfessionsEditorProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadProfessions())
    }, []);

    return (
        <Box {...props}>
            <Stack alignItems={"center"}>
                <UIProfessionsTable/>
            </Stack>
        </Box>
    )
}