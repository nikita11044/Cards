import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardType, fetchCardsTC} from "./Card/cards-reducer";
import {AppRootStateType} from "../../app/store";
import {Card} from "./Card/Card";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core";
import {AddCardForm} from "./AddCardForm/AddCardForm";

type CardsTableParamsType = {
    packId: string
}

export const CardsTable: React.FC = () => {

    const {packId} = useParams<CardsTableParamsType>()
    const dispatch = useDispatch()

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
            <AddCardForm cardsPack_id={packId} modalCloseHandler={handleClose}/>
        </div>
    );

    useEffect(() => {
        dispatch(fetchCardsTC({cardsPack_id: packId}))
    }, [])

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards[packId])

    return <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} }>
        <h3>Cards Table</h3>
        <button onClick={handleOpen}>Add card</button>
        <table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Question IMG</th>
                <th>Answer</th>
                <th>Answer IMG</th>
                <th>Grade</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
            {cards && cards.length === 0 && 'Waiting for your cards —ฅ/ᐠ.̫ .ᐟ\\ฅ—'}
            {
                cards && cards.map(card => {
                        return <Card
                            key={card._id}
                            _id={card._id}
                            cardsPack_id={card.cardsPack_id}
                            answer={card.answer}
                            answerImg={card.answerImg}
                            grade={card.grade}
                            question={card.question}
                            questionImg={card.questionImg}
                            rating={card.rating}
                            user_id={card.user_id}
                        />
                    })
            }
            </tbody>
        </table>
        <Modal open={open} onClose={handleClose}>
            {body}
        </Modal>
    </div>
}