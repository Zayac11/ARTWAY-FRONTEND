import React from 'react';
import s from './Top.module.css'
import enterPhone from './../../../../assets/images/enterPhone.svg'
import './../../../../Common/style.css'

const Top = (props) => {
        return (
            <div className={'blackTop'}>
                <div className={s.phoneContainer}>
                    <img src={enterPhone} alt="phone"/>
                </div>
            </div>
        );
    }

export default Top
