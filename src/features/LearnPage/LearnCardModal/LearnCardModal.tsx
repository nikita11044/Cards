import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {updatePackTC} from "../../PacksTable/Pack/packs-reducer";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";
import React, {useState} from "react";
import {CardType} from "../../CardsTable/Card/cards-reducer";
import {setAnswerCorrect, setDisplayAnswer} from "../learn-reducer";
import {AppRootStateType} from "../../../app/store";

type LearnCardModalPropsType = {
    card: CardType
    modalCloseHandler: () => void
}

export const LearnCardModal: React.FC<LearnCardModalPropsType> = ({card, modalCloseHandler}) => {

    const answerCorrect = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.answerCorrect)
    const displayAnswer = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.displayAnswer)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            answer: ''
        },
        validate: values => {
            const errors = {} as FormikErrorsType
            if (!values.answer) {
                errors.name = 'Answer required'
            }
        },
        onSubmit: values => {
            console.log({card, ...values})
            if (values.answer === card.answer) {
                console.log('success')
                dispatch(setAnswerCorrect(true))
            } else {
                console.log('failure')
                dispatch(setAnswerCorrect(false))
            }
            dispatch(setDisplayAnswer(true))
        }
    })

    if (displayAnswer) {
        return  <div style={{marginTop: '20px'}}>
            <h3>{ answerCorrect && "Success!!!" || "Failure" }</h3>
            <Button onClick={() => {
                dispatch(setDisplayAnswer(false))
            }
            }>Continue?</Button>
            <Button onClick={() => {
                modalCloseHandler()
                dispatch(setDisplayAnswer(false))
            }}>Finish</Button>
        </div>
    }

    return <div style={{marginTop: '20px'}}>
        <h3>The question is as follows...</h3>
        <p>{card.question}</p>
        <StyledForm onSubmit={formik.handleSubmit}>
            <InputText placeholder={"Enter your answer"}
                       error={formik.errors.answer} {...formik.getFieldProps("answer")} />
            <Button type="submit">Submit answer</Button>
        </StyledForm>
    </div>
}


type FormikErrorsType = {
    name?: string
}
