import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid"
import TodoList, {TaskType} from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./components/state/todolists-reducer";
import {
    addTaskAC,
    changeStatusCheckboxAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./components/state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type ToDoListType = {
    id: string,
    todoListTitle: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
        {id: todoListID2, todoListTitle: "What film to buy", filter: "all"}
    ])


    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TypeScript", isDone: false},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "REDUX", isDone: true}],
        [todoListID2]: [
            {id: v1(), title: "Terminator", isDone: true},
            {id: v1(), title: "XXX", isDone: true},
            {id: v1(), title: "Jentelmens of fortune", isDone: false},
        ]

    })

    const addTask = (title: string, todolistID: string) => {
        const action = addTaskAC(title, todolistID)
        dispatchToTasksReducer(action)
        // let task = {id: v1(), title: title, isDone: false}
        // let tasks = tasksObj[todolistID]
        // // tasks.unshift(task)
        // tasksObj[todolistID] = [task, ...tasks]
        // setTasksObj({...tasksObj})
    }

    const removeTask = (idTasks: string, todolistID: string) => {
        const action = removeTaskAC(idTasks, todolistID)
        dispatchToTasksReducer(action)
        // let tasks = tasksObj[todolistID]
        // tasksObj[todolistID] = tasks.filter(t => t.id !== idTasks)
        // setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(value, todoListID)
        dispatchTodoListsReducer(action)
        // let todolist = todoLists.find(t => t.id === todoListID)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodoLists([...todoLists])
        // }
    }

    function changeStatusCheckbox(tasksID: string, isDone: boolean, todoListID: string) {
        const action = changeStatusCheckboxAC(tasksID, isDone, todoListID)
        dispatchToTasksReducer(action)
        // let tasks = tasksObj[todoListID]
        // let task = tasks.find(t => t.id === tasksID)
        // if (task) {
        //     task.isDone = isDone
        //     setTasksObj({...tasksObj})
        // }
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatchToTasksReducer(action)
        dispatchTodoListsReducer(action)
        // setTodoLists([...todoLists.filter(t => t.id !== todoListID)])
        // delete tasksObj[todoListID]
        // setTasksObj({...tasksObj})
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchTodoListsReducer(action)
        // let todoList: ToDoListType = {
        //     id: v1(),
        //     todoListTitle: title,
        //     filter: "all"
        // }
        // setTodoLists([todoList, ...todoLists])
        // setTasksObj({...tasksObj, [todoList.id]: []})
    }

    function changeTaskTitle(id: string, newValue: string, todoListID: string) {
        const action = changeTaskTitleAC(id, newValue, todoListID)
        dispatchToTasksReducer(action)
        // let taskForChange = tasksObj[todoListID]
        // let task = taskForChange.find(t => t.id === id)
        // if (task) {
        //     task.title = newValue
        //     setTasksObj({...tasksObj})
        // }
    }

    function changeTodoListTitle(todoListID: string, newTodoListTitle: string) {
        const action = changeTodoListTitleAC(todoListID, newTodoListTitle)

        dispatchTodoListsReducer(action)
        // const todoList = todoLists.find(tl => tl.id === todoListID)
        // if (todoList) {
        //     todoList.todoListTitle = newTodoListTitle
        //     setTodoLists([...todoLists])
        // }
    }

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
                        News
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
                            let tasksForTodolist = tasksObj[t.id];

                            if (t.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            if (t.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper
                                        elevation={3}
                                        style={{padding: "15px"}}>
                                        <TodoList
                                            key={t.id}
                                            todoListID={t.id}
                                            todoListTitle={t.todoListTitle}
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

export default AppWithReducers;