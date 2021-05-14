import {createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {AddPackParamsType, GetPacksParamsType, packsAPI, UpdatePackParamsType} from "../../../api/api";
import {AppRootStateType, AppThunk} from "../../../app/store";
import {errorHandler} from "../../../common/error-handler";

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

export const fetchPacksTC = (getPacksParams: GetPacksParamsType): AppThunk => async (dispatch) => {
    try {
        const response = await packsAPI.getPacks(getPacksParams)
        dispatch(setCardPacks({cardPacks: response.data.cardPacks}))
    } catch (e) {
        errorHandler(e)
    }
}

export const addPackTC = (newPack: AddPackParamsType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    try {
        await packsAPI.addPack(newPack)
        const packUser_id = getState().profile._id
        dispatch(fetchPacksTC({user_id: packUser_id}))
    } catch (e) {
        errorHandler(e)
    }
}

export const updatePackTC = (updatedPackData: UpdatePackParamsType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    try {
        await packsAPI.updatePack(updatedPackData)
        const packUser_id = getState().profile._id
        dispatch(fetchPacksTC({user_id: packUser_id}))
    } catch (e) {
        errorHandler(e)
    }
}

export const deletePackTC = (packId: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    try {
        await packsAPI.deletePack(packId)
        const packUser_id = getState().profile._id
        dispatch(fetchPacksTC({user_id: packUser_id}))
    } catch (e) {
        errorHandler(e)
    }
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

export type PacksActionTypes = SliceActions<typeof slice.actions>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, PacksActionTypes>