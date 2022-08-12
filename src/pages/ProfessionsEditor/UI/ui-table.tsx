import {Box, Button, Stack,} from "@mui/material";
import {DataGrid, GridColumns} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    openCreateProfessionDialog,
    openDeleteProfessionDialog,
    setSelectedProfessionId
} from "../Store/professions-slice";
import {updateProfession} from "../Store/async-actions";

const columns: GridColumns = [
    {field: 'id', headerName: 'ID', width: 100, editable: false},
    {field: 'name', headerName: 'Должность', width: 400, type: 'string', editable: true},
];

export default function UIProfessionsTable() {
    const dispatch = useAppDispatch()
    const professions = useAppSelector((state) => state.professionsEditor.professions)
    const selected_profession_id = useAppSelector((state) => state.professionsEditor.selected_profession_id)


    const handleCreateProfession = () => {
        dispatch(openCreateProfessionDialog())
    }

    const handleDeleteProfession = () => {
        dispatch(openDeleteProfessionDialog())
    }

    return (
        <Box>
            <Stack alignItems={"end"} sx={{mt: 2}}>
                <Stack direction={"row"} spacing={1}>
                    <Button color={"error"} startIcon={<DeleteIcon/>}
                            disabled={!selected_profession_id}
                            onClick={handleDeleteProfession}>
                        Удалить должность
                    </Button>
                    <Button color={"success"} variant={"outlined"} startIcon={<AddIcon/>}
                            onClick={handleCreateProfession}>
                        Добавить должность
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{height: 400, width: 550, mt: 1}}>
                <DataGrid
                    rows={professions}
                    columns={columns}

                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    experimentalFeatures={{newEditingApi: true}}
                    processRowUpdate={async (newRow) => {
                        return dispatch(updateProfession({id: newRow.id, name: newRow.name})).unwrap()
                    }}
                    onSelectionModelChange={(newSelectionModel) => {
                        dispatch(setSelectedProfessionId(Number(newSelectionModel[0]) || null))
                    }}

                />
            </Box>
        </Box>
    )
}