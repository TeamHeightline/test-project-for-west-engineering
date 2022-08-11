import {Box} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppSelector} from "../../../RootStore";
import {DataGrid, GridColumns} from "@mui/x-data-grid";

interface IUIWorkerTableProps extends BoxProps {

}


const columns: GridColumns = [
    {field: 'id', headerName: 'ID', width: 100, editable: false},
    {field: 'name', headerName: 'ФИО', width: 200, type: 'string', editable: false},
    {field: 'profession_name', headerName: 'Должность', width: 200, type: 'string', editable: false},
    {field: 'education_name', headerName: 'Образование', width: 200, type: 'string', editable: false},
];

export default function UIWorkerTable({...props}: IUIWorkerTableProps) {
    const workers = useAppSelector(state => state.workersEditor.workers)
    return (
        <Box {...props}>
            <Box sx={{height: 450, width: 800, mt: 1}}>
                <DataGrid
                    rows={workers}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    experimentalFeatures={{newEditingApi: true}}
                    // onSelectionModelChange={(newSelectionModel) => {
                    //     dispatch(setSelectedProfessionId(Number(newSelectionModel[0]) || null))
                    // }}

                />
            </Box>
        </Box>
    )
}