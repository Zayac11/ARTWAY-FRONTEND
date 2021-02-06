import React from 'react';
import s from './Information.module.css'
import BackBtn from "../../../Common/BackBtn/BackBtn";
import artSquare from "../../../assets/images/artsquare.svg";
import Step from "../Main/Step/Step";
import play from './../../../assets/images/play.svg'
import scan from './../../../assets/images/scan.svg'

const Information = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.info}>
                    <div className={s.top}>
                        <h2 className={'itemsTitle'}>
                            Информация
                        </h2>
                        <BackBtn history={props.history} />
                    </div>
                    <div className={s.artSquare}>
                        <img className={s.artImg} src={artSquare} alt="artSquare"/>
                        <span>art</span>
                        <span className={s.way}>way</span>
                        <span className={s.name}>
                            — это сервис для просмотра
                        </span>
                    </div>
                    <div className={s.name}>
                        экспонатов музеев, выставок или экскурсий
                    </div>
                    <h3 className={s.principe}>
                        Как это работает?
                    </h3>
                    <Step img={scan} text='Перейдите к сканированию qr-кода выбранного экспоната или введите его ID' />
                    <Step img={play} text='На странице экспоната Вы сможете просмотреть информацию о нём и запустить аудиогид' />
                    <div className={s.step}>
                        <div className={s.pointOuter}>
                            <div className={s.pointInner}>

                            </div>
                        </div>
                        <div className={s.stepText}>
                            Любите искусство вместе с
                            <span className={s.art} > art</span>
                            <span className={s.way}>way</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Information;
