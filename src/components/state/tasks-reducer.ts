import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType
} from "./todolists-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolists-api";
import {tasksListsAPI} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {TasksStateType} from "../../AppWithRedux";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {AxiosError} from "axios";


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "TASKS/LOAD-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.arrayTasks
            return stateCopy
        }

        case "TASKS/REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "TASKS/ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return {...stateCopy}
        }
        case "TASKS/CHANGE-CHECKBOX-STATUS": {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            return ({...state});
        }
        case "TASKS/CHANGE-TASK-TITLE": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})
        }
        case "TODOLIST/ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "TODOLIST/REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "TODOLIST/SET-TODOLIST": {
            const copyState = {...state}
            action.todoListsArray.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        default:
            return state
    }
}

export type loadTasksActionType = ReturnType<typeof getTasksAC>

export const getTasksAC = (todoListId: string, arrayTasks: TaskType[]) => {
    return {type: 'TASKS/LOAD-TASKS', todoListId, arrayTasks} as const
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "TASKS/REMOVE-TASK",
        taskId: taskId,
        todoListId: todoListId
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: "TASKS/ADD-TASK",
        task
    } as const
}

export const changeStatusCheckboxAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {
        type: "TASKS/CHANGE-CHECKBOX-STATUS",
        status,
        todoListId,
        taskId,
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: "TASKS/CHANGE-TASK-TITLE",
        title,
        todoListId,
        taskId,
    } as const
}

// export const changeTaskEntityStatusAC = (taskId: string, entityTaskStatus: RequestStatusType) => ({
//     type: "TASK/CHANGE-TASK-ENTITY-STATUS",
//     taskId, entityTaskStatus
// } as const)

type ActionTypes = RemoveTaskActionType | AddTaskActionType |
    ChangeFilterStatusType | ChangeTaskTitleType | AddTodoListActionType |
    RemoveTodoListActionType | loadTasksActionType | SetTodoListsActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeFilterStatusType = ReturnType<typeof changeStatusCheckboxAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
// export type changeTaskEntityActionType = ReturnType<typeof changeTaskEntityStatusAC>

export const loadTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksListsAPI.getTaskLists(todoListId)
            .then((res) => {
                dispatch(getTasksAC(todoListId, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        // dispatch(changeTodolistEntityStatusAC(taskId,'loading'))
        tasksListsAPI.deleteTask(todoListId, taskId)
            .then(() => {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksListsAPI.createTask(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                } else {
                    dispatch(setAppErrorAC(res.data.messages.length ?
                        res.data.messages[0] : 'some error'))
                }
            })
            .catch((error: AxiosError) => {
                dispatch(setAppErrorAC(error.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
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
                description: currentTask.description,
            }
            dispatch(setAppStatusAC('loading'))
            tasksListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeStatusCheckboxAC(taskId, status, todoListId))
                    dispatch(setAppStatusAC('succeeded'))
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
                description: currentTask.description,
            }
            dispatch(setAppStatusAC('loading'))
            tasksListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                })
                .catch((error: AxiosError) => {
                    dispatch(setAppErrorAC(error.message))
                })
                .finally(() => {
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }
}