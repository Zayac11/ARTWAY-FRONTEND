import React from 'react';
import s from './ChangeWorkerProfile.module.css'
import Input from "../../../../Common/Input/Input";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";

const ChangeWorkerProfile = (props) => {
    return (
        <div className={s.changeContainer}>
            <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
            <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
            <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />

            <TransparentButton type={'btn'} handleSubmit={props.updateWorker} text={'Сохранить'} />

            {
                props.museumAdminId === props.id &&
                <RedTransparentBtn type={'link'} link={'/m-admin/change_password'} text={'Изменить пароль'} />
            }
            {
                props.museumAdminId !== props.id &&
                <RedTransparentBtn type={'withProps'} data={props.id} handleSubmit={props.deleteWorker} text={'Удалить'} />
            }

        </div>
    );
}

export default ChangeWorkerProfile;
