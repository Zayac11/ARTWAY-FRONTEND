import React from 'react';
import s from './Top.module.css'
import enterPhone from './../../../../assets/images/enterPhone.svg'
import scanPhone from "../../../../assets/images/scanPhone.svg";
import './../../../../Common/style.css'
import prev from "../../../../assets/images/next.svg";


const Top = (props) => {
        return (
            <div className={'blackTop'}>
                <button onClick={() => props.history.goBack()} className={s.backBtn}>
                    <img src={prev} alt="back"/>
                </button>
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
