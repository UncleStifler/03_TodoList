import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../../features/Login/auth-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppReducer : TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
