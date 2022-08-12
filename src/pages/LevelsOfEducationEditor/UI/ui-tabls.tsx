import {Box, Button, Stack} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {DataGrid, GridColumns} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {updateLevel} from "../Store/async-actions";
import {
    openCreateLevelsDialog,
    openDeleteLevelsDialog,
    setSelectedLevelsId
} from "../Store/levels-of-education-editor-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface IUILevelsOfEducationTableProps extends BoxProps {

}

const columns: GridColumns = [
    {field: 'id', headerName: 'ID', width: 100, editable: false},
    {field: 'name', headerName: 'Уровень образования', width: 400, type: 'string', editable: true},
];

export default function UILevelsOfEducationTable({...props}: IUILevelsOfEducationTableProps) {
    const dispatch = useAppDispatch()
    const levels = useAppSelector((state) => state.levelsOfEducationEditor.levels)
    const selected_level_id = useAppSelector((state) => state.levelsOfEducationEditor.selected_level_id)

    const handleCreateProfession = () => {
        dispatch(openCreateLevelsDialog())
    }

    const handleDeleteProfession = () => {
        dispatch(openDeleteLevelsDialog())
    }

    return (
        <Box {...props}>
            <Stack alignItems={"end"} sx={{mt: 2}}>
                <Stack direction={"row"} spacing={1}>
                    <Button color={"error"} startIcon={<DeleteIcon/>}
                            disabled={!selected_level_id}
                            onClick={handleDeleteProfession}>
                        Удалить уровень обра...
                    </Button>
                    <Button color={"success"} variant={"outlined"} startIcon={<AddIcon/>}
                            onClick={handleCreateProfession}>
                        Добавить уровень обра...
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{height: 400, width: 550, mt: 1}}>
                <DataGrid
                    rows={levels}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    experimentalFeatures={{newEditingApi: true}}
                    processRowUpdate={async (newRow) => {
                        return dispatch(updateLevel({id: newRow.id, name: newRow.name})).unwrap()
                    }}
                    onSelectionModelChange={(newSelectionModel) => {
                        dispatch(setSelectedLevelsId(Number(newSelectionModel[0]) || null))
                    }}

                />
            </Box>

        </Box>
    )
}