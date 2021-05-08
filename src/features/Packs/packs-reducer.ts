import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddPackParamsType, GetPacksParamsType, packsAPI, UpdatePackParamsType} from "../../api/api";
import {Dispatch} from "redux";

const initialState: Array<CardPackType> = []

const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setCardPacks(state, action: PayloadAction<{cardPacks: CardPackType[]}>) {
            return action.payload.cardPacks.map(pack => ({...pack}))
        }
    }
})

export const packsReducer = slice.reducer

export const {setCardPacks} = slice.actions

// * Thunks

export const fetchPacksTC = (getPacksParams: GetPacksParamsType) => (dispatch: Dispatch) => {
    packsAPI.getPacks(getPacksParams)
        .then(response => {
            dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
        })
}

export const addPackTC = (newPack: AddPackParamsType) => () => {
    packsAPI.addPack(newPack)
        .then(() => {
            fetchPacksTC({})
        })
}

export const updatePackTC = (updatedPackData: UpdatePackParamsType) => () => {
    packsAPI.updatePack(updatedPackData)
        .then(() => {
            fetchPacksTC({})
        })
}

export const deletePackTC = (packId: string) => () => {
    packsAPI.deletePack(packId)
        .then(() => {
            fetchPacksTC({})
        })
}

// * Types

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: 'pack' | 'folder'
    created: string
    updated: string
    __v: number
}