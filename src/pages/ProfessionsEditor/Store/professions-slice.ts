import {createSlice} from "@reduxjs/toolkit";
import {loadProfessions} from "./async-actions";

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
    },
    reducers: {},
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

    }
})

export default professionsSlice.reducer;