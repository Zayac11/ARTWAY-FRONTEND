import React from 'react';
import s from './Management.module.css'
import ChangeWorkerContainer from "./ChangeWorker/ChangeWorkerContainer";
import {NavLink} from "react-router-dom";

const Management = (props) => {
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <ChangeWorkerContainer id={props.museum_super_admin.id}
                                       first_name={props.museum_super_admin.first_name}
                                       middle_name={props.museum_super_admin.middle_name}
                                       last_name={props.museum_super_admin.last_name}
                                       username={props.museum_super_admin.username}
                                       museumAdminId={props.museum_super_admin.id}
                />
            </div>
            <NavLink to={'/m-admin/hr-management/create_worker'}>Создать работника</NavLink>
            <div className={s.people}>
                Админы
                {
                    props.museum_admins &&
                        props.museum_admins.length > 0
                    ? props.museum_admins.map(a => {
                        return <ChangeWorkerContainer key={a.id} id={a.id} username={a.username} first_name={a.first_name} last_name={a.last_name} middle_name={a.middle_name} />
                        })
                    :
                        <div>
                            Нет админычей
                        </div>
                }
            </div>
            <div className={s.people}>
                Кассиры
                {
                    props.museum_cashiers &&
                    props.museum_cashiers.length > 0
                        ? props.museum_cashiers.map(a => {
                            return <ChangeWorkerContainer museumAdminId={props.museum_super_admin.id} key={a.id} id={a.id} username={a.username} first_name={a.first_name} last_name={a.last_name} middle_name={a.middle_name} />
                        })
                        :
                        <div>
                            Нет кассирочков
                        </div>
                }
            </div>
        </div>
    );
}

export default Management;
