import React from 'react';
import s from './MuseumAdmin.module.css'
import ChangeWorkerContainer from "../../Management/ChangeWorker/ChangeWorkerContainer";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import BlueButton from "../../../../Common/BlueButton/BlueButton";
import DeleteModal from "../../../../Common/DeleteModal/DeleteModal";
import WorkerProfile from "../../Management/WorkerProfile/WorkerProfile";

const MuseumAdmin = ({museumAdminData, ...props}) => {
    return (
        <>
            {
                !props.isChanging &&
                <div className={s.title}>
                    Персонал музея
                </div>
            }

            <div className={s.person}>
                {
                    !props.isChanging &&
                    (props.status
                    ?
                        <div className={s.worker}>
                            <div className={s.cover}> </div>
                            <WorkerProfile text={'Главный администратор'}
                                           first_name={museumAdminData.first_name} isUserServiceAdmin={true}
                                           last_name={museumAdminData.last_name} middle_name={museumAdminData.middle_name}
                            />
                        </div>
                    :
                    <div className={'emptyLocations'}>
                        Гланый администратор отсутствует
                    </div>)

                }
            </div>

            <div className={'buttonContainer'}>
                { props.status &&
                    <RedTransparentBtn type={'withProps'} handleSubmit={props.toggleOpenModal} data={true} text={'Удалить администратора'} />
                }
                {
                    (!props.status && !props.isChanging)
                    &&
                        <BlueButton type={'btn'} handleSubmit={props.toggleIsChanging} text={'Создать администратора'} />
                }
            </div>

            <DeleteModal isModalOpen={props.isModalOpen} toggleOpenModal={props.toggleOpenModal} deleteMuseum={props.deleteMuseumSuperAdmin} />
        </>

    );
}

export default MuseumAdmin;
