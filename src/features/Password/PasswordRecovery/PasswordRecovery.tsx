import React from "react";
import { PasswordRecoverForm } from "./PasswordRecoverForm";
import { FormContainer } from "./FormContainer";
import {Redirect} from "react-router-dom";
import {PATHS} from "../../../api/PATHS";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

export const PasswordRecovery = (props: any) => {
    const forgotPassword = useSelector<AppRootStateType, boolean>(state => state.recoverPassword.forgotPassword)

    if (forgotPassword) {
        return <Redirect to={PATHS.createPassword} />
    }

    return (
        <>
            <h2>Password recovery</h2>
            <FormContainer>
                <PasswordRecoverForm/>
            </FormContainer>
        </>
    );
};
