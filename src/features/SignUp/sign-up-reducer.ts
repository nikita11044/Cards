import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {signUpAPI} from "../../api/cards-api";

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
    setIsSignedUp({isSignedUp: true})
    signUpAPI.register(email, password)
        .then(() => {
            setIsSignedUp({isSignedUp: true})
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}