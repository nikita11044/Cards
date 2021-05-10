import axios from 'axios'
import {CardPackType} from "../features/PacksTable/Pack/packs-reducer";
import {CardType} from "../features/CardsTable/Card/cards-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const loginAPI = {
    login(loginParams: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', loginParams)
    },
    me() {
        return instance.post<any>('auth/me')
    },
    logout() {
        return instance.delete<any>('auth/me')
    }
}

export const passwordAPI = {
    recover(email: string, from: string) {
        return instance.post<PassportRecoveryResponseType>('auth/forgot', {
            email,
            from,
            message: `<div style="background-color: lime; padding: 15px">error: string;password recovery link:<a href='https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$'></a>link</a></div>`
        })
    }
}

export const signUpAPI = {
    register(email: string, password: string) {
        return instance.post<SignUpResponseType>('auth/register', {email, password})
    }
}

export const packsAPI = {
    getPacks(getPacksParams: GetPacksParamsType) {
        const {
            max,
            min,
            packName,
            page,
            pageCount,
            user_id
        } = getPacksParams
        return instance.get<GetPacksResponseType>(`cards/pack?${packName}&${min}&${max}&${page}&${pageCount}&${user_id}`)
    },
    addPack(newPack: AddPackParamsType) {
        return instance.post('cards/pack', {cardsPack: newPack})
    },
    updatePack(updatedPackData: UpdatePackParamsType) {
        return instance.put('cards/pack', updatedPackData)
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    }
}

export const cardsAPI = {
    getCards(getCardsParams: GetCardsParamsType) {
        const {
            cardAnswer,
            cardPack_id,
            cardQuestion,
            max,
            min,
            page,
            pageCount
        } = getCardsParams
        return instance.get<GetCardsResponseType>(`cards/card?${cardPack_id}&${cardQuestion}&${cardAnswer}&${min}&${max}&${page}&${pageCount}`)
    },
    addCard(newCard: AddCardParamsType) {
        return instance.post('cards/card', newCard)
    },
    updateCard(updatedCardData: UpdateCardParamsType) {
        return instance.put('cards/card', updatedCardData)
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/cars?id=${cardId}`)
    }
}

// * Types

// ** loginAPI Types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

// ** passwordAPI Types

type PassportRecoveryResponseType = {
    info: string,
    error: string
}

// ** signUpAPI Types

type SignUpResponseType = {
    addedUser: any,
    error?: string
}

// ** packsAPI Types

export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
    user_id?: string
}

export type GetPacksResponseType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type AddPackParamsType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: number
    private?: boolean
}

export type UpdatePackParamsType = {
    _id: string
    name?: string
}

// ** cardsAPI Types

export type GetCardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardPack_id: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type AddCardParamsType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardParamsType = {
    _id: string
    cardsPack_id: string
    question?: string
    comments?: string
}