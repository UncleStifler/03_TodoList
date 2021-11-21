import {todoListsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "react";
import {AppRootStateType} from "./store";
import {loadTasksTC} from "./tasks-reducer";


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
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
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

export const setTodoListsAC = (todoListsArray: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todoListsArray} as const
}

export const removeTodoListAC = (todoListId: string) => {
    return {type: "REMOVE-TODOLIST", id: todoListId} as const
}

export const addTodoListAC = (todo: any) => {
    return {
        type: "ADD-TODOLIST",
        title: todo.title,
        todolistId: todo.id
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

export const loadTodoListsTC = (dispatch: Dispatch<any>, getState: () => AppRootStateType): void => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))

            res.data.forEach((todoList) => {
                console.log(todoList)

                dispatch(loadTasksTC(todoList.id))
            })
        })
}

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type changeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

type ActionTypes =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType |
    SetTodoListsActionType

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todoListsAPI.deleteTodoList(todoListId)
            .then(() => {
                dispatch(removeTodoListAC(todoListId))
            })
    }
}

export const createTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionTypes>, getState: () => AppRootStateType) => {
        todoListsAPI.createTodoList(title)
            .then((res) => {
                let newTodo = res.data.data.item
                dispatch(addTodoListAC(newTodo))
            })
    }
}




