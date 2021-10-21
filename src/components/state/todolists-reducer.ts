import {FilterValuesType, ToDoListType} from "../../App";
import {v1} from "uuid";

type ActionTypes =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoListTitle: string
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


export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: ToDoListType[] = [
    {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
    {id: todoListID2, todoListTitle: "What film to buy", filter: "all"}
]

export const todoListsReducer = (state: ToDoListType[] = initialState, action: ActionTypes): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                todoListTitle: action.todoListTitle,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            let todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.todoListTitle = action.todoListTitle
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER' : {
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
        type: 'REMOVE-TODOLIST',
        id: todoListID
    }
}
export const addTodoListAC = (todoListTitle: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        todoListTitle,
        todolistId: v1()
    }
}
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListID,
        todoListTitle: title
    }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListID,
        filter: filter
    }
}