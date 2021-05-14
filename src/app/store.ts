import {combineReducers} from "redux";
import {AuthActionTypes, AuthReducer} from "../features/Login/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {AppActionTypes, AppReducer} from "./app-reducer";
import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {
    PasswordRecoverActionTypes,
    PasswordRecoveryReducer
} from "../features/Password/PasswordRecovery/password-recovery-reducer";
import {ProfileActionTypes, ProfileReducer} from "../features/Profile/profile-reducer";
import {SignUpActionTypes, SignUpReducer} from "../features/SignUp/sign-up-reducer";
import {PacksActionTypes, packsReducer} from "../features/PacksTable/Pack/packs-reducer";
//import {paskReducer} from "../features/PacksTable/paskReducer";
import {CardsActionTypes, cardsReducer} from "../features/CardsTable/Card/cards-reducer";
import {reducerSearch} from "../features/PacksTable/Pack/reducer-search";

const rootReducer = combineReducers({
    auth: AuthReducer,
    app: AppReducer,
    // createPassword: PasswordCreationReducer,
    recoverPassword: PasswordRecoveryReducer,
    profile: ProfileReducer,
    signUp: SignUpReducer,
    packs: packsReducer,
    cards: cardsReducer,
    search:reducerSearch,
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppActionsType = AppActionTypes
    | AuthActionTypes
    | PasswordRecoverActionTypes
    | ProfileActionTypes
    | SignUpActionTypes
    | PacksActionTypes
    | CardsActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>