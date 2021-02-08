import React from 'react';
import s from './CreateWorkerInputs.module.css'
import Input from "../Input/Input";
import BlueButton from "../BlueButton/BlueButton";
import TopContainer from "../Top/TopContainer";
import TransparentButton from "../TransparentButton/TransparentButton";
import BackBtn from "../BackBtn/BackBtn";

const CreateWorkerInputs = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.create}>
                    {
                        !props.isUserServiceAdmin
                            ?
                            <>
                                <TopContainer isUserMuseumAdmin={true} />


                                <div className={s.top}>
                                    <h2 className={s.title}>Создание пользователя музея</h2>
                                    <BackBtn history={props.history} />
                                </div>
                            </>
                            :
                            <>
                                <div className={s.top}>
                                    <BackBtn history={props.history} />
                                    <h2 className={s.title}>Создание главного администратора</h2>
                                </div>
                            </>
                    }

                    <Input required={true} text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.last_name} />
                    <Input required={true} text={'Имя'} type={'text'} name={'first_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.first_name} />
                    <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.middle_name} />
                    <Input required={true} text={'Email'} type={'text'} name={'email'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.email} />
                    <Input required={true} text={'Пароль'} type={'password'} name={'password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.password} />
                    <Input required={true} text={'Повторите пароль'} type={'password'} name={'confirm_password'} handleFocus={props.handleChangeInputs} handleFindKey={props.handleFindKey} handleChange={props.handleChange} value={props.confirm_password} />

                    {
                        !props.isUserServiceAdmin &&
                        <div className={s.roleContainer}>
                            <div className={s.role}>
                                Роль
                            </div>
                            <div className={s.InputContainer}>
                                <input id={'museum_admins'} name={'role'} type="radio" checked={props.role === 'museum_admins'} value='museum_admins' onChange={props.handleChangeRadio}/>
                                <label htmlFor="museum_admins">Администратор музея</label>
                            </div>
                            <div className={s.InputContainer}>
                                <input id={'museum_cashiers'} name={'role'} type="radio" checked={props.role === 'museum_cashiers'} value='museum_cashiers' onChange={props.handleChangeRadio}/>
                                <label htmlFor="museum_cashiers">Кассир</label>
                            </div>
                        </div>
                    }

                    {
                        props.isEmptyInputs &&
                        <div className={'form__wrong'}>
                            Пожалуйста, заполните важные поля
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
                        </div>
                    }
                    {
                        props.isEmailAlreadyTaken &&
                        <div className={'form__wrong'}>
                            Данный email адрес уже занят
                        </div>
                    }

                    {
                        !props.isInputSizeRight &&
                        <div className='form__wrong'>
                            Превышена допустимая длина полей
                        </div>
                    }

                    <BlueButton type={'btn'} text={'Создать'} handleSubmit={props.handleSubmit} />
                    {
                        props.isUserServiceAdmin &&
                            <TransparentButton type={'btn'} handleSubmit={props.toggleIsChanging} text={'Закрыть'} />
                    }

                </div>
            </div>
        </div>
    );
}

export default CreateWorkerInputs;
