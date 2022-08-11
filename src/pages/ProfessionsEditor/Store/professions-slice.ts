import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createProfession, deleteProfession, loadProfessions} from "./async-actions";

export interface IProfession {
    "id": number,
    "name": string,
    "created_at": string,
    "updated_at": string
}

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        professions: [] as IProfession[],
        is_professions_pending: false,
        is_load_professions_error: false,

        is_open_create_profession_dialog: false,
        new_profession_name: "",

        is_open_delete_profession_dialog: false,
        selected_profession_id: null as number | null,

    },
    reducers: {
        openCreateProfessionDialog(state) {
            state.is_open_create_profession_dialog = true;
        },
        closeCreateProfessionDialog(state) {
            state.is_open_create_profession_dialog = false;
            state.new_profession_name = "";
        },
        setNewProfessionName(state, action: PayloadAction<string>) {
            state.new_profession_name = action.payload;
        },
        setSelectedProfessionId(state, action: PayloadAction<number | null>) {
            state.selected_profession_id = action.payload;
        },
        openDeleteProfessionDialog(state) {
            state.is_open_delete_profession_dialog = true;
        },
        closeDeleteProfessionDialog(state) {
            state.is_open_delete_profession_dialog = false;
        }
    },
    extraReducers: {
        [loadProfessions.fulfilled.type]: (state, action) => {
            state.professions = action.payload;
            state.is_professions_pending = false;
        },
        [loadProfessions.pending.type]: (state, action) => {
            state.is_professions_pending = true;
        },
        [loadProfessions.rejected.type]: (state, action) => {
            state.is_load_professions_error = true;
        },
        [createProfession.fulfilled.type]: (state, action) => {
            state.is_open_create_profession_dialog = false;
        },
        [deleteProfession.fulfilled.type]: (state, action) => {
            state.is_open_delete_profession_dialog = false;
        }


    }
})

export default professionsSlice.reducer;

export const {
    openCreateProfessionDialog,
    closeCreateProfessionDialog,
    setNewProfessionName,
    setSelectedProfessionId,
    openDeleteProfessionDialog,
    closeDeleteProfessionDialog,
} = professionsSlice.actions;