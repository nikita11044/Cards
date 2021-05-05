import React from "react";
import classes from './Preloader.module.css'

export const Preloader: React.FC = () => {
    return <div className={classes.preloader}>
        <div></div>
        <div></div>
    </div>
}