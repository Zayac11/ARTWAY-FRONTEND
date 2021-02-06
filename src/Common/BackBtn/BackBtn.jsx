import React from 'react';
import s from './BackBtn.module.css'
import prev from "../../assets/images/left-chevron.svg";

const BackBtn = (props) => {
    return (
        <button onClick={() => props.history.goBack()} className={s.backBtn}>
            <img src={prev} alt="back"/>
        </button>
    );
}

export default BackBtn;
