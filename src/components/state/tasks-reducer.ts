import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "react";
import {tasksListsAPI} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {TasksStateType} from "../../AppWithRedux";


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "LOAD-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.arrayTasks
            return stateCopy
        }

        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return {...stateCopy}
        }
        case "CHANGE-CHECKBOX-STATUS": {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks
                .map(t => t.title === action.title ? {...t, title: action.title} : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLIST": {
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
    return {type: 'LOAD-TASKS', todoListId, arrayTasks} as const
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId: taskId,
        todoListId: todoListId
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}

export const changeStatusCheckboxAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {
        type: "CHANGE-CHECKBOX-STATUS",
        status,
        todoListId,
        taskId,
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        title,
        todoListId,
        taskId,
    } as const
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType |
    ChangeFilterStatusType | ChangeTaskTitleType | AddTodoListActionType |
    RemoveTodoListActionType | loadTasksActionType | SetTodoListsActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeFilterStatusType = ReturnType<typeof changeStatusCheckboxAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>


export const loadTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        tasksListsAPI.getTaskLists(todoListId)
            .then((res) => {
                dispatch(getTasksAC(todoListId, res.data.items))
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        tasksListsAPI.deleteTask(todoListId, taskId)
            .then(() => {
                dispatch(removeTaskAC(taskId, todoListId))
            })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        tasksListsAPI.createTask(todoListId, title)
            .then((res) => {
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}

export const updateTasksStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionTypes>, getState: () => AppRootStateType) => {
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

            tasksListsAPI.updateTask(todoListId, taskId, model)
                .then((res) => {
                    dispatch(changeStatusCheckboxAC(taskId, status, todoListId))
                })
        }
    }

