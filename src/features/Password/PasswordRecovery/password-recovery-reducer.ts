import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {passwordAPI} from "../../../api/api";
import {errorHandler} from "../../../common/error-handler";
import {AppThunk} from "../../../app/store";

const initialState = {
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
export const passwordRecoveryTC = (email: string, from: string): AppThunk => async (dispatch) => {
    try {
        await passwordAPI.recover(email, from)
        dispatch(setForgotPassword({forgotPassword: true}))
    } catch (e) {
        errorHandler(e)
    }
}

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type PasswordRecoverActionTypes = SliceActions<typeof passwordRecoverSlice.actions>