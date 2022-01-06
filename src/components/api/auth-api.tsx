import axios, {AxiosResponse} from "axios";
import {ResponseType} from './todolists-api'

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "bd989617-b1e7-48f3-b931-dc63118fa1e9"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const authLoginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', data)
    }
}
