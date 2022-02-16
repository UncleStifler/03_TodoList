import {SET_ERROR, SET_STATUS} from "./constants-for-reducers";

export const appReducer = (state: InitialStateType = initialState, action: AppActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: SET_STATUS, status: status} as const)
export const setAppErrorAC = (error: string | null) => ({type: SET_ERROR, error: error} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type InitialStateType = typeof initialState
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

type AppActionTypes = setAppErrorActionType | setAppStatusActionType
