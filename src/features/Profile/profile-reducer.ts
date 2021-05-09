import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {loginAPI} from "../../api/api";
import {setIsLoggedIn} from "../Login/auth-reducer";

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

export const getMe = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then(res => {
            const {_id, email, name, avatar} = res.data
            dispatch(setProfile({_id, email, name, avatar}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}

export const {setProfile} = slice.actions

export const ProfileReducer = slice.reducer

type InitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
}