import {
    addTodoListAC, removeTodoListAC,
    ResultCodes, setTodoListsAC,

} from "./todolists-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolists-api";
import {tasksListsAPI} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift({
                ...action.payload, entityTaskStatus: 'idle'
            })
        },
        getTasksAC(state, action: PayloadAction<{ todoListId: string, arrayTasks: TaskType[] }>) {
            state[action.payload.todoListId] = action.payload.arrayTasks
                .map(tl => ({...tl, entityTaskStatus: 'idle'}))
        },
        changeTaskTitleAC(state, action: PayloadAction<{ taskId: string, title: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], title: action.payload.title}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ taskId: string, todoListId: string, entityTaskStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityTaskStatus: action.payload.entityTaskStatus}
            }
        },
        changeStatusCheckboxAC(state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], status: action.payload.status}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId];
        });
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoListsArray.forEach(td => {
                state[td.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer;
export const {
    getTasksAC,
    addTaskAC,
    removeTaskAC,
    changeTaskEntityStatusAC,
    changeTaskTitleAC,
    changeStatusCheckboxAC
} = slice.actions;

export const loadTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        tasksListsAPI.getTaskLists(todoListId)
            .then((res) => {
                dispatch(getTasksAC({todoListId, arrayTasks: res.data.items}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTaskEntityStatusAC({taskId, todoListId, entityTaskStatus: 'loading'}))
        tasksListsAPI.deleteTask(todoListId, taskId)
            .then(() => {
                dispatch(removeTaskAC({taskId, todoListId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        tasksListsAPI.createTask(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCodes.success) {
                    dispatch(addTaskAC(res.data.data.item))
                } else {
                    dispatch(setAppErrorAC(res.data.messages.length ?
                        res.data.messages[0] : 'some error'))
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

export const updateTasksStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const allTasks = state.tasks
        const tasksForThisTodoList = allTasks[todoListId]
        const currentTask = tasksForThisTodoList.find(t => t.id === taskId)

        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: currentTask.title,
                status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.description,
                description: currentTask.description
            }
            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(changeTaskEntityStatusAC({taskId, todoListId, entityTaskStatus: 'loading'}))
            tasksListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeStatusCheckboxAC({taskId, status, todoListId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({taskId, todoListId, entityTaskStatus: 'idle'}))
                })
        }
    }

export const changeTaskTitleTC = (taskId: string, title: string, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const currentTask = state.tasks[todoListId].find((t => t.id === taskId))
        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: title,
                status: currentTask.status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.description,
                description: currentTask.description
            }
            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(changeTaskEntityStatusAC({taskId, todoListId, entityTaskStatus: 'loading'}))
            tasksListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeTaskTitleAC({taskId, title, todoListId}))
                })
                .catch((error: AxiosError) => {
                    dispatch(setAppErrorAC({error: error.message}))
                })
                .finally(() => {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({taskId, todoListId, entityTaskStatus: 'idle'}))
                })
        }
    }
}

export type TasksDomain_Type = TaskType & { entityTaskStatus: RequestStatusType }
export type TasksStateType = { [key: string]: TasksDomain_Type[] }
