import React, {useEffect} from 'react';
import './App.css';
import {useAppReducer} from "./components/state/store";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./components/app/app-reducer";
import {Login} from "./features/Login/Login";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"
import TodoListsContainer from "./features/Todolist/TodoListsContainer";
import Page404 from "./features/Login/Page404";
import {useDispatch} from "react-redux";
import {initializeAppTC, InitialStateType, logoutTC} from "./features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";

function App() {

    const dispatch = useDispatch()
    const status = useAppReducer<RequestStatusType>(state => state.app.status)
    const {isInitialized, isLoggedIn} = useAppReducer<InitialStateType>(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    const loginLogoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="Active Todo List"
                        sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography
                        onClick={() => navigate("/")}
                        style={{cursor: "pointer"}}
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}>
                        You Todo List
                    </Typography>
                    {isLoggedIn && <Button
                        onClick={loginLogoutHandler}
                        color="inherit">
                        Logout
                    </Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<TodoListsContainer/>}/>
                    <Route path="/404" element={<Page404/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
