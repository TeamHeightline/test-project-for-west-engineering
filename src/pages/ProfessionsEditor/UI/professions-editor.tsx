import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useEffect} from "react";
import {loadProfessions} from "../Store/async-actions";
import {useAppDispatch} from "../../../RootStore";
import UIProfessionsTable from "./ui-table";
import UICreateProfessionDialog from "./ui-create-profession-dialog";
import UIDeleteProfessionDialog from "./ui-delete-profession-dialog";

interface IProfessionsEditorProps extends BoxProps {
    isUsePageAsSelector?: boolean;
    onProfessionsUpdated?: () => void;

}


export default function ProfessionsEditor({
                                              isUsePageAsSelector = false,
                                              onProfessionsUpdated,
                                              ...props
                                          }: IProfessionsEditorProps) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadProfessions())
    }, []);

    return (
        <Box {...props}>
            <Stack alignItems={"center"}>
                <UIProfessionsTable/>
                <UICreateProfessionDialog/>
                <UIDeleteProfessionDialog/>
            </Stack>
        </Box>
    )
}