import {Box, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useEffect} from "react";
import {loadProfessions} from "../Store/async-actions";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import UIProfessionsTable from "./ui-table";
import UICreateProfessionDialog from "./ui-create-profession-dialog";
import UIDeleteProfessionDialog from "./ui-delete-profession-dialog";

interface IProfessionsEditorProps extends BoxProps {
    onSelectProfession?: (profession_id: number) => void;

}


export default function ProfessionsEditor({
                                              onSelectProfession,
                                              ...props
                                          }: IProfessionsEditorProps) {
    const dispatch = useAppDispatch()

    const selected_profession_id = useAppSelector(state => state.professionsEditor.selected_profession_id)

    useEffect(() => {
        dispatch(loadProfessions())
    }, []);

    useEffect(() => {
        if (!!onSelectProfession && !!selected_profession_id) {
            onSelectProfession(selected_profession_id)
        }
    }, [selected_profession_id])

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