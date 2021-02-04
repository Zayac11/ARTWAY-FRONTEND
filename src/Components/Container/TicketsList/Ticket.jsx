import React from 'react';
import s from './TicketsList.module.css'
import next from "../../../assets/images/inCard.svg";

const Ticket = (props) => {
    return (
        <a href={props.pdf} target={'_blank'} rel="noreferrer noopener" className={s.ticketItem}>
            <div className={s.id}>
                Билет №: {props.id}
            </div>
            <div className={s.time}>
                Дата создания: {props.created_at}
            </div>
            <img src={next} alt="go inside" className={s.btn}/>
        </a>
    );
}

export default Ticket;
