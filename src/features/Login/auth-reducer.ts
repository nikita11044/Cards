import {cardsAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

export const AuthReducer = (state: InitialStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'auth/LOGIN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// thunks
export const loginTC = (loginParams: LoginParamsType) => (dispatch: Dispatch) => {
    cardsAPI.login(loginParams)
        .then(() => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => {
            const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        })
}


// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'auth/LOGIN', isLoggedIn} as const)

// action types
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>

// types
type InitialStateType = typeof initialState