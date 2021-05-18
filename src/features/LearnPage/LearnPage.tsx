import {CardType, fetchCardsTC} from "../CardsTable/Card/cards-reducer";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core";
import {UpdatePackForm} from "../PacksTable/UpdatePackForm/UpdatePackForm";
import {LearnCardModal} from "./LearnCardModal/LearnCardModal";
import {AppRootStateType} from "../../app/store";

type LearnPageParamsType = {
    packId: string
}

export const LearnPage: React.FC = () => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const {packId} = useParams<LearnPageParamsType>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC({cardPack_id: packId}))
    }, [])

    const pack = useSelector<AppRootStateType, CardType[]>(state => state.cards[packId])

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <LearnCardModal pack={pack} modalCloseHandler={handleClose}/>
        </div>
    );

    return <>
        <h3>Ready to learn?</h3>
        <button onClick={handleOpen}>YES!</button>
        <button>Nope</button>
        <Modal open={open} onClose={handleClose}>
            {body}
        </Modal>
    </>
}