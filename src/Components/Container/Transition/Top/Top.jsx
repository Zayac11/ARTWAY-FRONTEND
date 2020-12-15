import React from 'react';
import s from './Top.module.css'
import enterPhone from './../../../../assets/images/enterPhone.svg'
import scanPhone from "../../../../assets/images/scanPhone.svg";
import './../../../../Common/style.css'
import BackBtn from "../../../../Common/BackBtn/BackBtn";


const Top = (props) => {
        return (
            <div className={'blackTop'}>
                <BackBtn history={props.history} />
                <div className={s.phoneContainer}>
                    {
                        props.section === 'scan' ? <img src={scanPhone} alt="phone"/>
                                             : <img src={enterPhone} alt="phone"/>
                    }
                </div>
            </div>
        );
    }

export default Top
