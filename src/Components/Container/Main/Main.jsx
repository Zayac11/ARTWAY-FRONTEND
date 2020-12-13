import React from 'react';
import s from './Main.module.css'
import mirea from './../../../assets/images/group-10.svg'
import logo from './../../../assets/images/group-2.svg'
import scan from './../../../assets/images/scan.svg'
import play from './../../../assets/images/play.svg'
import Step from "./Step/Step";
import {NavLink} from "react-router-dom";

const Main = (props) => {
    return (
        <div className={s.main}>
            <div className={`${s.blueBlur} ${s.blur}`}></div>
            <div className={`${s.orangeBlur} ${s.blur}`}></div>
            <div className={s.logoContainer}>
                <img src={mirea} alt="MIREA"/>
            </div>
            <div className={s.nameContainer}>
                <img src={logo} alt="artway"/>
                <div className={s.name}>
                    — это сервис для просмотра
                </div>
            </div>
            <div className={s.name}>
                экспонатов музея, выставок или экскурсий
            </div>
            <h3 className={s.principe}>
                Как это работает?
            </h3>
            <Step img={scan} text='Перейдите к сканированию qr-кода выбранного экспоната или введите его ID' />
            <Step img={play} text='На странице экспоната Вы можете просмотреть информацию о нём, запустить аудиогид или видео' />

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

            <NavLink className={`${s.idButton} ${s.button}`} to={'/enter'}>
                Ввести ID экспоната вручную
            </NavLink>
            <NavLink className={`${s.scanButton} ${s.button}`} to={'/scan'}>
                Отсканировать qr-код
            </NavLink>

        </div>
    );
}

export default Main;
