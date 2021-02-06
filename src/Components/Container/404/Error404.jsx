import React from 'react';
import s from './Error404.module.css'
import cancel from '../../../assets/images/ticket_canceled.svg'
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";

const TicketCanceled = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.info}>
                    <TopContainer isTicketCanceled={true} />

                    <div className={s.imageContainer}>
                        <img src={cancel} alt="error 404 not found"/>
                    </div>

                    <div className={'emptyLocations'}>
                        Страница не найдена
                    </div>

                    <div className={'buttonContainer'}>
                        <BlueButton type={'link'} link={'/'} text={'На главную'} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TicketCanceled;
