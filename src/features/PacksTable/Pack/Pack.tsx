import React from "react";
import {Button} from "../../../components/Button";
import {useDispatch} from "react-redux";
import {deletePackTC} from "./packs-reducer";

type PackPropsType = {
    packId: string
    name: string
    cardsCount: number
    updated: string
}

export const Pack: React.FC<PackPropsType> = ({packId, name, cardsCount, updated}) => {

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deletePackTC(packId))
    }

    return <tr>
        <td>{name}</td>
        <td>{cardsCount}</td>
        <td>{updated}</td>
        <td>
            <button onClick={deleteHandler}>Delete</button>
        </td>
    </tr>
}