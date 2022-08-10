import {configureStore} from '@reduxjs/toolkit'
import professionsSlice from "./pages/ProfessionsEditor/Store/professions-slice";

export const store = configureStore({
    reducer: {
        professions: professionsSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch