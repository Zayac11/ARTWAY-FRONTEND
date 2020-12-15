import React from 'react';
import s from './QrCode.module.css'

const QrCode = (props) => {
    return (
        <div className={s.qrContainer}>
            <button onClick={() => {props.history.goBack()}} className={s.backBtn}>
                Кнопка назад
            </button>
            <div className={s.name}>
                {props.name} - {props.id}
            </div>

            <img src={props.artifactQr} alt="qr code"/>

            <a download href={props.artifactQr} >Скачать</a>
        </div>
    );
}

export default QrCode;
