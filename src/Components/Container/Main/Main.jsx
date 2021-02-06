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
