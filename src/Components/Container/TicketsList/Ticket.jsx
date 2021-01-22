import React from 'react';
import s from './TicketsList.module.css'

const Ticket = (props) => {
    return (
        <a href={props.pdf} target={'_blank'} rel="noreferrer noopener" className={s.ticketItem}>
            <div className={s.id}>
                Билет №: {props.id}
            </div>
            <div className={s.time}>
                Был создан: {props.created_at}
            </div>
        </a>
    );
}

export default Ticket;
