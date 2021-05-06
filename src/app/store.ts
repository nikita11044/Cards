import {combineReducers, createStore} from "redux";
import {LoginReducer} from "../features/Login/login-reducer";
import {PasswordCreationReducer} from "../features/Password/PasswordCreation/password-creation-reducer";
import {PasswordRecoveryReducer} from "../features/Password/PasswordRecovery/password-recovery-reducer";
import {ProfileReducer} from "../features/Profile/profile-reducer";
import {SignUpReducer} from "../features/SignUp/sign-up-reducer";

import thunk, { ThunkAction } from "redux-thunk";
import {Action } from "redux";


export type AppRootStateT = ReturnType<typeof rootReducer>;
/*
 * In a AppThunkT  is a action or actions what you want to use
 * Each reducer has it own actions
 * */
export type AppThunkT<A extends Action> = ThunkAction<void, AppRootStateT, unknown, A>;
export type AppDispatchT = typeof store.dispatch;




const rootReducer = combineReducers({
    recoverPassword: PasswordRecoveryReducer,
   /*login: LoginReducer,
    createPassword: PasswordCreationReducer,

    profile: ProfileReducer,
    signUp: SignUpReducer*/
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)