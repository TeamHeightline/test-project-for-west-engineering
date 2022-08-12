import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfession} from "../../ProfessionsEditor/Store/professions-slice";
import {ILevelsOfEducation} from "../../LevelsOfEducationEditor/Store/levels-of-education-editor-slice";
import {loadWorkers, updateWorker} from "./async-actions";
import {loadProfessions} from "../../ProfessionsEditor/Store/async-actions";
import {loadLevels} from "../../LevelsOfEducationEditor/Store/async-actions";

export interface IWorkers {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string,
    "education": ILevelsOfEducation,
    "prfession": IProfession,
    profession_id: number,
    level_of_education_id: number
}

export interface IWorkersWithNames extends IWorkers {
    "education_name"?: string,
    "profession_name"?: string
}

const workersEditorSlice = createSlice({
    name: 'workers-editor',
    initialState: {
        workers: [] as IWorkersWithNames[],
        is_workers_pending: false,
        is_load_workers_error: false,

        professions: [] as IProfession[],
        is_professions_pending: false,

        levelsOfEducation: [] as ILevelsOfEducation[],
        is_levels_of_education_pending: false,

        selected_worker: null as IWorkersWithNames | null,
        is_open_edit_worker_dialog: false,

    },
    reducers: {
        openEditWorkerDialog: (state) => {
            state.is_open_edit_worker_dialog = true;
        },
        closeEditWorkerDialog: (state) => {
            state.is_open_edit_worker_dialog = false;
        },

        setSelectedWorker: (state, action: PayloadAction<IWorkersWithNames | null>) => {
            state.selected_worker = action.payload;
        },
        selSelectedWorkerName: (state, action: PayloadAction<string>) => {
            if (state.selected_worker) {
                state.selected_worker.name = action.payload;
            }
        },
        setSelectedWorkerProfession: (state, action: PayloadAction<number>) => {
            if (state.selected_worker) {
                state.selected_worker.profession_id = action.payload;
            }
        },
        setSelectedWorkerLevelOfEducation: (state, action: PayloadAction<number>) => {
            if (state.selected_worker) {
                state.selected_worker.level_of_education_id = action.payload;
            }
        }

    },
    extraReducers: {
        [loadWorkers.fulfilled.type]: (state, action: PayloadAction<IWorkers[]>) => {
            state.workers = action.payload.map((worker) => {
                return {...worker, education_name: worker.education.name, profession_name: worker.prfession.name}
            })
            state.is_workers_pending = false;
        },
        [loadWorkers.pending.type]: (state) => {
            state.is_workers_pending = true;
        },
        [loadWorkers.rejected.type]: (state) => {
            state.is_load_workers_error = true;
        },

        [loadProfessions.fulfilled.type]: (state, action: PayloadAction<IProfession[]>) => {
            state.professions = action.payload;
        },
        [loadProfessions.pending.type]: (state) => {
            state.is_professions_pending = true;
        },

        [loadLevels.fulfilled.type]: (state, action: PayloadAction<ILevelsOfEducation[]>) => {
            state.levelsOfEducation = action.payload;
            state.is_levels_of_education_pending = false;
        },
        [loadLevels.pending.type]: (state) => {
            state.is_levels_of_education_pending = true;
        },

        [updateWorker.fulfilled.type]: (state) => {
            state.is_open_edit_worker_dialog = false;
        }

    }
})


export default workersEditorSlice.reducer;

export const {
    setSelectedWorker,
    openEditWorkerDialog,
    closeEditWorkerDialog,
    selSelectedWorkerName,
    setSelectedWorkerProfession,
    setSelectedWorkerLevelOfEducation
} = workersEditorSlice.actions;