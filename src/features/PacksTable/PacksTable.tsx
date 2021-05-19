import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CardPackType, fetchPacksTC} from "./Pack/packs-reducer";
import {Pack} from "./Pack/Pack";
import {AddPackForm} from "./AddPackForm/AddPackForm";
import SuperDoubleRange from "./SuperDoubleRange";
import Pagination from "./Pagination";
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import {getMe} from "../Profile/profile-reducer";
import {Redirect} from "react-router-dom";
import {PATHS} from "../../api/PATHS";

type TypeSort = 'max' | 'min' | 'middle';


export const PacksTable: React.FC = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const packUser_id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const packs = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs)
    const dispatch = useDispatch()
    //
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(10);
    //
    let [sortPacks, setSortPacks] = useState<TypeSort>("middle");

    useEffect(() => {
        dispatch(fetchPacksTC({user_id: packUser_id}))
    }, [])

    //const [pageCount, setPageCount] = useState<number>(10);

    const sortMax = () => {
        setSortPacks("max")
    }
    const sortMin = () => {
        setSortPacks("min")
    }

    if (!isLoggedIn) {
        return <Redirect to={PATHS.login}/>
    }

    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

        <div>
            <div>
                <span style={{fontSize: '20px', marginRight: '10px'}}>Search:</span>
                <input placeholder='Enter name' type="text"/>
            </div>
            <div>
                <div style={{fontWeight: 'bold', textAlign: 'center'}}>Filtering by the count of cards</div>
                <SuperDoubleRange setValue2={setValue2} setValue1={setValue1} max={value2} min={value1}/>
            </div>

            <div>
                <VerticalAlignTopIcon onClick={sortMax}/>
                <VerticalAlignBottomIcon onClick={sortMin}/>
            </div>

            <div>
                <Pagination/>
            </div>

        </div>
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <AddPackForm/>
        </div>
    </div>
}