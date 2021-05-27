import React, {ChangeEvent, useRef} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {updateCardTC} from "../Card/cards-reducer";
import { Button } from "@material-ui/core";

type UpdateCardFormPropsType = {
    _id: string
    cardsPack_id: string
    modalCloseHandler?: () => void
}

export const UpdateCardForm: React.FC<UpdateCardFormPropsType> = ({_id, cardsPack_id, modalCloseHandler}) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            questionImg: '',
            answerImg: '',
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
            const {answer, question, questionImg, answerImg} = values
            dispatch(updateCardTC({
                _id,
                cardsPack_id,
                answer,
                question,
                questionImg,
                answerImg
            }))
            formik.resetForm()
            if (modalCloseHandler) {
                modalCloseHandler()
            }
        }
    })

    const createFileURL = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0]

        if (newFile) {
            formik.values[e.target.id as 'questionImg' | 'answerImg'] = window.URL.createObjectURL(newFile)
        }
    }


    return <div style={{marginTop: '20px'}}>
        <h3>Update card</h3>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"Enter question"} error={formik.errors.question} {...formik.getFieldProps("question")} />
            <InputText placeholder={"Enter answer"} error={formik.errors.answer} {...formik.getFieldProps("answer")} />
            <Button variant="contained" component="label">
                Upload Question IMG
                <input
                    id='questionImg'
                    type="file"
                    hidden
                    onChange={createFileURL}
                />
            </Button>
            <Button variant="contained" component="label">
                Upload Answer IMG
                <input
                    id='answerImg'
                    type="file"
                    hidden
                    onChange={createFileURL}
                />
            </Button>
            <Button type="submit">Update card</Button>
        </StyledForm>
    </div>
}

type FormikErrorsType = {
    question: string
    answer: string
}