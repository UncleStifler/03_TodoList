export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

const setAppStatusAC = (status: RequestStatusType) => {return {type: 'APP/SET-STATUS', status: status} as const}
const setAppErrorAC = (error: any) => {return {type: 'APP/SET-ERROR', error: error} as const}

type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    setAppErrorActionType |
    setAppStatusActionType