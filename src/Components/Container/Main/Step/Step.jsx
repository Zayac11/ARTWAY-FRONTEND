import React from 'react';
import s from './Step.module.css'

const Step = (props) => {
    return (
        <>
            <div className={s.step}>
                <div className={s.pointOuter}>
                    <div className={s.pointInner}>

                    </div>
                </div>
                <div className={s.stepText}>
                    {props.text}
                </div>
            </div>
            <div className={s.phoneIcon}>
                <img src={props.img} alt="phone"/>
            </div>
        </>
    );
}

export default Step;
