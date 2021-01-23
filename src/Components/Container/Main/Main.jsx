import React from 'react';
import s from './Main.module.css'
import mirea from './../../../assets/images/group-10.svg'
import gerb from './../../../assets/images/MIREA_Gerb_Colour.png'
import logo from './../../../assets/images/group-2.svg'
import scan from './../../../assets/images/scan.svg'
import play from './../../../assets/images/play.svg'
import Step from "./Step/Step";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import BlackButton from "../../../Common/BlackButton/BlackButton";
import {NavLink} from "react-router-dom";

const Main = (props) => {
    return (
        <div className={s.main}>
            <div className={`blueBlur blur`}></div>
            <div className={`orangeBlur blur`}></div>
            <div className={s.logoContainer}>
                <img src={gerb} alt="MIREA"/>
                <img src={mirea} alt="MIREA"/>
            </div>
            <div className={s.nameContainer}>
                <img src={logo} alt="artway"/>
                <div className={s.name}>
                    — это сервис для просмотра
                </div>
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
            <div className={'links'}>
                <TransparentButton link={'/enter'} text='Ввести ID экспоната вручную' />
                <BlackButton link={`/scan`} text='Отсканировать qr-код' />
                {
                    props.isUserServiceAdmin &&
                    <BlackButton link={'/s-admin'} text='Админ сервиса' />
                }
                {
                    (props.isUserMuseumAdmin && props.isUserMuseumSuperAdmin) &&
                    <BlackButton link={`/m-admin`} text='Супер админ музея' />
                }
                {
                    (props.isUserMuseumAdmin && !props.isUserMuseumSuperAdmin) &&
                    <BlackButton link={`/m-admin`} text='Админ музея' />
                }
                {
                    props.isUserCashier &&
                    <BlackButton link={`/cashier`} text='Кассир' />
                }

                {
                    props.isTokenExists &&
                    <BlackButton link={`/locations`} text='Карта музея' />
                }

                {/*<BlackButton link={`/artifacts`} text='Просмотреть экспонаты' />*/}

                {/*<BlackButton link={`/test`} text='Go to test Component' />*/}

                <NavLink to={'/login'} className={'create'} onClick={props.logout}>
                    Войти
                </NavLink>
                <button onClick={props.logout}>
                    Выйти
                </button>

            </div>

        </div>
    );
}

export default Main;
