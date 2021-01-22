import React from 'react';
import s from './TicketsList.module.css'
import Ticket from "./Ticket";

const TicketsList = (props) => {
    return (
        <div className={s.container}>
            <h1 className={s.title}>Список билетов</h1>
            <button className={'submit'} onClick={props.createTicket}>Создать билет</button>
            <div className={s.ticketsContainer}>
                {
                    props.tickets.map(t => {
                        return <Ticket key={t.id} id={t.id} pdf={t.pdf} created_at={t.created_at}  />
                    })
                }
            </div>
        </div>
    );
}

export default TicketsList
