import React from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";
import {updateCardTC} from "../Card/cards-reducer";

type UpdateCardFormPropsType = {
    _id: string
    cardPack_id: string
    modalCloseHandler?: () => void
}

export const UpdateCardForm: React.FC<UpdateCardFormPropsType> = ({_id, cardPack_id, modalCloseHandler}) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        validate: values => {
            const errors = {} as FormikErrorsType
            if (values.question.length > 100) {
                errors.question = 'Question is too long'
            }
            if (values.answer.length > 100) {
                errors.answer = 'Answer is too long'
            }
        },
        onSubmit: values => {
            console.log(values)
            const {answer, question} = values
            dispatch(updateCardTC({cardPack_id, answer, question}))
            formik.resetForm()
            if (modalCloseHandler) {
                modalCloseHandler()
            }
        }
    })


    return <div style={{marginTop: '20px'}}>
        <h3>Add card</h3>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"Enter question"} error={formik.errors.question} {...formik.getFieldProps("question")} />
            <InputText placeholder={"Enter answer"} error={formik.errors.answer} {...formik.getFieldProps("answer")} />
            <Button type="submit">Add card</Button>
        </StyledForm>
    </div>
}

type FormikErrorsType = {
    question: string
    answer: string
}