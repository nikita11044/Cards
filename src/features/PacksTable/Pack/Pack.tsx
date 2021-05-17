import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deletePackTC} from "./packs-reducer";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core";
import {UpdatePackForm} from "../UpdatePackForm/UpdatePackForm";
import {PATHS} from "../../../api/PATHS";
import {NavLink} from "react-router-dom";

type PackPropsType = {
    packId: string
    name: string
    cardsCount: number
    updated: string,
}

export const Pack: React.FC<PackPropsType> = ({packId, name, cardsCount, updated}) => {

    // Modal window code

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
            <UpdatePackForm _id={packId} modalCloseHandler={handleClose}/>
        </div>
    );

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deletePackTC(packId))
    }
    return <>

        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>
                <button type="button" onClick={deleteHandler}>Delete</button>
            </td>
            <td>
                <button type="button" onClick={handleOpen}>Update</button>
            </td>
            <td>
                <NavLink to={PATHS.cards + `/${packId}`}>cards</NavLink>
            </td>
            <td>
                <NavLink to={PATHS.learn + `/${packId}`}>learn</NavLink>
            </td>
        </tr>
        <Modal open={open} onClose={handleClose}>
            {body}
        </Modal>

    </>
}