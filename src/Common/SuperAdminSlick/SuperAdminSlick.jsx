import React from 'react';
import s from './SuperAdminSlick.module.css'
import {NavLink} from "react-router-dom";

const SuperAdminSlick = (props) => {
    return (
        <div className={s.linkContainer}>
            <NavLink exact className={s.link} activeClassName={`${s.activeLeft} ${s.active}`} to={'/m-admin'}>Главная</NavLink>
            <NavLink exact className={s.link} activeClassName={`${s.activeRight} ${s.active}`} to={'/m-admin/hr-management'}>Персонал</NavLink>
        </div>
    );
}

export default SuperAdminSlick;
