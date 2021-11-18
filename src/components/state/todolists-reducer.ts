import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ChangeTodoListTitleActionType = {

    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    todoListTitle: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
// export const todoListID1 = v1()
// export const todoListID2 = v1()


const initialState: TodolistDomainType[] = [
    // {id: todoListID1, title: "What to learn", filter: "all"},
    // {id: todoListID2, title: "What film to buy", filter: "all"}
]

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
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
                todoList.title = action.todoListTitle
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

export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todoListID
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    }
}
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListID,
        todoListTitle: title
    }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todoListID,
        filter: filter
    }
}