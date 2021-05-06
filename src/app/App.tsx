import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "../features/Login/Login";
import {PasswordCreation} from "../features/Password/PasswordCreation/PasswordCreation";
import {PasswordRecovery} from "../features/Password/PasswordRecovery/PasswordRecovery";
import {Profile} from "../features/Profile/Profile";
import {SignUp} from "../features/SignUp/SignUp";

function App() {
    return (
        <div className="App">
            <h1>CARDS APP</h1>
            <Switch>
                <Route exact path={'/cards'} render={() => <Profile/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/create-password'} render={() => <PasswordCreation/>}/>
                <Route path={'/recover-password'} render={() => <PasswordRecovery/>}/>
                <Route path={'/sign-up'} render={() => <SignUp/>}/>
                <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default App;
