import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const cardsAPI = {
    login(loginParams: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', loginParams)
    }
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}