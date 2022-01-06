import axios, {AxiosResponse} from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
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

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "bd989617-b1e7-48f3-b931-dc63118fa1e9"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title: title})
    }
}

