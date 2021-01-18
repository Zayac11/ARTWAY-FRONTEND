import React from 'react';
import s from './ChangeWorkerProfile.module.css'
import Input from "../../../../Common/Input/Input";

const ChangeWorkerProfile = (props) => {
    return (
        <div className={s.changeContainer}>
            <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
            <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
            <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />
            <button className={s.button} onClick={props.updateWorker}>Сохранить</button>
            {
                props.museumAdminId !== props.id && <button className={s.button} onClick={() => props.deleteWorker(props.id)}>Удалить</button>
            }

        </div>
    );
}

export default ChangeWorkerProfile;
