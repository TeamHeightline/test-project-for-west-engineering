import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../../AxiosClient";

export const loadWorkers = createAsyncThunk('workers-editor/loadWorkers', async () => {
    return axiosClient.get("/workers/all").then((res) => res.data)
})