import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../../AxiosClient";

export const loadProfessions = createAsyncThunk('professions/loadProfessions', async () => {
    return axiosClient.get("/professions/all").then((res) => res.data)
})

export const createProfession = createAsyncThunk('professions/createProfession', async (data: { name: string }) => {
    return axiosClient.post("/professions/create", data)
        .then((res) => {
            return res.data
        })
})

export const deleteProfession = createAsyncThunk('professions/deleteProfession', async (id: number) => {
    return axiosClient.post("/professions/delete", {id})
        .then((res) => {
            return res.data
        })
})

export const updateProfession = createAsyncThunk('professions/updateProfession', async (data: { id: number, name: string }) => {
    return axiosClient.post("/professions/update", data)
        .then((res) => {
            return res.data
        })
})