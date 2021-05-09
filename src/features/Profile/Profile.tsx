import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";
import {PATHS} from "../../api/PATHS";
import {logoutTC} from "../Login/auth-reducer";
import {getMe} from "./profile-reducer";

export const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.avatar)

    useEffect(() => {
        dispatch(getMe())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Redirect to={PATHS.login}/>
    }

    return <>
        <h2>Profile</h2>
        <div className="imgWrapper">
            <img src={avatar} alt="avatar"/>
        </div>
        <div>
            Name: {name}
        </div>
        {isLoggedIn && <button onClick={logoutHandler} >Logout</button>}
    </>
}
