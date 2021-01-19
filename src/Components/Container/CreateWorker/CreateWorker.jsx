import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from './CreateWorker.module.css'
import Input from "../../../Common/Input/Input";
import {createWorker} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {CommonCreateWorkerLogic} from "../../../hoc/CommonCreateWorkerLogic";

class CreateWorker extends React.Component {

    createWorker() {
        this.props.createWorker(
            this.props.last_name,
            this.props.first_name,
            this.props.middle_name,
            this.props.email,
            this.props.password,
            this.props.role)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight) {
            this.createWorker()
        }
    }

    componentDidMount() {

    }

    render() {

        if(!this.props.is_museum_super_adminTest) {
            return <Redirect to={'/'} />
        }
        if(this.props.isCreate) {
            return <Redirect to={'/m-admin/hr-management'} />
        }
        return (
            <div className={s.container}>
                <h1>Создание пользователя музея</h1>
                <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.last_name} />
                <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.first_name} />
                <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.middle_name} />
                <Input text={'Email'} type={'text'} name={'email'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.email} />
                <Input text={'Пароль'} type={'password'} name={'password'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.password} />
                <Input text={'Повторите пароль'} type={'password'} name={'confirm_password'} handleFocus={this.props.handleChangeInputs} handleFindKey={this.props.handleFindKey} handleChange={this.props.handleChange} value={this.props.confirm_password} />

                <div>
                    <div>
                        Роль работника
                    </div>
                    <div><input name={'role'} type="radio" checked={this.props.role === 'museum_admins'} value='museum_admins' onChange={this.props.handleChangeRadio}/>Администратор музея</div>
                    <div><input name={'role'} type="radio" checked={this.props.role === 'museum_cashiers'} value='museum_cashiers' onChange={this.props.handleChangeRadio}/>Кассир</div>
                </div>

                {
                    this.props.isEmptyInputs &&
                        <div className={'form__wrong'}>
                            Заполните все поля, кроме отчества
                        </div>
                }
                {
                    !this.props.isPasswordMatch &&
                        <div className={'form__wrong'}>
                            Пароли не совпадают
                        </div>
                }
                {
                    this.props.isEmailWrong &&
                        <div className={'form__wrong'}>
                            Пожалуйста, введите корректный email
                        </div>
                }

                <button onClick={this.props.handleSubmit}>Создать</button>

            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        is_museum_super_admin: state.museum.is_museum_super_admin,
        is_museum_super_adminTest: state.museum.is_museum_super_adminTest,
    }
}

export default compose(
    connect(mapStateToProps, {createWorker}),
    CommonCreateWorkerLogic,
)(CreateWorker)

// export default connect(mapStateToProps,{createWorker})(CreateWorker);
