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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./components/api/todolists-api";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    //useDispatch используется для то чтобы функция dispatch то что нам нужно
    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => {return state.tasks})

    useEffect(() => {
        dispatch(loadTodoListsTC)
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [])

    const removeTask = useCallback((idTasks: string, todolistId: string) => {
        dispatch(removeTaskTC(idTasks, todolistId))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)
    }, [])

    const changeStatusCheckbox = useCallback((tasksID: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTasksStatusTC(todoListId, tasksID, status))
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [])

    const changeTaskTitle = useCallback((id: string, newValue: string, todoListId: string) => {
        dispatch(changeTaskTitleTC(id, newValue, todoListId))
    }, [])

    const changeTodoListTitle = useCallback((todoListId: string, newTodoListTitle: string) => {
        const thunk = changeTodoListTitleTC(todoListId, newTodoListTitle)
        dispatch(thunk)
    }, [])

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
                <LinearProgress/>
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