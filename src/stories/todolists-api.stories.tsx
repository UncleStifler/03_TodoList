import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolists-api";



export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodoList("НА МАРС")
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.deleteTodoList("c809d2b4-d276-4848-8cd2-b252b5cda07f")
            .then(response => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.updateTodoList("d119687c-1af6-4a6b-baed-970906b138ce", "ЗА НАС")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
