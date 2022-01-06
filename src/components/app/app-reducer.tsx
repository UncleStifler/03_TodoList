export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// status === "loading" - крутилку показываем
// status === 'idle' / 'succeeded' / 'failed' - крутилку скрываем

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type InitialStateType = typeof initialState

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

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error: error} as const)

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    setAppErrorActionType |
    setAppStatusActionType
