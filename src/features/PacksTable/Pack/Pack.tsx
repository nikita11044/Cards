import React from "react";

type PackPropsType = {
    name: string
    cardsCount: number
    updated: string
}

export const Pack: React.FC<PackPropsType> = ({name, cardsCount, updated}) => {
    return <tr>
        <td>{name}</td>
        <td>{cardsCount}</td>
        <td>{updated}</td>
    </tr>
}