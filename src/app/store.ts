import {combineReducers, createStore} from "redux";
import {AuthReducer} from "../features/Login/auth-reducer";
import {PasswordCreationReducer} from "../features/Password/PasswordCreation/password-creation-reducer";
import {PasswordRecoveryReducer} from "../features/Password/PasswordRecovery/password-recovery-reducer";
import {ProfileReducer} from "../features/Profile/profile-reducer";
import {SignUpReducer} from "../features/SignUp/sign-up-reducer";
import thunkMiddleware from 'redux-thunk'
import {AppReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: AuthReducer,
    app: AppReducer,
    // createPassword: PasswordCreationReducer,
    // recoverPassword: PasswordRecoveryReducer,
    // profile: ProfileReducer,
    // signUp: SignUpReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});