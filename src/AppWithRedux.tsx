import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";

import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
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
import {tasksListsAPI} from "./components/api/tasks-api";

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
    console.log('App has been called')
    //useDispatch используется для то чтобы функция задиспатчила то что нам нужно
    const dispatch = useDispatch()
    //useSelector чтобы получить из стора то что нам нужно
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

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


    // useEffect(() => {
    //     todoListsAPI.getTodoLists()
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     todoListsAPI.createTodoList("TEST-2")
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     todoListsAPI.deleteTodoList("e52d6ac4-ea74-4524-bdaa-af6b3c59531d")
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     todoListsAPI.updateTodoList('e0cfaf80-83c3-4196-bc47-58298b5bfa09', "CHENGED")
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // },[])

    // useEffect(() => {
    //     tasksListsAPI.getTaskLists('d0adab87-cbfe-4dc5-a6bb-35470d4db667')
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     tasksListsAPI.createTask('fdf4500b-a78d-45a8-804e-8724b5e59c32', 'Tasks-2')
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     tasksListsAPI.deleteTask('fdf4500b-a78d-45a8-804e-8724b5e59c32', '624a1143-7863-44e3-96d6-2d4e0d0300f6')
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }, [])

    // useEffect(() => {
    //     tasksListsAPI.updateTask('fdf4500b-a78d-45a8-804e-8724b5e59c32', '5a6d9459-9a78-40cd-9884-2a4f25fb55b7', 'The new name')
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // })

    // const refreshTodoList = () => {
    //     todoListsAPI.getTodoLists()
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }
    //
    // const refreshTasks = () => {
    //     tasksListsAPI.getTaskLists('d0adab87-cbfe-4dc5-a6bb-35470d4db667')
    //         .then(response => {
    //             console.log(response.data)
    //         })
    // }
    //
    // const addTodoListAxios = () => {
    //         todoListsAPI.createTodoList("MANUAL ADD")
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    // }
    //
    // const deleteTotoListAxios = () => {
    //     todoListsAPI.deleteTodoList(todoListID)
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    // }
    //
    // const createNewTaskAxios = () => {
    //     tasksListsAPI.createTask('d0adab87-cbfe-4dc5-a6bb-35470d4db667', 'First Button-Axios Task')
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    // }
    //
    // const deleteTaskAxios = () => {
    //     tasksListsAPI.deleteTask(todoListID, taskID)
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    // }

        const [todoListID, setTodoListID] = useState<string>('')
        const [taskID, setTaskID] = useState<string>('')

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


            {/*axios test*/}
            {/*<input placeholder={'todoListID'} value={todoListID}*/}
            {/*       onChange={(e) => {setTodoListID(e.currentTarget.value)}}/>*/}
            {/*<input placeholder={'tasksID'} value={taskID}*/}
            {/*       onChange={(e) => {setTaskID(e.currentTarget.value)}}/>*/}
            {/*<button onClick={refreshTodoList}>refreshTodoList</button>*/}
            {/*<button onClick={refreshTasks}>refreshTasks</button>*/}
            {/*<button onClick={addTodoListAxios}>addTotoList</button>*/}
            {/*<button onClick={deleteTotoListAxios}>deleteTotoList</button>*/}
            {/*<button onClick={createNewTaskAxios}>createNewTask</button>*/}
            {/*<button onClick={deleteTaskAxios}>deleteTaskAxios</button>*/}
            {/*<button onClick={}>deleteTask</button>*/}



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