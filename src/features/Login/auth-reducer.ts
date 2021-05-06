import {cardsAPI, LoginParamsType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    cardsAPI.login(loginParams)
        .then(() => {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        })
        .catch(e => {
            const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        })
}


// actions
export const {setIsLoggedIn} = slice.actions