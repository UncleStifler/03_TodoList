import axios from "axios";


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
        return instance.get('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post('/todo-lists', {title: title})
    },
    deleteTodoList(todoListID: string) {
        return instance.delete(`/todo-lists/${todoListID}`)
    },
    updateTodoList(todoListID: string, title: string) {
        return instance.put(`/todo-lists/${todoListID}`, {title: title})
    }
} 