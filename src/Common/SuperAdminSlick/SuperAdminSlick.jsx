import React from 'react';
import s from './SuperAdminSlick.module.css'
import {NavLink} from "react-router-dom";

const SuperAdminSlick = (props) => {

    // const [currentLink, setCurrentLink] = useState('')

    return (
        <div className={s.linkContainer}>
            <NavLink exact className={s.link} activeClassName={`${s.activeLeft} ${s.active}`} to={'/m-admin'}>Главная</NavLink>
            <NavLink exact className={s.link} activeClassName={`${s.activeRight} ${s.active}`} to={'/m-admin/hr-management'}>Персонал</NavLink>
        </div>
    );
}

export default SuperAdminSlick;

// <div className={s.linkContainer}>
//     <NavLink onClick={() => setCurrentLink('main')} exact className={`${s.link} ${currentLink === '' && s.active} ${currentLink === 'main' && `${s.active} ${s.activeLeft}`}`} to={'/m-admin'}>Главная</NavLink>
//     <NavLink onClick={() => setCurrentLink('manage')} exact className={`${s.link} ${currentLink === 'manage' && `${s.active} ${s.activeRight}`}`} to={'/m-admin/hr-management'}>Персонал</NavLink>
// </div>
