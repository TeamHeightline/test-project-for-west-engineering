import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProfessionsEditor from "./pages/ProfessionsEditor/UI/professions-editor";
import AppNavbar from "./shared/Navbar/navbar";
import {Box} from "@mui/material";
import LevelOfEducationEditor from "./pages/LevelsOfEducationEditor/UI/levels-of-education-editor";


function App() {
    return (
        <div>
            <AppNavbar/>
            <Box sx={{mt: 6}}>
                <Routes>
                    <Route path={"professions"} element={<ProfessionsEditor/>}/>
                    <Route path={'levels-of-education'} element={<LevelOfEducationEditor/>}/>
                </Routes>
            </Box>
        </div>
    );
}

export default App;
