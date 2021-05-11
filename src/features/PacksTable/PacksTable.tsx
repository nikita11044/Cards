import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CardPackType, fetchPacksTC } from "./Pack/packs-reducer";
import {Pack} from "./Pack/Pack";
import {AddPackForm} from "./AddPackForm/AddPackForm";

export const PacksTable: React.FC = () => {

    const packUser_id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const packs = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPacksTC({user_id: packUser_id}))
    }, [])

    return <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} }>
        <table>
            <thead>
            <tr>
                <th>Pack name</th>
                <th>Cards count</th>
                <th>Updated</th>
            </tr>
            </thead>
            <tbody>
            {packs.length === 0 && 'Waiting for your cards —ฅ/ᐠ.̫ .ᐟ\\ฅ—'}
            {
                packs.map(pack => {
                    return <Pack
                        key={pack._id}
                        packId={pack._id}
                        name={pack.name}
                        cardsCount={pack.cardsCount}
                        updated={pack.updated}
                    />
                })
            }
            </tbody>
        </table>
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center'} }>
            <AddPackForm/>
        </div>
    </div>
}