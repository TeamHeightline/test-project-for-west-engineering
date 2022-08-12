import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../../AxiosClient";

export const loadWorkers = createAsyncThunk('workers-editor/loadWorkers', async () => {
    return axiosClient.get("/workers/all").then((res) => res.data)
})

export const updateWorker = createAsyncThunk('workers-editor/updateWorker',
    async (data: { id: number, name: string, level_of_education_id: number, profession_id: number }) => {
        return axiosClient.post("/workers/update", data)
            .then((res) => {
                return res.data
            })
    })


export const createWorker = createAsyncThunk('workers-editor/createWorker', async (data: { name: string, level_of_education_id: number | null, profession_id: number | null }) => {
    return axiosClient.post("/workers/create", data)
        .then((res) => {
            return res.data
        })
})

export const deleteWorker = createAsyncThunk('workers-editor/deleteWorker', async (data: { id: number }) => {
    return axiosClient.post("/workers/delete", data)
        .then((res) => {
            return res.data
        })
})