import {Box,} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {DataGrid, GridColumns} from '@mui/x-data-grid';

import {useSelector} from "react-redux";
import {RootState} from "../../../RootStore";


const columns: GridColumns = [
    {field: 'id', headerName: 'ID', width: 30, editable: false},
    {field: 'name', headerName: 'Должность', width: 400, type: 'string', editable: true},
];


export default function UIProfessionsTable() {
    const professions = useSelector((state: RootState) => state.professionsEditor.professions)
    return (
        <Box>
            <Box sx={{height: 400, width: 480}}>
                <DataGrid
                    rows={professions}
                    columns={columns}
                    // experimentalFeatures={{newEditingApi: true}}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    onCellEditStop={(props) => {
                        console.log(props)
                    }}

                />
            </Box>
        </Box>
    )
}