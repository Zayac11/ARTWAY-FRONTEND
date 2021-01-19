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
                            <h2>Главный администратор</h2>
                            <div>
                                Имя: {admin.last_name}
                            </div>
                            <div>
                                Фамилия: {admin.first_name}
                            </div>
                            <div>
                                Отчество: {admin.middle_name}
                            </div>
                            <button className={s.deleteBtn} onClick={() => props.deleteMuseumSuperAdmin(props.museum_id)}>
                                Удалить одмэна
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
        </>

    );
}

export default MuseumAdmin;
