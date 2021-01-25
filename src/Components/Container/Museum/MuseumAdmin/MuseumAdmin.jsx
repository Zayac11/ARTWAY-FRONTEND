import React from 'react';
import s from './MuseumAdmin.module.css'
import CreateWorkerInputs from "../../../../Common/CreateWorkerInputs/CreateWorkerInputs";
import prev from "../../../../assets/images/left-chevron.svg";
import Modal from "react-png-modal";

const MuseumAdmin = ({museumAdminData, ...props}) => {
    let admin = museumAdminData.museum_super_admin
    return (
        <>
            <button onClick={() => props.history.goBack()} className={'backBtn'}>
                <img src={prev} alt="back"/>
            </button>
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
            <button className={'submit'} onClick={() => props.toggleOpenModal(true)}>
                Удалить музей
            </button>

            <Modal
                center
                className={'CustomModal'}
                closeModal={() => props.toggleOpenModal(false)}
                open={props.isModalOpen}>
                {
                    <>
                        <div>
                            Пожалуйста, подтвердите удаление
                        </div>
                        <button onClick={() => props.deleteMuseum()} className={'submit'}>
                            Удалить
                        </button>
                    </>
                }
            </Modal>
        </>

    );
}

export default MuseumAdmin;
