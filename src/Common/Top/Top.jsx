import React from 'react';
import s from './Top.module.css'
import artSquare from "../../assets/images/artsquare.svg";
import {NavLink} from "react-router-dom";
import information from "../../assets/images/information-2-copy.svg";
import print from "../../assets/images/printing.svg";

const Top = (props) => {
    return (
        <div className={s.artContainer}>
            <div className={s.artSquare}>
                <img className={s.artImg} src={artSquare} alt="artSquare"/>
                <span>art</span>
                <span className={s.way}>way</span>
            </div>
            {
                props.isUserMuseumAdmin
                &&
                <div className={s.admin}>
                    <NavLink to={'/m-admin/print'}><img className={s.print} src={print} alt="print"/></NavLink>

                    <NavLink to={'/login'} className={s.logoutBtn}>Выйти</NavLink>
                </div>
            }

            {
                (props.isUserCashier || props.isUserServiceAdmin)
                &&
                <div className={s.admin}>
                    <NavLink to={'/login'} className={s.logoutBtn}>Выйти</NavLink>
                </div>
            }

            {
                !props.isTicketCanceled &&
                (!props.isUserMuseumAdmin && !props.isUserCashier && !props.isUserServiceAdmin) &&
                    <NavLink to={'/information'} className={'information'}>
                        <img src={information} alt="information"/>
                    </NavLink>
            }


        </div>
    );
}

export default Top;
