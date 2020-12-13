import React from 'react';
import s from './Enter.module.css'
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";
import BlackButton from "../../../../Common/BlackButton/BlackButton";

const Enter = (props) => {
    return (
        <div className={s.enter}>
            <div className={s.inputContainer}>
                <div className={s.input}>
                    <input type="number" placeholder={'1'} name={'result'}/>
                </div>
                <div className={s.text}>
                    Введите номер экспоната
                </div>
            </div>
            <div className={s.links}>
                <TransparentButton link={'/'} text='Вернуться назад' />
                <BlackButton link={`/artifact/${props.id}`} text='Перейти к экспонату' />
            </div>
        </div>
    );
}

export default Enter;
