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

export const PasswordRecovery = (props: any) => {


    return (
        <>
            <h1>Password Recover</h1>

            <FormContainer>
                <PasswordRecoverForm/>
            </FormContainer>
        </>
    );
};
