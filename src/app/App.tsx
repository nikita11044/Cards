import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "../features/Login/Login";
import {PasswordCreation} from "../features/Password/PasswordCreation/PasswordCreation";
import {PasswordRecovery} from "../features/Password/PasswordRecovery/PasswordRecovery";
import {Profile} from "../features/Profile/Profile";
import {SignUp} from "../features/SignUp/SignUp";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    // if (!isLoggedIn) {
    //     return <Redirect to={'/login'}/>
    // }

    return (
        <div className="App">
            <h1>CARDS APP</h1>
            <Switch>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/create-password'} render={() => <PasswordCreation/>}/>
                <Route path={'/recover-password'} render={() => <PasswordRecovery/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/sign-up'} render={() => <SignUp/>}/>
            </Switch>
        </div>
    );
}

export default App;
