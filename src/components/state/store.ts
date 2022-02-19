import {combineReducers} from 'redux'
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from 'react-redux'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk as any)
    // middleware: getDefaultMiddleware =>
        // getDefaultMiddleware().prepend(thunkMiddleware)
        // getDefaultMiddleware().concat(logger)
})

export const useAppReducer: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
