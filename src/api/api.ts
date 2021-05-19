import axios from 'axios'
import {CardPackType} from "../features/PacksTable/Pack/packs-reducer";
import {CardType} from "../features/CardsTable/Card/cards-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const loginAPI = {
    login(loginParams: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', {...loginParams})
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
            user_id
        } = getPacksParams
        return instance.get<GetPacksResponseType>(`cards/pack?pageCount=1000&page=4&user_id=${user_id}&sortPacks=0updated`)
    },
    addPack(newPack: AddPackParamsType) {
        return instance.post('cards/pack', {cardsPack: newPack})
    },
    updatePack(updatedPackData: UpdatePackParamsType) {
        return instance.put('cards/pack', {cardsPack: updatedPackData})
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    }
}

export const cardsAPI = {
    getCards(getCardsParams: GetCardsParamsType) {
        const {
            cardsPack_id
        } = getCardsParams
        return instance.get<GetCardsResponseType>(`cards/card?`
            + `cardsPack_id=${cardsPack_id}`
        )
    },
    addCard(newCard: AddCardParamsType) {
        return instance.post('cards/card', {card: newCard})
    },
    updateCard(updatedCardData: UpdateCardParamsType) {
        return instance.put('cards/card', {card: updatedCardData})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    }
}

export const learningAPI = {
    updateGrade(grade: number, card_id: string) {
        return instance.put<UpdatedGradeResponseType>('cards/grade', {grade, card_id})
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

export type TypeCards = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    _id: string
}
export type TypeResponsePacks = {
    cardPacks: TypeCards[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
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
    cardsPack_id: string
    min?: number
    max?: number
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
    cardPack_id: string
    question?: string
    answer?: string
}

type UpdatedGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}