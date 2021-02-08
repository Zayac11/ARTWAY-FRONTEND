import React from 'react';
import s from './BackBtn.module.css'
import prev from "../../assets/images/left-chevron.svg";
import desktop_arrow from "../../assets/images/arrow_back_blue.svg";

const BackBtn = (props) => {
    return (
        <button onClick={() => props.history.goBack()} className={'backBtn'}>
            <img className={'prev'} src={prev} alt="back"/>
            <img className={'arrow'} height={20} src={desktop_arrow} alt="back"/>
        </button>
    );
}

export default BackBtn;
