import React from 'react';
import s from './Management.module.css'
import ChangeWorkerContainer from "./ChangeWorker/ChangeWorkerContainer";
import SuperAdminSlick from "../../../Common/SuperAdminSlick/SuperAdminSlick";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";

const Management = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.management}>
                    <TopContainer isUserMuseumAdmin={true} />

                    <SuperAdminSlick />

                    <div className={s.profile}>
                        <ChangeWorkerContainer id={props.museum_super_admin.id}
                                               first_name={props.museum_super_admin.first_name}
                                               middle_name={props.museum_super_admin.middle_name}
                                               last_name={props.museum_super_admin.last_name}
                                               username={props.museum_super_admin.username}
                                               museumAdminId={props.museum_super_admin.id}
                                               text={'Главный администратор'}
                        />
                    </div>
                    <div className={s.workers}>
                        <div className={s.people}>
                            <h3 className={s.title}>
                                Администраторы музея
                            </h3>
                            {
                                props.museum_admins &&
                                props.museum_admins.length > 0
                                    ? props.museum_admins.map(a => {
                                        return <ChangeWorkerContainer
                                            key={a.id} id={a.id} username={a.username}
                                            text={'Администратор'}
                                            first_name={a.first_name} last_name={a.last_name} middle_name={a.middle_name} />
                                    })
                                    :
                                    <div className={'emptyLocations'}>
                                        Нет администраторов
                                    </div>
                            }
                        </div>
                        <div className={s.people}>
                            <h3 className={s.title}>
                                Кассиры
                            </h3>
                            {
                                props.museum_cashiers &&
                                props.museum_cashiers.length > 0
                                    ? props.museum_cashiers.map(a => {
                                        return <ChangeWorkerContainer museumAdminId={props.museum_super_admin.id}
                                                                      text={'Кассир'}
                                                                      key={a.id} id={a.id} username={a.username} first_name={a.first_name}
                                                                      last_name={a.last_name} middle_name={a.middle_name} />
                                    })
                                    :
                                    <div className={'emptyLocations'}>
                                        Нет кассиров
                                    </div>
                            }
                        </div>
                    </div>


                    <div className={'buttonContainer'}>
                        <BlueButton type={'link'} link={'/m-admin/hr-management/create_worker'} text={'Создать работника'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Management;
