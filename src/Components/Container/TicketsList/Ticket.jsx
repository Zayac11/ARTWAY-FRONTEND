import React from 'react';
import s from './TicketsList.module.css'
import next from "../../../assets/images/inCard.svg";

const Ticket = (props) => {
    return (
        <a href={props.pdf} target={'_blank'} rel="noreferrer noopener" className={s.ticketItem}>
            <div className={s.id}>
                Билет № {props.id}
            </div>
            <div className={s.time}>
                Дата создания:
                <span> {getDay(props.date_day)}.</span>
                <span>{getDay(props.date_month)}.</span>
                <span>{getDay(props.date_year)}</span>
                <span> {getDay(props.date_hour)}:</span>
                <span>{getDay(props.date_minute)}:</span>
                <span>{getDay(props.date_second)}</span>

            </div>
            <img src={next} alt="go inside" className={s.btn}/>
        </a>
    );
}

export default Ticket;

export const getDay = (props) => {

    if(props / 10 < 1) {
        return '0' + props
    }
    else {
        return props
    }
}
