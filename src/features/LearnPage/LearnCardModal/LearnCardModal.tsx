import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {updatePackTC} from "../../PacksTable/Pack/packs-reducer";
import {StyledForm} from "../../../components/StyledForm";
import {InputText} from "../../../components/InputText";
import {Button} from "../../../components/Button";
import React, {useEffect, useState} from "react";
import {CardType} from "../../CardsTable/Card/cards-reducer";
import {setAnswerCorrect, setCardToLearn, setDisplayAnswer, updateGradeTC} from "../learn-reducer";
import {AppRootStateType} from "../../../app/store";

type LearnCardModalPropsType = {
    pack: CardType[]
    modalCloseHandler: () => void
}

export const LearnCardModal: React.FC<LearnCardModalPropsType> = ({pack, modalCloseHandler}) => {

    const card_id = useSelector<AppRootStateType, string>(state => state.learn.card_id)
    const answerCorrect = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.answerCorrect)
    const displayAnswer = useSelector<AppRootStateType, boolean | undefined>(state => state.learn.displayAnswer)
    const question = useSelector<AppRootStateType, string>(state => state.learn.question)
    const answer = useSelector<AppRootStateType, string>(state => state.learn.answer)
    const questionImg = useSelector<AppRootStateType, string | undefined>(state => state.learn.questionImg)
    const answerImg = useSelector<AppRootStateType, string | undefined>(state => state.learn.answerImg)


    const grades = [`didn't know`, 'knew badly', 'kinda knew', 'knew well', 'knew perfectly well']

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
        dispatch(setCardToLearn(card))
    }

    const updateGradeHandler = (grade: number) => {
        dispatch(updateGradeTC(card_id, grade))
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
        return <div style={{marginTop: '20px'}}>
            <h3>{answerCorrect && "Success!!!" || "Failure"}</h3>
            {answerImg && <img src={answerImg} style={ {maxWidth: '200px'} }/>}
            <Button onClick={() => {
                pickCard(pack)
                dispatch(setDisplayAnswer(false))
            }
            }>Continue?</Button>
            {
                answerCorrect
                && grades.map((gr, index) => {
                    if (index >= 1) return <button onClick={() => updateGradeHandler(index + 1)}>{gr}</button>
                })
                || grades.map((gr, index) => {
                    if (index <= 1) return <button onClick={() => updateGradeHandler(index + 1)}>{gr}</button>
                })
            }
            <Button onClick={() => {
                modalCloseHandler()
                dispatch(setDisplayAnswer(false))
            }}>Finish</Button>
        </div>
    }

    return <div style={{marginTop: '20px'}}>
        <h3>The question is as follows...</h3>
        {questionImg && <img src={questionImg} style={ {maxWidth: '200px'} }/>}
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
