import React from 'react';
import s from './ChangeWorkerProfile.module.css'
import Input from "../../../../Common/Input/Input";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";
import DeleteModal from "../../../../Common/DeleteModal/DeleteModal";

const ChangeWorkerProfile = (props) => {
    return (
        <div className={s.changeContainer}>
            <Input required={true} text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
            <Input required={true} text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
            <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />

            {
                props.isEmptyInputs &&
                <div className={'form__wrong'}>
                    Пожалуйста, заполните важные поля
                </div>
            }

            <TransparentButton type={'btn'} handleSubmit={props.updateWorker} text={'Сохранить'} />

            {
                props.museumAdminId === props.id &&
                <RedTransparentBtn type={'link'} link={'/m-admin/change_password'} text={'Изменить пароль'} />
            }
            {
                (props.museumAdminId !== props.id && !props.isUserServiceAdmin) &&
                <RedTransparentBtn type={'withProps'} data={true} handleSubmit={props.toggleOpenModal} text={'Удалить'} />
            }

            <DeleteModal isModalOpen={props.isModalOpen} toggleOpenModal={props.toggleOpenModal} deleteMuseum={props.deleteWorker} />

        </div>
    );
}

export default ChangeWorkerProfile;
