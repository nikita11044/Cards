import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {AddPackParamsType, GetPacksParamsType, packsAPI, UpdatePackParamsType} from "../../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {setProfile} from "../../Profile/profile-reducer";

const initialState: Array<CardPackType> = []

const slice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setCardPacks(state, action: PayloadAction<{ cardPacks: CardPackType[] }>) {
            return action.payload.cardPacks.map(pack => ({...pack}))
        }
    }
})

export const packsReducer = slice.reducer

export const {setCardPacks} = slice.actions

// * Thunks

export const fetchPacksTC = (getPacksParams: GetPacksParamsType): ThunkType => (dispatch: Dispatch) => {
    packsAPI.getPacks(getPacksParams)
        .then(response => {
            dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
        })
}

export const addPackTC = (newPack: AddPackParamsType): ThunkType => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsAPI.addPack(newPack)
        .then(() => {
            const packUser_id = getState().profile._id
            return packsAPI.getPacks({user_id: packUser_id})
        })
        .then(response => {
            dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
        })
}

export const updatePackTC = (updatedPackData: UpdatePackParamsType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsAPI.updatePack(updatedPackData)
        .then(() => {
            const packUser_id = getState().profile._id
            return packsAPI.getPacks({user_id: packUser_id})
        })
        .then(response => {
            dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
        })
}

export const deletePackTC = (packId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsAPI.deletePack(packId)
        .then((res) => {
            const packUser_id = getState().profile._id
            return packsAPI.getPacks({user_id: packUser_id})
        })
        .then(response => {
            dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
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

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

type ActionTypes = SliceActions<typeof slice.actions>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionTypes>