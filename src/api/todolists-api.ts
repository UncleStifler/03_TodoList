import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "bd989617-b1e7-48f3-b931-dc63118fa1e9"
    }
}

const URL = "https://social-network.samuraijs.com/api/1.0/todo-lists"

export const todoListsAPI = {
    getTodoLists() {
        return axios.get(URL, settings)
    },
    createTodoList(title: string) {
        return axios.post(URL, {title: title},settings)
    },
    deleteTodoList(todoListID: string) {
        return axios.delete(`${URL}/${todoListID}`, settings)
    },
    updateTodoList(todoListID: string, title: string) {
        return axios.put(`${URL}/${todoListID}`,
            {title: title}, settings)
    }
}