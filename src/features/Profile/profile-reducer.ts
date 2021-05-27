import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAPI, passwordAPI} from "../../api/api";
import {setIsLoggedIn} from "../Login/auth-reducer";
import {errorHandler} from "../../common/error-handler";
import {AppThunk} from "../../app/store";

const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: '',
    avatar: ''
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<{_id: string, email: string, name: string, avatar: string | undefined}>) {
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.avatar = action.payload.avatar
        }
    }
})

// thunks

export const getMe = (): AppThunk => async (dispatch) => {
    try {
        const response = await loginAPI.me()
        console.log(response)
        const {_id, email, name, avatar} = response.data
        dispatch(setProfile({_id, email, name, avatar}))
        dispatch(setIsLoggedIn({isLoggedIn: true}))
    } catch (e) {
        errorHandler(e)
    }
}

export const {setProfile} = slice.actions

export const ProfileReducer = slice.reducer

type InitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
}

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type ProfileActionTypes = SliceActions<typeof slice.actions>