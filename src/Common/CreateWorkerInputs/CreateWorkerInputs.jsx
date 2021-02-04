import React from 'react';
import s from './CreateWorkerInputs.module.css'
import Input from "../Input/Input";
import prev from "../../assets/images/left-chevron.svg";
import BlueButton from "../BlueButton/BlueButton";

const CreateWorkerInputs = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.create}>
                    <div className={s.top}>
                        <button onClick={() => props.history.goBack()} className={'backBtn'}>
                            <img src={prev} alt="back"/>
                        </button>
                        <h2 className={s.title}>Создание пользователя музея</h2>
                    </div>
                    <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
                    <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
                    <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />
                    <Input text={'Email'} type={'text'} name={'email'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.email} />
                    <Input text={'Пароль'} type={'password'} name={'password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.password} />
                    <Input text={'Повторите пароль'} type={'password'} name={'confirm_password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.confirm_password} />

                    {
                        !props.isUserServiceAdmin &&
                        <div>
                            <div className={s.role}>
                                Роль
                            </div>
                            <div className={s.InputContainer}><input name={'role'} type="radio" checked={props.role === 'museum_admins'} value='museum_admins' onChange={props.handleChangeRadio}/>Администратор музея</div>
                            <div className={s.InputContainer}><input name={'role'} type="radio" checked={props.role === 'museum_cashiers'} value='museum_cashiers' onChange={props.handleChangeRadio}/>Кассир</div>
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

                    <BlueButton className={'submit'} onClick={props.handleSubmit}>Создать</BlueButton>

                </div>
            </div>
        </div>
    );
}

export default CreateWorkerInputs;
