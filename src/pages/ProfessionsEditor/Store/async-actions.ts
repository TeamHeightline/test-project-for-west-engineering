import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../../AxiosClient";

export const loadProfessions = createAsyncThunk('professions/loadProfessions', async () => {
    return axiosClient.get("/professions/all").then((res) => res.data)
})
