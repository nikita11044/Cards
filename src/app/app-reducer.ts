import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {loginAPI} from "../api/api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        }
    }
})

export const AppReducer = slice.reducer

export const {
    setAppStatus,
    setAppError,
} = slice.actions


// action types
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type ActionTypes = SetAppStatusActionType | SetAppErrorActionType

// types
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type AppActionTypes = SliceActions<typeof slice.actions>