import {loginAPI, LoginParamsType, packsAPI} from "../../api/api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setProfile} from "../Profile/profile-reducer";
import {errorHandler} from "../../common/error-handler";
import {AppThunk} from "../../app/store";
import {setCardPacks} from "../PacksTable/Pack/packs-reducer";

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
export const loginTC = (loginParams: LoginParamsType): AppThunk => async (dispatch) => {
    try {
        const response = await loginAPI.login(loginParams)
        const {_id, email, name, avatar} = response.data
        dispatch(setProfile({_id, email, name, avatar}))
        dispatch(setIsLoggedIn({isLoggedIn: true}))
    } catch (e) {
        errorHandler(e)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        await loginAPI.logout()
        dispatch(setIsLoggedIn({isLoggedIn: false}))
    } catch (e) {
        errorHandler(e)
    }
}

// actions
export const {setIsLoggedIn} = slice.actions

// types

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type AuthActionTypes = SliceActions<typeof slice.actions>