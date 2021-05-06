import { createSlice } from "@reduxjs/toolkit";

export type InitialStateT = any;

export const initialState: InitialStateT = {};

const passwordRecoverSlice = createSlice({
    name: "passwordRecover",
    initialState,
    reducers: {}
});

export const PasswordRecoveryReducer = passwordRecoverSlice.reducer;

// * Action creators
export const {} = passwordRecoverSlice.actions;

// * Thunks Creators