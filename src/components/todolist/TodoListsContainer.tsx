import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useAppReducer} from "../state/store";
import {
    changeTodoListFilterAC, changeTodoListTitleTC, createTodoListTC,
    FilterValuesType,
    loadTodoListsTC, removeTodoListTC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {
    addTaskTC,
    changeTaskTitleTC,
    removeTaskTC,
    TasksStateType,
    updateTasksStatusTC
} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../features/AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList";
import {Navigate} from "react-router-dom";

const TodoListsContainer = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppReducer<boolean>(state => state.auth.isLoggedIn )


    const todoLists = useAppReducer<TodolistDomainType[]>(state => state.todoLists)
    const tasksObj = useAppReducer<TasksStateType>(state => state.tasks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(loadTodoListsTC)
    }, [dispatch, isLoggedIn])

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
        dispatch(changeTodoListTitleTC(todoListId, newTodoListTitle))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"login"}/>
    }

    return (
        <>
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
        </>
    );
};

export default TodoListsContainer;
