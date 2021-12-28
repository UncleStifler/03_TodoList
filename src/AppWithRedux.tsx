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
    removeTaskTC, updateTasksStatusTC,
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
import {TaskStatuses, TaskType} from "./components/api/todolists-api";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import { RequestStatusType} from "./components/app/app-reducer";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todoLists = useAppReducer<TodolistDomainType[]>(state => state.todoLists)
    // const disabledStatus = useAppReducer<RequestStatusType>(state => state.todoLists.entityStatus)
    const tasksObj = useAppReducer<TasksStateType>(state => state.tasks)
    const status = useAppReducer<RequestStatusType>(state => state.app.status)


    useEffect(() => {
        dispatch(loadTodoListsTC)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [dispatch])

    const removeTask = useCallback((idTasks: string, todolistId: string) => {
        dispatch(removeTaskTC(idTasks, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeStatusCheckbox = useCallback((tasksID: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTasksStatusTC(todoListId, tasksID, status))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newValue: string, todoListId: string) => {
        dispatch(changeTaskTitleTC(id, newValue, todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, newTodoListTitle: string) => {
        const thunk = changeTodoListTitleTC(todoListId, newTodoListTitle)
        dispatch(thunk)
    }, [dispatch])

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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoLists.map(t => {
                            let tasksForTodolist = tasksObj[t.id]
                            return (
                                <Grid item key={t.id}>
                                    <Paper
                                        elevation={3}
                                        style={{padding: "15px"}}>
                                        <TodoList
                                            key={t.id}
                                            todoListId={t.id}
                                            todoListTitle={t.title}
                                            entityStatus={t.entityStatus}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatusCheckbox={changeStatusCheckbox}
                                            filter={t.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;