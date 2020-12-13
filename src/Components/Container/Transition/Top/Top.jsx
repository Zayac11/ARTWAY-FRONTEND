import React from 'react';
import s from './Top.module.css'
import enterPhone from './../../../../assets/images/enterPhone.svg'

const Top = (props) => {
        return (
            <div className={s.enter}>
                <div className={s.phoneContainer}>
                    <img src={enterPhone} alt="phone"/>
                </div>
            </div>
        );
    }

export default Top
