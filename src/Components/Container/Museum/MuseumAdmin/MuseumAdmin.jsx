import React from 'react';
import s from './MuseumAdmin.module.css'
import CreateWorkerInputs from "../../../../Common/CreateWorkerInputs/CreateWorkerInputs";
import ChangeWorkerContainer from "../../Management/ChangeWorker/ChangeWorkerContainer";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import BlueButton from "../../../../Common/BlueButton/BlueButton";

const MuseumAdmin = ({museumAdminData, ...props}) => {
    return (
        <>
            <div className={s.title}>
                Персонал музея
            </div>
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
                        Гланый администратор не найден
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
                    <RedTransparentBtn type={'withProps'} handleSubmit={props.deleteMuseumSuperAdmin} data={props.museum_id} text={'Удалить администратора'} />
                }
                {
                    (!props.status && !props.isChanging)
                    &&
                        <BlueButton type={'btn'} handleSubmit={props.toggleIsChanging} text={'Создать администратора'} />
                }
            </div>

        </>

    );
}

export default MuseumAdmin;
