import {combineReducers, createStore} from "redux";
import {LoginReducer} from "../features/Login/login-reducer";
import {PasswordCreationReducer} from "../features/Password/PasswordCreation/password-creation-reducer";
import {PasswordRecoveryReducer} from "../features/Password/PasswordRecovery/password-recovery-reducer";
import {ProfileReducer} from "../features/Profile/profile-reducer";
import {SignUpReducer} from "../features/SignUp/sign-up-reducer";

const rootReducer = combineReducers({
    login: LoginReducer,
    createPassword: PasswordCreationReducer,
    recoverPassword: PasswordRecoveryReducer,
    profile: ProfileReducer,
    signUp: SignUpReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)