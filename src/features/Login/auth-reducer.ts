import {loginAPI, LoginParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setProfile} from "../Profile/profile-reducer";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const AuthReducer = slice.reducer

// thunks
export const loginTC = (loginParams: LoginParamsType) => (dispatch: Dispatch) => {
    loginAPI.login(loginParams)
        .then((response) => {
            const {_id, email, name, avatar} = response.data
            dispatch(setProfile({_id, email, name, avatar}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        })
        .catch(e => {
            const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    loginAPI.logout()
        .then(() => {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}

// actions
export const {setIsLoggedIn} = slice.actions