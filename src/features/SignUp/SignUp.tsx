import React, {useEffect} from "react"
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import styled from "styled-components/macro";
import {InputText} from "../../components/InputText";
import { Button } from "../../components/Button";
import {setSignUpInProgress, singUpTC} from "./sign-up-reducer";

type FormikErrorType = {
    email?: string
    password?: string
}

export const SignUp: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            dispatch(singUpTC(values.email, values.password))
            formik.resetForm()
        }
    })

    return <>
        <h1>SIGN UP</h1>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText error={formik.errors.email} type="email" {...formik.getFieldProps('email')}/>
            <InputText error={formik.errors.password} type="password" {...formik.getFieldProps('password')}/>
            <Button>Sign Up</Button>
        </StyledForm>
    </>
}

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 400px;
`;
