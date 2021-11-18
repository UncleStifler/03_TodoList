import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {v1} from "uuid";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses, TaskType} from "./components/api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./components/state/todolists-reducer";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<TodolistDomainType[]>([
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListID2, title: "What film to buy", filter: "all" , addedDate: "", order: 0}
    ])


    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS",  status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: v1(), title: "TypeScript", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: v1(), title: "REACT", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: v1(), title: "REDUX", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }],
        [todoListID2]: [
            {id: v1(), title: "Terminator", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "XXX", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Jentelmens of fortune", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    })

    const addTask = (title: string, todolistID: string) => {
        debugger
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistID, description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        let tasks = tasksObj[todolistID]
        // tasks.unshift(task)
        tasksObj[todolistID] = [task, ...tasks]

        setTasksObj({...tasksObj})
    }

    const removeTask = (idTasks: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        tasksObj[todolistID] = tasks.filter(t => t.id !== idTasks)
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todolist = todoLists.find(t => t.id === todoListID)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeStatusCheckbox(tasksID: string, status: TaskStatuses, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === tasksID)
        if (task) {
            task.status = status
            setTasksObj({...tasksObj})
        }
    }

    function removeTodoList(todoListID: string) {
        debugger
        // setTodoLists([...todoLists.filter(t => t.id !== todoListID)])
        // delete tasksObj[todoListID]
        // setTasksObj({...tasksObj})
    }

    function addTodoList(title: string) {
        let todoList: TodolistDomainType = {
            id: v1(),
            title: title,
            filter: "all",
            addedDate: "",
            order: 0
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id]: []})
    }

    function changeTaskTitle(id: string, newValue: string, todoListID: string) {
        let taskForChange = tasksObj[todoListID]
        let task = taskForChange.find(t => t.id === id)
        if (task) {
            task.title = newValue
            setTasksObj({...tasksObj})
        }
    }

    function changeTodoListTitle(todoListID: string, newTodoListTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTodoListTitle
            setTodoLists([...todoLists])
        }
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
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                            }
                            if (t.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                            }
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

export default App;