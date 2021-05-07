import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const {setProfile} = slice.actions

export const ProfileReducer = slice.reducer

type InitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
}