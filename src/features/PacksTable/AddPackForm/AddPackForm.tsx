import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";
import React from "react";
import {StyledForm} from "../../../components/StyledForm";
import {useFormik} from "formik";
import {addPackTC, fetchPacksTC} from "../Pack/packs-reducer";
import {useDispatch} from "react-redux";

export const AddPackForm: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validate: values => {
            const errors = {} as FormikErrorsType
            if (!values.name) {
                errors.name = 'Name required'
            }
            if (values.name.length > 100) {
                errors.name = 'Name is too long'
            }
        },
        onSubmit: values => {
            console.log(values)
            dispatch(addPackTC(values))
            formik.resetForm()
        }
    })


    return <div style={{marginTop: '20px'}}>
        <h3>Add pack</h3>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"name"} error={formik.errors.name} {...formik.getFieldProps("name")} />
            <Button type="submit">Add pack</Button>
        </StyledForm>
    </div>
}

type FormikErrorsType = {
    name?: string
}

