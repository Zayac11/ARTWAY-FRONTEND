import React from 'react';
import s from './QrCode.module.css'
import prev from "../../../assets/images/next.svg";

const QrCode = (props) => {
    return (
        <div className={s.qrPage}>
            <div className={'blackTop'}>
                <div className={s.top}>
                    <button onClick={() => props.history.goBack()} className={s.backBtn}>
                        <img src={prev} alt="back"/>
                    </button>
                    <div className={s.name}>
                        {props.name}
                    </div>
                    <div></div>
                </div>

            </div>
            <div className={s.content}>
                <div className={s.qrContainer}>
                    <img src={props.artifactQr} alt="qr code"/>
                </div>

                <a className={s.download} download href={props.artifactQr} >Скачать</a>
            </div>

        </div>
    );
}

export default QrCode;
