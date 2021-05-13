import {combineReducers} from "redux";
import {AuthReducer} from "../features/Login/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {AppReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {PasswordRecoveryReducer} from "../features/Password/PasswordRecovery/password-recovery-reducer";
import {ProfileReducer} from "../features/Profile/profile-reducer";
import {SignUpReducer} from "../features/SignUp/sign-up-reducer";
import {packsReducer} from "../features/PacksTable/Pack/packs-reducer";
//import {paskReducer} from "../features/PacksTable/paskReducer";
import {cardsReducer} from "../features/CardsTable/Card/cards-reducer";
import {reducerSearch} from "../features/PacksTable/Pack/reducer-search";

const rootReducer = combineReducers({
    auth: AuthReducer,
    app: AppReducer,
    // createPassword: PasswordCreationReducer,
    recoverPassword: PasswordRecoveryReducer,
    profile: ProfileReducer,
    signUp: SignUpReducer,
   // packs: paskReducer,
    packs: packsReducer,
    cards: cardsReducer,
    search:reducerSearch,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

//



export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});