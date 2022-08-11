import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createLevel, deleteLevel, loadLevels} from "./async-actions";

export interface ILevelsOfEducation {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string
}

const levelsOfEducationEditorSlice = createSlice({
    name: 'levelsOfEducation',
    initialState: {
        levels: [] as ILevelsOfEducation[],
        is_levels_pending: false,
        is_load_levels_error: false,

        is_open_create_levels_dialog: false,
        new_level_name: "",

        is_open_delete_level_dialog: false,
        selected_level_id: null as number | null,

    },
    reducers: {
        openCreateLevelsDialog(state) {
            state.is_open_create_levels_dialog = true;
        },
        closeCreateLevelsDialog(state) {
            state.is_open_create_levels_dialog = false;
            state.new_level_name = "";
        },
        setNewLevelsName(state, action: PayloadAction<string>) {
            state.new_level_name = action.payload;
        },
        setSelectedLevelsId(state, action: PayloadAction<number | null>) {
            state.selected_level_id = action.payload;
        },
        openDeleteLevelsDialog(state) {
            state.is_open_delete_level_dialog = true;
        },
        closeDeleteLevelsDialog(state) {
            state.is_open_delete_level_dialog = false;
        }
    },
    extraReducers: {
        [loadLevels.fulfilled.type]: (state, action) => {
            state.levels = action.payload;
            state.is_levels_pending = false;
        },
        [loadLevels.pending.type]: (state, action) => {
            state.is_levels_pending = true;
        },
        [loadLevels.rejected.type]: (state, action) => {
            state.is_load_levels_error = true;
        },
        [createLevel.fulfilled.type]: (state, action) => {
            state.is_open_create_levels_dialog = false;
        },
        [deleteLevel.fulfilled.type]: (state, action) => {
            state.is_open_delete_level_dialog = false;
        }


    }
})

export const {
    openCreateLevelsDialog,
    closeCreateLevelsDialog,
    setNewLevelsName,
    setSelectedLevelsId,
    openDeleteLevelsDialog,
    closeDeleteLevelsDialog,
} = levelsOfEducationEditorSlice.actions;

export default levelsOfEducationEditorSlice.reducer;