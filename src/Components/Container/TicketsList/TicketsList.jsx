import React from 'react';
import s from './TicketsList.module.css'
import Ticket from "./Ticket";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import TopContainer from "../../../Common/Top/TopContainer";

const TicketsList = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.tickets}>
                    <TopContainer isUserCashier={true} />
                    <div className={'topContainer'}>
                        <h2 className={s.title}>
                            Список билетов
                        </h2>
                    </div>

                    <div className={s.ticketsContainer}>
                        {
                            props.tickets.map(t => {
                                return <Ticket key={t.id} id={t.id} pdf={t.pdf} created_at={t.created_at}  />
                            })
                        }
                    </div>
                </div>
                <div className={'buttonContainer'}>
                    <BlueButton type={'btn'} handleSubmit={props.createTicket} text={'Создать билет'} />
                </div>
            </div>
        </div>
    );
}

export default TicketsList
