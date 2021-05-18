import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {updatePackTC} from "../../PacksTable/Pack/packs-reducer";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";
import React, {useEffect, useState} from "react";
import {CardType} from "../../CardsTable/Card/cards-reducer";
import {setAnswerCorrect, setDisplayAnswer, setQuestionAndAnswer} from "../learn-reducer";
import {AppRootStateType} from "../../../app/store";

type LearnCardModalPropsType = {
    pack: CardType[]
    modalCloseHandler: () => void
}

export const LearnCardModal: React.FC<LearnCardModalPropsType> = ({pack, modalCloseHandler}) => {

    const answerCorrect = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.answerCorrect)
    const displayAnswer = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.displayAnswer)
    const question = useSelector<AppRootStateType, string>(state => state.learn.question)
    const answer = useSelector<AppRootStateType, string>(state => state.learn.answer)

    const pickCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        const card = cards[res.id + 1]
        dispatch(setQuestionAndAnswer({ answer: card.answer, question: card.question }))
    }

    useEffect(() => {
        pickCard(pack)
    }, [pack])

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
            console.log({...values})
            if (values.answer === answer) {
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
                pickCard(pack)
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
        <p>{question}</p>
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
