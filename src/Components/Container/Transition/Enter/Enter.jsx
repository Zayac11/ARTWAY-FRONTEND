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
                        <input onChange={props.handleChange} onFocus={props.handleFocus} type="text" placeholder={'1'} value={props.artifactId} name={'artifactId'}/>
                    </div>
                </div>

                {
                    props.isArtifactError &&
                        <div className={'form__wrong'}>
                            Экспонат не найден
                        </div>
                }

            </div>
            <div className={'buttonContainer'}>
                {
                    !props.isArtifactDigit
                    ?
                        <div className={'form__wrong'}>
                            Пожалуйста, введите корректный номер
                        </div>
                    :
                         props.artifactId !== ''
                             ? <BlueButton type={'link'} link={`/artifacts/${props.artifactId}`} text='Перейти к экспонату' />
                             : <BlueButton type={'btn'} handleSubmit={() => {}} text='Перейти к экспонату' />
                }

            </div>
        </>
    );
}

export default Enter;
