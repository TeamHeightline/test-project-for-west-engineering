import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProfessionsEditor from "./pages/ProfessionsEditor/UI/professions-editor";
import AppNavbar from "./shared/Navbar/navbar";
import {Box} from "@mui/material";


function App() {
    return (
        <div>
            <AppNavbar/>
            <Box sx={{mt: 6}}>
                <Routes>
                    <Route path={"professions"} element={<ProfessionsEditor/>}/>
                </Routes>
            </Box>
        </div>
    );
}

export default App;
