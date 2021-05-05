const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'app/SET-STATUS':
            return {...state, status: action.status}
        case 'app/SET-ERROR':
            return {...state, error: action.error}
        case "app/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'app/SET-IS-INITIALIZED', isInitialized} as const)

// action types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type ActionTypes = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType

// types
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'