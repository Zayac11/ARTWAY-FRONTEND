import React from 'react';
import s from './QrCode.module.css'

const Test = (props) => {
    return (
        <div className={s.qrContainer}>
            <button onClick={() => {props.history.goBack()}} className={s.backBtn}>
                Кнопка назад
            </button>
            <div className={s.name}>
                {props.name} - {props.id}
            </div>
            <img src={props.qr} alt="qr code"/>
            <a href="#" download>Скачать qr code</a>
        </div>
    );
}

export default Test;
