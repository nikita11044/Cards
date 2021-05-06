import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
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
        },
        setIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const AppReducer = slice.reducer

export const {
    setAppStatus,
    setAppError,
    setIsInitialized
} = slice.actions

// action types
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitialized>
export type ActionTypes = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType

// types
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'