import React from 'react';
import s from './MuseumAdmin.module.css'
import CreateWorkerInputs from "../../../../Common/CreateWorkerInputs/CreateWorkerInputs";

const MuseumAdmin = ({museumAdminData, ...props}) => {
    let admin = museumAdminData.museum_super_admin
    return (
        <>
            {
                museumAdminData.status
                    &&
                        <div className={s.container}>
                            <h2 className={s.title}>Главный администратор</h2>
                            <div className={s.name}>
                                Имя: {admin.last_name}
                            </div>
                            <div className={s.name}>
                                Фамилия: {admin.first_name}
                            </div>
                            <div className={s.name}>
                                Отчество: {admin.middle_name}
                            </div>
                            <button className={'submit'} onClick={() => props.deleteMuseumSuperAdmin(props.museum_id)}>
                                Удалить администратора
                            </button>
                        </div>
            }
            {
                (!museumAdminData.status && props.isChanging)
                    &&
                        <CreateWorkerInputs {...props} isUserServiceAdmin={true} />
            }
            {
                (!museumAdminData.status && !props.isChanging)
                    &&
                    <button onClick={props.toggleIsChanging}>
                        Создать администратора
                    </button>
            }
            <button className={'submit'} onClick={() => props.deleteMuseum(props.museum_id)}>
                Удалить музей
            </button>
        </>

    );
}

export default MuseumAdmin;
