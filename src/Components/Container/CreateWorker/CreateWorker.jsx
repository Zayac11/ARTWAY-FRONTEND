import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from './CreateWorker.module.css'
import Input from "../../../Common/Input/Input";
import {createWorker} from "../../../redux/admin-reducer";

class CreateWorker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            last_name: "",
            first_name: "",
            middle_name: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "museum_admins",

            isEmptyInputs: false, //Все ли поля пустые
            isEmailWrong: false, //Если почтовый адрес направильный
            isPasswordMatch: true, //Если пароли совпадают
            isCreate: false, //Если успешно создано
        }

        this.handleFindKey = this.handleFindKey.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeRadio = this.handleChangeRadio.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }
    handleChangeRadio(e) {
        let value = e.target.value

        this.setState({
            'role': value,
        })
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Логин с нажатием enter
            this.handleSubmit()
        }
    }

    handleSubmit() {
        let mail = /^[\w-\d*]+@[\w\d]+(\.\w{2,4})$/
        if(this.state.first_name === '' || this.state.last_name === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else if(this.state.password !== this.state.confirm_password) {
            this.setState({
                isPasswordMatch: false,
            })
        }
        else if(!mail.test(this.state.email)) {
            this.setState({
                isEmailWrong: true,
            })
        }
        else {
            this.props.createWorker(
                this.state.last_name,
                this.state.first_name,
                this.state.middle_name,
                this.state.email,
                this.state.password,
                this.state.role)
            this.setState({
                isCreate: true,
            })
        }

        // console.log(this.state)
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
            isEmailWrong: false,
            isPasswordMatch: true,
        })
    }


    componentDidMount() {

    }

    render() {

        if(!this.props.is_museum_super_adminTest) {
            return <Redirect to={'/'} />
        }
        if(this.state.isCreate) {
            return <Redirect to={'/m-admin/hr-management'} />
        }

        return (
            <div className={s.container}>
                <h1>Создание пользователя музея</h1>
                <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.last_name} />
                <Input text={'Имя'} type={'text'} name={'first_name'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.first_name} />
                <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.middle_name} />
                <Input text={'Email'} type={'text'} name={'email'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.email} />
                <Input text={'Пароль'} type={'password'} name={'password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.password} />
                <Input text={'Повторите пароль'} type={'password'} name={'confirm_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.confirm_password} />

                <div>
                    <div>
                        Роль работника
                    </div>
                    <div><input name={'role'} type="radio" checked={this.state.role === 'museum_admins'} value='museum_admins' onChange={this.handleChangeRadio}/>Администратор музея</div>
                    <div><input name={'role'} type="radio" checked={this.state.role === 'museum_cashiers'} value='museum_cashiers' onChange={this.handleChangeRadio}/>Кассир</div>
                </div>

                {
                    this.state.isEmptyInputs &&
                        <div className={'form__wrong'}>
                            Заполните все поля, кроме отчества
                        </div>
                }
                {
                    !this.state.isPasswordMatch &&
                        <div className={'form__wrong'}>
                            Пароли не совпадают
                        </div>
                }
                {
                    this.state.isEmailWrong &&
                        <div className={'form__wrong'}>
                            Пожалуйста, введите корректный email
                        </div>
                }

                <button onClick={this.handleSubmit}>Создать</button>

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

export default connect(mapStateToProps,{createWorker})(CreateWorker);
