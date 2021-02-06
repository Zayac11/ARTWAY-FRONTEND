import React from 'react';
import s from './Enter.module.css'
import BlueButton from "../../../../Common/BlueButton/BlueButton";
import BackBtn from "../../../../Common/BackBtn/BackBtn";

const Enter = (props) => {
    return (
        <>
            <div className={s.enter}>
                <div className={s.top}>
                    <BackBtn history={props.history} />
                </div>
                <div className={s.title}>
                    Введите номер экспоната
                </div>
                <div className={s.inputContainer}>
                    <div className={s.input}>
                        <input onChange={props.handleChange} type="text" placeholder={'1'} value={props.artifactId} name={'artifactId'}/>
                    </div>
                </div>

            </div>
            <div className={s.buttonContainer}>
                <BlueButton type={'link'} link={`/artifacts/${props.artifactId}`} text='Перейти к экспонату' />
            </div>
        </>
    );
}

export default Enter;
