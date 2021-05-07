import React from "react"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";
import {PATHS} from "../../api/PATHS";

export const Profile: React.FC = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.avatar)

    if (!isLoggedIn) {
        return <Redirect to={PATHS.login}/>
    }

    return <div>
        Avatar: {avatar}
        Name: {name}
    </div>
}