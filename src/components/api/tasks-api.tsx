import axios, {AxiosResponse} from "axios";
import {ResponseType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "./todolists-api";

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

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'bd989617-b1e7-48f3-b931-dc63118fa1e9'
    }
})

export const tasksListsAPI = {
    getTaskLists(todoListId: string) {
        return instance.get<getTasksListResponse>(`${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post(`${todoListId}/tasks`, {title: title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`${todoListId}/tasks/${taskId}`, model)
    }
}
