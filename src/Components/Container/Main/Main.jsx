import React from 'react';
import s from './Main.module.css'
import main from './../../../assets/images/main_picture.svg'
import enter from './../../../assets/images/enter_id.svg'
import map from './../../../assets/images/map.svg'
import scan from './../../../assets/images/qr_code_scan.svg'
import {NavLink} from "react-router-dom";
import TopContainer from "../../../Common/Top/TopContainer";

const Main = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.main}>

                    {/*<div className={s.logoContainer}>*/}
                    {/*    <img src={gerb} alt="MIREA"/>*/}
                    {/*    <img src={mirea} alt="MIREA"/>*/}
                    {/*</div>*/}

                    {/*<div className={s.nameContainer}>*/}
                    {/*    <img src={logo} alt="artway"/>*/}
                    {/*    <div className={s.name}>*/}
                    {/*        — это сервис для просмотра*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={s.name}>*/}
                    {/*    экспонатов музеев, выставок или экскурсий*/}
                    {/*</div>*/}
                    {/*<h3 className={s.principe}>*/}
                    {/*    Как это работает?*/}
                    {/*</h3>*/}
                    {/*<Step img={scan} text='Перейдите к сканированию qr-кода выбранного экспоната или введите его ID' />*/}
                    {/*<Step img={play} text='На странице экспоната Вы сможете просмотреть информацию о нём и запустить аудиогид' />*/}
                    {/*<div className={s.step}>*/}
                    {/*    <div className={s.pointOuter}>*/}
                    {/*        <div className={s.pointInner}>*/}

                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.stepText}>*/}
                    {/*        Любите искусство вместе с*/}
                    {/*        <span className={s.art} > art</span>*/}
                    {/*        <span className={s.way}>way</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <TopContainer />

                    <div className={s.imageContainer}>
                        <img src={main} alt="enjoy"/>
                    </div>

                    <h1 className={s.title}>
                        Привет, это art<span>way</span>
                    </h1>

                    <h2 className={s.subtitle}>
                        Сервис для удобного просмотра<br/>экспонатов музея, выставок или экскурсий
                    </h2>

                    <div className={s.linksContainer}>
                        <div className={s.links}>
                            <div className={s.buttonContainer}>
                                <NavLink to={'/enter'}><img src={enter} alt="enter id"/></NavLink>
                                <div className={s.text}>Ввести ID</div>
                            </div>
                            <div className={s.buttonContainer}>
                                <NavLink to={'/locations'}><img src={map} alt="enter id"/></NavLink>
                                <div className={s.text}>Карта музея</div>
                            </div>
                            <div className={s.scanButton}>
                                <NavLink to={'/scan'}><img src={scan} alt="scan qr"/></NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Main;


{/*<TransparentButton type={'link'} link={'/enter'} text='Ввести ID экспоната вручную' />*/}
{/*<BlackButton link={`/scan`} text='Отсканировать qr-код' />*/}
{/*{*/}
{/*    props.isUserServiceAdmin &&*/}
{/*    <BlackButton link={'/s-admin'} text='Админ сервиса' />*/}
{/*}*/}
{/*{*/}
{/*    (props.isUserMuseumAdmin && props.isUserMuseumSuperAdmin) &&*/}
{/*    <BlackButton link={`/m-admin`} text='Супер админ музея' />*/}
{/*}*/}
{/*{*/}
{/*    (props.isUserMuseumAdmin && !props.isUserMuseumSuperAdmin) &&*/}
{/*    <BlackButton link={`/m-admin`} text='Админ музея' />*/}
{/*}*/}
{/*{*/}
{/*    props.isUserCashier &&*/}
{/*    <BlackButton link={`/cashier`} text='Кассир' />*/}
{/*}*/}

{/*{*/}
{/*    props.isTokenExists &&*/}
{/*    <BlackButton link={`/locations`} text='Карта музея' />*/}
{/*}*/}


{/*<NavLink to={'/login'} className={'create'} onClick={props.logout}>*/}
{/*    Войти*/}
{/*</NavLink>*/}
{/*<button onClick={props.logout}>*/}
{/*    Выйти*/}
{/*</button>*/}

