import React from 'react';
import s from './MuseumAdmin.module.css'
import CreateWorkerInputs from "../../../../Common/CreateWorkerInputs/CreateWorkerInputs";
import ChangeWorkerContainer from "../../Management/ChangeWorker/ChangeWorkerContainer";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import BlueButton from "../../../../Common/BlueButton/BlueButton";
import DeleteModal from "../../../../Common/DeleteModal/DeleteModal";

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
                    <ChangeWorkerContainer id={museumAdminData.id} username={museumAdminData.username}
                                           text={'Главный администратор'} isUserServiceAdmin={true}
                                           first_name={museumAdminData.first_name} last_name={museumAdminData.last_name} middle_name={museumAdminData.middle_name}
                    />
                    :
                    <div className={'emptyLocations'}>
                        Гланый администратор отсутствует
                    </div>)

                }
            </div>

            {
                (!props.status && props.isChanging)
                    &&
                        <CreateWorkerInputs {...props} isUserServiceAdmin={true} />
            }
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
