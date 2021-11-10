import axios from "axios";

export type TodoListResponse = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType<param = {}> = {
    resultCode: number
    messages: Array<string>
    data: param
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
        return instance.get<TodoListResponse[]>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListResponse }>>('/todo-lists', {title: title})
    },
    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
    },
    updateTodoList(todoListID: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListID}`, {title: title})
    }
} 