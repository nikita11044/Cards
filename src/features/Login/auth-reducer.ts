const initialState = {
    isLoggedIn: false
}

type initialStateType = typeof initialState

export const AuthReducer = (state: initialStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'auth/LOGIN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// thunks



// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/LOGIN', isLoggedIn} as const)

// action types
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>