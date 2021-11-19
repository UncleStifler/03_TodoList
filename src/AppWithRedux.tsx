import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC, loadTodoListsTC,
    removeTodoListAC, TodolistDomainType,
} from "./components/state/todolists-reducer";
import {
    addTaskAC,
    changeStatusCheckboxAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./components/state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType, todoListsAPI} from "./components/api/todolists-api";


export type FilterValuesType = "all" | "completed" | "active"
export type ToDoListType = {
    id: string,
    todoListTitle: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    //useDispatch используется для то чтобы функция задиспатчила то что нам нужно
    const dispatch = useDispatch()
    //useSelector чтобы получить из стора то что нам нужно
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => {

        return state.tasks
    })

    useEffect(() => {
        dispatch(loadTodoListsTC)
    }, [])

    const addTask = useCallback((title: string, todolistID: string) => {
        const action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [])

    const removeTask = useCallback((idTasks: string, todolistID: string) => {
        const action = removeTaskAC(idTasks, todolistID)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        const action = changeTodoListFilterAC(value, todoListID)
        dispatch(action)
    }, [])

    const changeStatusCheckbox = useCallback((tasksID: string, status: TaskStatuses, todoListID: string) => {
        const action = changeStatusCheckboxAC(tasksID, status, todoListID)
        dispatch(action)
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [])

    const addTodoList = useCallback((title: string) => {
        console.log('UseCallback has been called')
        const action = addTodoListAC(title)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((id: string, newValue: string, todoListID: string) => {
        const action = changeTaskTitleAC(id, newValue, todoListID)
        dispatch(action)
    }, [])

    const changeTodoListTitle = useCallback((todoListID: string, newTodoListTitle: string) => {
        const action = changeTodoListTitleAC(todoListID, newTodoListTitle)
        dispatch(action)
    }, [])

    return (
        <div className="App">
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
                                <Grid item>
                                    <Paper
                                        elevation={3}
                                        style={{padding: "15px"}}>
                                        <TodoList
                                            key={t.id}
                                            todoListID={t.id}
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