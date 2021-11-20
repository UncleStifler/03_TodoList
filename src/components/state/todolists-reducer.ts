import {v1} from "uuid";
import {todoListsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "react";
import {AppRootStateType} from "./store";
import {tasksListsAPI} from "../api/tasks-api";
import {removeTaskAC} from "./tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todoListsArray.map(t => {
                return {...t, filter: 'all'}
            })
        }
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            let todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER" : {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter

            }
            return [...state]
        }
        default:
            return state
    }
}

export const setTodoLists = (todoListsArray: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todoListsArray} as const
}

export const removeTodoListAC = (todoListId: string) => {
    return {type: "REMOVE-TODOLIST", id: todoListId} as const
}

export const addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    } as const
}
export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListId,
        title: title
    } as const
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todoListId,
        filter: filter
    } as const
}

export const loadTodoListsTC = (dispatch: Dispatch<ActionTypes>, getState: () => AppRootStateType): void => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoLists(res.data))
        })
}

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type changeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>
export type SetTodoLists = ReturnType<typeof setTodoLists>

type ActionTypes =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType |
    SetTodoLists

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todoListsAPI.deleteTodoList(todoListId)
            .then(() => {
                dispatch(removeTodoListAC(todoListId))
            })
    }
}


