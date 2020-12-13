import React from 'react';
import s from './Enter.module.css'
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";
import BlackButton from "../../../../Common/BlackButton/BlackButton";

const Enter = (props) => {
    return (
        <div className={s.enter}>
            <div className={s.inputContainer}>
                <div className={s.input}>
                    <input onChange={props.handleChange} type="text" placeholder={'1'} value={props.artifactId} name={'artifactId'}/>
                </div>
                <div className={s.text}>
                    Введите номер экспоната
                </div>
            </div>
            <div className={s.links}>
                <TransparentButton link={'/'} text='Вернуться назад' />
                {
                    props.artifactId !== "" && <BlackButton link={`/artifact/${props.artifactId}`} text='Перейти к экспонату' />
                }
            </div>
        </div>
    );
}

export default Enter;
