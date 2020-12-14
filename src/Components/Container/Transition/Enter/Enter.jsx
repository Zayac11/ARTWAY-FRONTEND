import React from 'react';
import s from './Enter.module.css'
import '../../../../Common/style.css'
import BlackButton from "../../../../Common/BlackButton/BlackButton";
import Top from "../Top/Top";

const Enter = (props) => {
    return (
        <>
            <Top history={props.history} section={'enter'} />
            <div className={s.enter}>
                <div className={s.inputContainer}>
                    <div className={s.input}>
                        <input onChange={props.handleChange} type="text" placeholder={'1'} value={props.artifactId} name={'artifactId'}/>
                    </div>
                    <div className={s.text}>
                        Введите номер экспоната
                    </div>
                </div>
                <div className={'links'}>
                    <BlackButton artifactId={props.artifactId} link={`/artifact/${props.artifactId}`} text='Перейти к экспонату' />
                </div>
            </div>
        </>
    );
}

export default Enter;
