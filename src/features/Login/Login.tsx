import React from "react"
import {CustomTextInput} from "../../components/CustomTextInput";
import {CustomCheckbox} from "../../components/CustomCheckbox";
import {CustomButton} from "../../components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import { Redirect } from "react-router-dom";

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
        return <Redirect to={'/profile'}/>
    }

    return <form onSubmit={formik.handleSubmit}>
        <input type="email" placeholder="email"  {...formik.getFieldProps('email')}/>
        <input type="password" placeholder="password" {...formik.getFieldProps('password')}/>
        Remember me
        <input type="checkbox" {...formik.getFieldProps('rememberMe')} />
        <button type="submit">Login</button>
    </form>
}