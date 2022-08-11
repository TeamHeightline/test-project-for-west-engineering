import {AppBar, Box, Button, Stack, Toolbar, Typography} from "@mui/material";
import {BoxProps} from "@mui/material/Box/Box";
import {useNavigate} from "react-router-dom";

interface IAppNavbarProps extends BoxProps {

}


export default function AppNavbar({...props}: IAppNavbarProps) {
    const navigate = useNavigate()
    return (
        <Box {...props}>
            <AppBar component="nav">
                <Toolbar variant="dense">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        west-e
                    </Typography>

                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button sx={{color: '#fff'}} onClick={() => navigate("/workers")}>
                            Сотрудники
                        </Button>
                        <Button sx={{color: '#fff'}} onClick={() => navigate("/professions")}>
                            Должности
                        </Button>
                        <Button sx={{color: '#fff'}} onClick={() => navigate("/levels-of-education")}>
                            Образование
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}