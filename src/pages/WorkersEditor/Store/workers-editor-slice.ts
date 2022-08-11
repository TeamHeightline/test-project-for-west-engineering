import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfession} from "../../ProfessionsEditor/Store/professions-slice";
import {ILevelsOfEducation} from "../../LevelsOfEducationEditor/Store/levels-of-education-editor-slice";
import {loadWorkers} from "./async-actions";

export interface IWorkers {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string,
    "education": ILevelsOfEducation,
    "prfession": IProfession
}

export interface IWorkersWithNames {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string,
    "education_name"?: string,
    "profession_name"?: string
}

const workersEditorSlice = createSlice({
    name: 'workers-editor',
    initialState: {
        workers: [] as IWorkersWithNames[],
        is_workers_pending: false,
        is_load_workers_error: false,
    },
    reducers: {},
    extraReducers: {
        [loadWorkers.fulfilled.type]: (state, action: PayloadAction<IWorkers[]>) => {
            state.workers = action.payload.map((worker) => {
                return {...worker, education_name: worker.education.name, profession_name: worker.prfession.name}
            })
            state.is_workers_pending = false;
        },
        [loadWorkers.pending.type]: (state, action) => {
            state.is_workers_pending = true;
        },
        [loadWorkers.rejected.type]: (state, action) => {
            state.is_load_workers_error = true;
        }
    }
})


export default workersEditorSlice.reducer;