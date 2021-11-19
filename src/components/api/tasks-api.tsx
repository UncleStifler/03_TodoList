import axios from "axios";
import {TaskPriorities, TaskStatuses, TaskType} from "./todolists-api";


export type TaskTypeResponse = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type getTasksListResponse = {
    error: string| null
    totalCount: number
    items: TaskType[]
}

type responseTasksType = {
    resultCode: number
    messages: string[]
    data: {}
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "bd989617-b1e7-48f3-b931-dc63118fa1e9"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    ...settings
})

export const tasksListsAPI = {
    getTaskLists(todoListID: string) {

        return instance.get<getTasksListResponse>(`${todoListID}/tasks`)
    },
    createTask(todoListID: string, title: string) {
        return instance.post<responseTasksType>(`${todoListID}/tasks`, {title: title})
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<responseTasksType>(`${todoListID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskID: string, title: string) {
        return instance.put<UpdateTaskType>(`${todoListID}/tasks/${taskID}`, {title: title})
    }
}
