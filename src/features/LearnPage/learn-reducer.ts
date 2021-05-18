import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    question: '',
    answer: '',
    answerCorrect: undefined,
    displayAnswer: undefined
}

const slice = createSlice({
    name: 'learn',
    initialState: initialState,
    reducers: {
        setAnswerCorrect(state, action: PayloadAction<boolean | undefined>) {
            state.answerCorrect = action.payload
        },
        setDisplayAnswer(state, action: PayloadAction<boolean | undefined>) {
            state.displayAnswer = action.payload
        },
        setQuestionAndAnswer(state, action: PayloadAction<{ question: string, answer: string }>) {
            state.question = action.payload.question
            state.answer = action.payload.answer
        }
    }
})

export const learnReducer = slice.reducer

export const {
    setAnswerCorrect,
    setDisplayAnswer,
    setQuestionAndAnswer
} = slice.actions

// * Types

type InitialStateType = {
    question: string
    answer: string
    answerCorrect: boolean | undefined
    displayAnswer: boolean | undefined
}