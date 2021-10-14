import {TasksStateType} from "../../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";

type ActionTypes = RemoveTaskActionType | AddTaskActionType

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
            let newTask = {id: v1(), title: "juice", isDone: false}
            let tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return {...stateCopy}
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