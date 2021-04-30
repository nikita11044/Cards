import React from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import {Login} from "../features/Login/Login";
import {PasswordCreation} from "../features/Password/PasswordCreation/PasswordCreation";
import {PasswordRecovery} from "../features/Password/PasswordRecovery/PasswordRecovery";
import {Profile} from "../features/Profile/Profile";
import {SignUp} from "../features/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={ '/login' } render={ () => <Login/> }/>
        <Route path={ '/create-password' } render={ () => <PasswordCreation/> }/>
        <Route path={ '/recover-password' } render={ () => <PasswordRecovery/> }/>
        <Route path={ '/profile' } render={ () => <Profile/> }/>
        <Route path={ '/sign-up' } render={ () => <SignUp/> }/>
      </Switch>
    </div>
  );
}

export default App;
