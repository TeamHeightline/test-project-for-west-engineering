import {configureStore} from '@reduxjs/toolkit'
import professionsSlice from "./pages/ProfessionsEditor/Store/professions-slice";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        professionsEditor: professionsSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
