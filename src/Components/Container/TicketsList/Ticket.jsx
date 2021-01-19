import React from 'react';
import s from './TicketsList.module.css'

const Ticket = (props) => {
    return (
        <a href={props.pdf} target={'_blank'} rel="noreferrer noopener" className={s.ticketItem}>
            <div>
                Билет №: {props.id}
            </div>
            <div>
                Был создан: {props.created_at}
            </div>
        </a>
    );
}

export default Ticket;
