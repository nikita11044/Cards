import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType, fetchCardsTC} from "../CardsTable/Card/cards-reducer";
import {AppThunk} from "../../app/store";
import {learningAPI} from "../../api/api";

const initialState: InitialStateType = {
    card_id: '',
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
        setCardToLearn(state, action: PayloadAction<CardType>) {
            state.card_id = action.payload._id
            state.question = action.payload.question
            state.answer = action.payload.answer
        }
    }
})

export const learnReducer = slice.reducer

export const {
    setAnswerCorrect,
    setDisplayAnswer,
    setCardToLearn
} = slice.actions

// * Thunks

export const updateGradeTC = (card_id: string, grade: number): AppThunk => async (dispatch) => {
    const response = await learningAPI.updateGrade(grade, card_id)
    // console.log(response.data)
    const cardPack_id = response.data.updatedGrade.cardsPack_id
    dispatch(fetchCardsTC({cardsPack_id: cardPack_id}))
}

// * Types

type InitialStateType = {
    card_id: string
    question: string
    answer: string
    answerCorrect: boolean | undefined
    displayAnswer: boolean | undefined
}