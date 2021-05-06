import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {cardsAPI, passwordAPI} from "../../../api/cards-api";

export const initialState = {
    forgotPassword: false
};

const passwordRecoverSlice = createSlice({
    name: "passwordRecover",
    initialState,
    reducers: {
        setForgotPassword(state, action: PayloadAction<{forgotPassword: boolean}>) {
            state.forgotPassword = action.payload.forgotPassword
        }
    }
});

export const PasswordRecoveryReducer = passwordRecoverSlice.reducer;

// * Action creators
export const {setForgotPassword} = passwordRecoverSlice.actions;

// * Thunks Creators
export const passwordRecoveryTC = (email: string, from: string) => (dispatch: Dispatch) => {
    passwordAPI.recover(email, from)
        .then(() => {
            setForgotPassword({forgotPassword: true})
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
        })
}