import {Box} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useAppDispatch, useAppSelector} from "../../../RootStore";
import {DataGrid, GridColumns} from "@mui/x-data-grid";
import {IWorkersWithNames, openEditWorkerDialog, setSelectedWorker} from "../Store/workers-editor-slice";
import UIActionButtons from "./ui-action-buttons";

interface IUIWorkerTableProps extends BoxProps {

}


const columns: GridColumns = [
    {field: 'id', headerName: 'ID', width: 100, editable: false},
    {field: 'name', headerName: 'ФИО', width: 200, type: 'string', editable: false},
    {field: 'profession_name', headerName: 'Должность', width: 200, type: 'string', editable: false},
    {field: 'education_name', headerName: 'Образование', width: 200, type: 'string', editable: false},
];

export default function UIWorkerTable({...props}: IUIWorkerTableProps) {
    const dispatch = useAppDispatch()


    const workers = useAppSelector(state => state.workersEditor.workers)

    const doubleClickHandler = (event: { row: IWorkersWithNames; }) => {
        if (event?.row?.id) {
            dispatch(setSelectedWorker(event.row))
            dispatch(openEditWorkerDialog())
        }
    }

    const clickHandler = (event: { row: IWorkersWithNames; }) => {
        if (event?.row?.id) {
            dispatch(setSelectedWorker(event.row))
        }
    }


    return (
        <Box {...props}>
            <UIActionButtons/>
            <Box sx={{height: 450, width: 800, mt: 1}}>
                <DataGrid
                    rows={workers}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    experimentalFeatures={{newEditingApi: true}}
                    onRowDoubleClick={doubleClickHandler}
                    onRowClick={clickHandler}
                />
            </Box>
        </Box>
    )
}