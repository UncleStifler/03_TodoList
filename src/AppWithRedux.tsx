import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC, createTodoListTC, FilterValuesType, loadTodoListsTC,
    removeTodoListTC, TodolistDomainType,
} from "./components/state/todolists-reducer";
import {
    addTaskTC,
    changeTaskTitleTC,
    removeTaskTC, TasksStateType, updateTasksStatusTC,
} from "./components/state/tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppReducer} from "./components/state/store";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from "@mui/icons-material";
import {TaskStatuses} from "./components/api/todolists-api";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./components/app/app-reducer";
import {Login} from "./features/Login/Login";
import {Routes, Route} from "react-router-dom"
import TodoListsContainer from "./features/Todolist/TodoListsContainer";

function AppWithRedux() {
    const status = useAppReducer<RequestStatusType>(state => state.app.status)

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
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        You Todo List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<TodoListsContainer/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;