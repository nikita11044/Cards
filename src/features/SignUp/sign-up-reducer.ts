import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {signUpAPI} from "../../api/api";

const initialState = {
    isSignedUp: false
}

const slice = createSlice({
    name: 'signUp',
    initialState: initialState,
    reducers: {
        setIsSignedUp(state, action: PayloadAction<{isSignedUp: boolean}>) {
            state.isSignedUp = action.payload.isSignedUp
        }
    }
})

export const SignUpReducer = slice.reducer

export const {setIsSignedUp} = slice.actions

// thunks
export const singUpTC = (email: string, password: string) => (dispatch: Dispatch) => {
    signUpAPI.register(email, password)
        .then(() => {
            debugger
            setIsSignedUp({isSignedUp: true})
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}

// * Types

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type SignUpActionTypes = SliceActions<typeof slice.actions>