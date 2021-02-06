import React from 'react';
import s from './TicketCanceled.module.css'
import TopContainer from "../../../Common/Top/TopContainer";
import cancel from '../../../assets/images/ticket_canceled.svg'

const TicketCanceled = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.info}>
                    <TopContainer isTicketCanceled={true} />

                    <div className={s.imageContainer}>
                        <img src={cancel} alt="ticket canceled"/>
                    </div>

                    <div className={'emptyLocations'}>
                        Срок действия билета истёк или вы его ещё не приобрели
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TicketCanceled;
