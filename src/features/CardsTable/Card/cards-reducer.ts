import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setCardPacks} from "../../PacksTable/Pack/packs-reducer";
import {AddCardParamsType, cardsAPI, GetCardsParamsType, UpdateCardParamsType} from "../../../api/api";
import {Dispatch} from "redux";

const initialState: InitialStateType = {}

const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setCards(state, action: PayloadAction<{cards: CardType[], cardsPack_id: string}>) {
            state[action.payload.cardsPack_id] = action.payload.cards
        }
    },
    extraReducers: builder => {
        builder.addCase(setCardPacks, (state, action) => {
            action.payload.cardPacks.forEach(pack => {
                state[pack._id] = []
            })
        })
    }
})

export const cardsReducer = slice.reducer

export const {setCards} = slice.actions

// * Thunks

export const fetchCardsTC = (getCardsParams: GetCardsParamsType) => (dispatch: Dispatch) => {
    cardsAPI.getCards(getCardsParams)
        .then(response => {
            dispatch(setCards({cards: response.data.cards, cardsPack_id: getCardsParams.cardPack_id}))
        })
}

export const addCardTC = (newCard: AddCardParamsType) => () => {
    cardsAPI.addCard(newCard)
        .then(() => {
            fetchCardsTC({cardPack_id: newCard.cardsPack_id})
        })
}

export const updateCardTC = (updatedCardData: UpdateCardParamsType) => () => {
    cardsAPI.updateCard(updatedCardData)
        .then(() => {
            fetchCardsTC({cardPack_id: updatedCardData.cardsPack_id})
        })
}

export const deleteCardTC = (cardId: string, cardsPack_id: string) => () => {
    cardsAPI.deleteCard(cardId)
        .then(() => {
            fetchCardsTC({cardPack_id: cardsPack_id})
        })
}

// * Types

type InitialStateType = {
    [key: string]: Array<CardType>
}

export type CardType = {
    answer: string
    question: string
    cardPack_id: string
    grade: number
    rating: number
    shots: number
    type: 'card'
    user_id: string
    created: string
    updated: string
    _id: string
}