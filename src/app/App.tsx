import React from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "../features/Login/Login";
import {PasswordCreation} from "../features/Password/PasswordCreation/PasswordCreation";
import {PasswordRecovery} from "../features/Password/PasswordRecovery/PasswordRecovery";
import {Profile} from "../features/Profile/Profile";
import {SignUp} from "../features/SignUp/SignUp";
import {PATHS} from "../api/PATHS";

function App() {
    return (
        <div className="App">
            <header>
                <h1>CARDS APP</h1>
                <nav className="nav">
                    <div><NavLink to={PATHS.profile}>profile</NavLink></div>
                    <div><NavLink to={PATHS.login}>login</NavLink></div>
                    <div><NavLink to={PATHS.createPassword}>createPassword</NavLink></div>
                    <div><NavLink to={PATHS.recoverPassword}>recoverPassword</NavLink></div>
                    <div><NavLink to={PATHS.signUp}>signUp</NavLink></div>
                </nav>
            </header>
            <div className="contentContainer">
                <Switch>
                    <Route exact path={PATHS.main} render={() => <Profile/>}/>
                    <Route path={PATHS.profile} render={() => <Profile/>}/>
                    <Route path={PATHS.login} render={() => <Login/>}/>
                    <Route path={PATHS.createPassword} render={() => <PasswordCreation/>}/>
                    <Route path={PATHS.recoverPassword} render={() => <PasswordRecovery/>}/>
                    <Route path={PATHS.signUp} render={() => <SignUp/>}/>
                    <Route path={PATHS.pageNotFound} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={PATHS.pageNotFound}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
