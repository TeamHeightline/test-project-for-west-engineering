import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../../AxiosClient";

export const loadLevels = createAsyncThunk('levels-of-education/loadLevels', async () => {
    return axiosClient.get("/levels-of-education/all").then((res) => res.data)
})

export const createLevel = createAsyncThunk('levels-of-education/createLevel', async (data: { name: string }) => {
    return axiosClient.post("/levels-of-education/create", data)
        .then((res) => {
            return res.data
        })
})

export const deleteLevel = createAsyncThunk('levels-of-education/deleteLevel', async (id: number) => {
    return axiosClient.post("/levels-of-education/delete", {id})
        .then((res) => {
            return res.data
        })
})

export const updateLevel = createAsyncThunk('levels-of-education/updateLevel', async (data: { id: number, name: string }) => {
    return axiosClient.post("/levels-of-education/update", data)
        .then((res) => {
            return res.data
        })
})