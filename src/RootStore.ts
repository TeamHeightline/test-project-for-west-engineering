import {configureStore} from '@reduxjs/toolkit'
import professionsSlice from "./pages/ProfessionsEditor/Store/professions-slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import levelsOfEducationEditorSlice from "./pages/LevelsOfEducationEditor/Store/levels-of-education-editor-slice";
import workersEditorSlice from "./pages/WorkersEditor/Store/workers-editor-slice";

export const store = configureStore({
    reducer: {
        professionsEditor: professionsSlice,
        levelsOfEducationEditor: levelsOfEducationEditorSlice,
        workersEditor: workersEditorSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

