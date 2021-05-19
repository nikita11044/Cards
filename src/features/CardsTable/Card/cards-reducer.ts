import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setCardPacks} from "../../PacksTable/Pack/packs-reducer";
import {AddCardParamsType, cardsAPI, GetCardsParamsType, UpdateCardParamsType} from "../../../api/api";
import {errorHandler} from "../../../common/error-handler";
import {AppThunk} from "../../../app/store";
import {getMe} from "../../Profile/profile-reducer";

const initialState: InitialStateType = {}

const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCards(state, action: PayloadAction<{ cards: CardType[], cardsPack_id: string }>) {
            state[action.payload.cardsPack_id] = action.payload.cards
        }
    },
    extraReducers: builder => {
        builder.addCase(setCardPacks, (state, action) => {
            action.payload.cardPacks.forEach((pack: { _id: string | number; }) => {
                state[pack._id] = []
            })
        })
    }
})

export const cardsReducer = slice.reducer

export const {setCards} = slice.actions

// * Thunks

export const fetchCardsTC =  (getCardsParams: GetCardsParamsType): AppThunk => async (dispatch) => {
    try {
        await dispatch(getMe())
        const response = await cardsAPI.getCards(getCardsParams)
        dispatch(setCards({cards: response.data.cards, cardsPack_id: getCardsParams.cardsPack_id}))
    } catch (e) {
        errorHandler(e)
    }
}

export const addCardTC = (newCard: AddCardParamsType, cardPack_id: string): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.addCard(newCard)
        dispatch(fetchCardsTC({cardsPack_id: cardPack_id}))
    } catch (e) {
        errorHandler(e)
    }
}

export const updateCardTC = (updatedCardData: UpdateCardParamsType): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.updateCard(updatedCardData)
        dispatch(fetchCardsTC({cardsPack_id: updatedCardData.cardPack_id}))
    } catch (e) {
        errorHandler(e)
    }
}

export const deleteCardTC = (cardId: string, cardPack_id: string): AppThunk => async (dispatch) => {
    try {
        await cardsAPI.deleteCard(cardId)
        dispatch(fetchCardsTC({cardsPack_id: cardPack_id}))
    } catch (e) {
        errorHandler(e)
    }
}

// * Types

type InitialStateType = {
    [key: string]: Array<CardType>
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: 'card'
    user_id: string
    created: string
    updated: string
    _id: string
}

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type CardsActionTypes = SliceActions<typeof slice.actions>