import {combineReducers} from 'redux'
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware as any)
})

export const useAppReducer: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
