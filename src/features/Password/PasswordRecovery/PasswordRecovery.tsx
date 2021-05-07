/*import React from "react"
import { PasswordRecoverForm } from "./PasswordRecoverForm";
export const PasswordRecovery: React.FC = () => {
    return (<div>Password Recovery
            <PasswordRecoverForm/>
    </div>


import { FormContainer } from "../../components/layout/FormContainer";
    )
}*/


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
            <h1>Password Recover</h1>
            <FormContainer>
                <PasswordRecoverForm/>
            </FormContainer>
        </>
    );
};
