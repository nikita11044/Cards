import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import {NavLink, Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import {InputText} from "../../components/InputText";
import {Checkbox} from "../../components/Checkbox";
import { Button } from "../../components/Button";
import {PATHS} from "../../api/PATHS";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Redirect to={PATHS.profile}/>
    }

    return <>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText error={formik.errors.email} type="email" {...formik.getFieldProps('email')}/>
            <div>
                <NavLink to={PATHS.recoverPassword}>Forgot password?</NavLink>
            </div>
            <InputText error={formik.errors.password} type="password" {...formik.getFieldProps('password')}/>
            Remember me <Checkbox {...formik.getFieldProps('rememberMe')}/>
            <Button>Login</Button>
        </StyledForm>
        <div>
            <NavLink to={PATHS.signUp}>Sign up</NavLink>
        </div>
    </>
}

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 400px;
`;
