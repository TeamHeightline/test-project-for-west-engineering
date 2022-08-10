import {createSlice} from "@reduxjs/toolkit";

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        professions: [],
    },
    reducers: {}
})

export default professionsSlice.reducer;