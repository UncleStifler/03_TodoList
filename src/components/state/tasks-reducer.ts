import {TasksStateType} from "../../App";

import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

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


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: "juice", isDone: false}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return {...stateCopy}
        }
        case "CHANGE-FILTER-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }

            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
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
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todoListId: todoListId
    }
}
export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: todoListId,
        todoListId: todoListId
    }
}

export const changeFilterStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeFilterStatusType => {
    return {
        type: 'CHANGE-FILTER-STATUS',
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
