import React from 'react';
import s from './CreateWorkerInputs.module.css'
import Input from "../Input/Input";

const CreateWorkerInputs = (props) => {
    return (
        <div className={s.container}>
            <h1>Создание пользователя музея</h1>
            <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
            <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
            <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />
            <Input text={'Email'} type={'text'} name={'email'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.email} />
            <Input text={'Пароль'} type={'password'} name={'password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.password} />
            <Input text={'Повторите пароль'} type={'password'} name={'confirm_password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.confirm_password} />

            {
                !props.isUserServiceAdmin &&
                    <div>
                        <div>
                            Роль работника
                        </div>
                        <div><input name={'role'} type="radio" checked={props.role === 'museum_admins'} value='museum_admins' onChange={props.handleChangeRadio}/>Администратор музея</div>
                        <div><input name={'role'} type="radio" checked={props.role === 'museum_cashiers'} value='museum_cashiers' onChange={props.handleChangeRadio}/>Кассир</div>
                    </div>
            }

            {
                props.isEmptyInputs &&
                <div className={'form__wrong'}>
                    Заполните все поля, кроме отчества
                </div>
            }
            {
                !props.isPasswordMatch &&
                <div className={'form__wrong'}>
                    Пароли не совпадают
                </div>
            }
            {
                props.isEmailWrong &&
                <div className={'form__wrong'}>
                    Пожалуйста, введите корректный email
                </div>          }

            <button onClick={props.handleSubmit}>Создать</button>

        </div>
    );
}

export default CreateWorkerInputs;
