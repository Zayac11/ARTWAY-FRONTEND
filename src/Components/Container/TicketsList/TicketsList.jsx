import React from 'react';
import s from './TicketsList.module.css'
import Ticket from "./Ticket";
import prev from "../../../assets/images/left-chevron.svg";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import TopContainer from "../../../Common/Top/TopContainer";

const TicketsList = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.tickets}>
                    <TopContainer isUserCashier={true} />
                    <div className={s.topContainer}>
                        <h2 className={'itemsTitle'}>
                            Список билетов
                        </h2>
                        <button onClick={() => props.history.goBack()} className={'backBtn'}>
                            <img src={prev} alt="back"/>
                        </button>
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
