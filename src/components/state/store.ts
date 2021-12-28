import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppReducer : TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
