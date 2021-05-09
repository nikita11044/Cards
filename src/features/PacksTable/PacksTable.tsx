import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CardPackType, fetchPacksTC } from "./Pack/packs-reducer";
import {Pack} from "./Pack/Pack";

export const PacksTable: React.FC = () => {

    const packs = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPacksTC({}))
    }, [])

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <table>
            <thead>
            <tr>
                <th>Pack name</th>
                <th>Cards count</th>
                <th>Updated</th>
            </tr>
            </thead>
            <tbody>
            {
                packs.map(pack => {
                    return <Pack
                        name={pack.name}
                        cardsCount={pack.cardsCount}
                        updated={pack.updated}
                    />
                })
            }
            </tbody>
        </table></div>
}