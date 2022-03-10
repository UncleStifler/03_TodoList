import {todoListsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {loadTasksTC} from "./tasks-reducer";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: "todoLists",
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(t => t.id !== action.payload.todoListId)
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.unshift({
                ...action.payload.todoList,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            })
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].entityStatus = action.payload.entityStatus
        },
        setTodoListsAC(stateDraft, action: PayloadAction<{ todoListsArray: TodolistType[] }>) {
            return action.payload.todoListsArray.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

export const todoListsReducer = slice.reducer;
export const {
    setTodoListsAC,
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodolistEntityStatusAC,
    changeTodoListFilterAC
} = slice.actions

export const loadTodoListsTC = (dispatch: Dispatch<any>): void => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC({todoListsArray: res.data}))
            res.data.forEach((todoList) => {
                dispatch(loadTasksTC(todoList.id))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
        })
}

export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10
}

export const createTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todoListsAPI.createTodoList(title)
            .then((res) => {
                if (res.data.resultCode === ResultCodes.success) {
                    dispatch(addTodoListAC({todoList: res.data.data.item}))
                } else {
                    dispatch(setAppErrorAC({
                        error: res.data.messages.length ?
                            res.data.messages[0] : 'some error'
                    }))
                }
            })
            .catch((error: AxiosError) => {
                dispatch(setAppErrorAC({error: error.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: 'failed'}))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todoListId, entityStatus: 'loading'}))
        todoListsAPI.deleteTodoList(todoListId)
            .then((res) => {
                if (res.data.resultCode === ResultCodes.success) {
                    dispatch(removeTodoListAC({todoListId}))
                } else {
                    dispatch(setAppErrorAC({
                        error: res.data.messages.length ?
                            res.data.messages[0] : 'some error'
                    }))
                }
            })
            .catch((error: AxiosError) => {
                dispatch(setAppErrorAC({error: error.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: 'idle'}))
            })
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todoListsAPI.updateTodoList(todoListId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC({todoListId, title}))
            })
            .catch((error: AxiosError) => {
                dispatch(setAppErrorAC({error: error.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: 'idle'}))
            })
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}





