import {
    setAppErrorActionType,
    setAppStatusAC,
    setAppStatusActionType
} from "../../components/state/app-reducer";
import {Dispatch} from "redux";
import {authLoginAPI, LoginParamsType} from "../../components/api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../components/utils/error-utils";
import {SET_INITIALIZED_AC, SET_IS_LOGGED_IN} from "../../components/state/constants-for-reducers";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value}
        case SET_INITIALIZED_AC:
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: SET_IS_LOGGED_IN, value} as const)
export const setIsInitializedAC = (value: boolean) => ({type: SET_INITIALIZED_AC, value} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authLoginAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authLoginAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authLoginAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setIsLoggedInAC> |
    ReturnType<typeof setIsInitializedAC> |
    setAppStatusActionType | setAppErrorActionType
