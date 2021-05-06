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

export const passwordAPI = {
    recover(email: string, from: string) {
        return instance.post<PassportRecoveryResponseType>('auth/forgot', {email, from, message: `<div style="background-color: lime; padding: 15px">error: string;password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'></a>link</a></div>`})
    }
}

export const signUpAPI = {
    register(email: string, password: string) {
        return instance.post<SignUpResponseType>('auth/register', {email, password})
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

type PassportRecoveryResponseType = {
    info: string,
    error: string
}

type SignUpResponseType = {
    addedUser: any,
    error?: string
}