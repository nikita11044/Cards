import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
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
        }
    }
})

export const learnReducer = slice.reducer

export const {setAnswerCorrect, setDisplayAnswer} = slice.actions

// * Types

type InitialStateType = {
    answerCorrect: boolean | undefined
    displayAnswer: boolean | undefined
}