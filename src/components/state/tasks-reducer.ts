import {TasksStateType} from "../../App";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID1, todoListID2} from "./todolists-reducer";
import {v1} from "uuid";


type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeFilterStatusType |
    ChangeTaskTitleType | AddTodoListActionType | RemoveTodoListActionType


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string,
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

type ChangeFilterStatusType = {
    type: 'CHANGE-FILTER-STATUS'
    taskId: string
    todoListId: string
    isDone: boolean
}

type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todoListId: string
    title: string
}

const initialState: TasksStateType = {
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
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return {...stateCopy}
        }
        case "CHANGE-FILTER-STATUS": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t =>
                t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t =>
                t.title === action.title ? {...t, title: action.title} : t)

            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        taskId: taskId,
        todoListId: todoListId
    }
}
export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title: taskTitle,
        todoListId: todoListId
    }
}

export const changeStatusCheckboxAC = (taskId: string, isDone: boolean, todoListId: string): ChangeFilterStatusType => {
    return {
        type: "CHANGE-FILTER-STATUS",
        isDone,
        todoListId,
        taskId,
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleType => {
    return {
        type: "CHANGE-TASK-TITLE",
        title,
        todoListId,
        taskId,
    }
}
