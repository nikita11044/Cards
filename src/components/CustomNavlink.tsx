import React from "react";
import { NavLink } from "react-router-dom";

type CustomNavLinkPropsType = {
    to: string
    text: string
}

export const CustomNavLink: React.FC<CustomNavLinkPropsType> = ({to, text}) => {
    return <NavLink to={to}>{text}</NavLink>
}