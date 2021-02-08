import React from 'react';
import s from './Enter.module.css'
import BlueButton from "../../../../Common/BlueButton/BlueButton";
import {NavLink} from "react-router-dom";
import prev from "../../../../assets/images/left-chevron.svg";
import desktop_arrow from "../../../../assets/images/arrow_back_blue.svg";

const Enter = (props) => {
    return (
        <>
            <div className={s.enter}>
                <div className={s.top}>
                    <NavLink to={'/'} className={'backBtn'}>
                        <img className={'prev'} src={prev} alt="back"/>
                        <img className={'arrow'} height={20} src={desktop_arrow} alt="back"/>
                    </NavLink>
                    <div className={s.title}>
                        Введите номер экспоната
                    </div>
                </div>
                <div className={s.inputContainer}>
                    <div className={s.input}>
                        <input onChange={props.handleChange} onFocus={props.handleFocus} type="number" placeholder={'1'} value={props.artifactId} name={'artifactId'}/>
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
