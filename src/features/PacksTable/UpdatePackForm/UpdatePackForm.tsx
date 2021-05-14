import React from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {addPackTC, updatePackTC} from "../Pack/packs-reducer";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";

type UpdatePackFormType = {
    _id: string
    modalCloseHandler?: () => void
}

export const UpdatePackForm: React.FC<UpdatePackFormType> = ({_id, modalCloseHandler}) => {

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
            console.log({_id, ...values})
            dispatch(updatePackTC({_id, ...values}))
            if (modalCloseHandler) {
                modalCloseHandler()
            }
        }
    })

    return <div style={{marginTop: '20px'}}>
        <h3>Update pack</h3>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"Change name"} error={formik.errors.name} {...formik.getFieldProps("name")} />
            <Button type="submit">Update pack</Button>
        </StyledForm>
    </div>
}

type FormikErrorsType = {
    name?: string
}
