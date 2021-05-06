import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {signUpAPI} from "../../api/cards-api";

const initialState = {
    signUpInProgress: false
}

const slice = createSlice({
    name: 'signUp',
    initialState: initialState,
    reducers: {
        setSignUpInProgress(state, action: PayloadAction<{signUpInProgress: boolean}>) {
            state.signUpInProgress = action.payload.signUpInProgress
        }
    }
})

export const SignUpReducer = slice.reducer

export const {setSignUpInProgress} = slice.actions

// thunks
export const singUpTC = (email: string, password: string) => (dispatch: Dispatch) => {
    setSignUpInProgress({signUpInProgress: true})
    signUpAPI.register(email, password)
        .then(() => {
            setSignUpInProgress({signUpInProgress: false})
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}