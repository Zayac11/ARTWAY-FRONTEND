import React from 'react';
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from "./Login.module.css";
import {login, logout} from "../../redux/authentication";
import AuthInput from "../../Common/AuthInput/AuthInput";
import email from './../../assets/images/email-2.svg'
import padlock from './../../assets/images/padlock-2.svg'
import BlueButton from "../../Common/BlueButton/BlueButton";
import TopContainer from "../../Common/Top/TopContainer";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isEmptyInputs: false, //Все ли поля пустые
            isLoginWrong: false, //Если ошибка при логине
            isLogin: false, //Если успешно залогинен
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
        this.handleFindKey = this.handleFindKey.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        if(this.state.email === "" || this.state.password === "") {
            this.setState({
                isEmptyInputs: true //Поля пустые
            })
        }
        else {
            this.props.login(this.state.email, this.state.password)
            this.setState({
                isLogin: true,
            })
        }
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Логин с нажатием enter
            this.handleSubmit()
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidMount() {

        this.props.logout()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isLoginWrong !== this.props.isLoginWrong) {
            this.setState({
                isLoginWrong: this.props.isLoginWrong,
            })
        }
    }

    render() {

        return (
            <div className={'outer'}>
                <div className={'container'}>
                    <div className={s.loginContainer}>
                        <TopContainer isTicketCanceled={true} />
                        {
                            this.state.isLogin ? <Redirect to="/" />
                                :
                                <div className={s.login}>

                                    <div className={s.title}>Вход в личный кабинет</div>
                                    <div className={s.subtitle}>Введите Email и пароль</div>

                                    <AuthInput img={email} placeholder={'Email'} type={'email'} name={'email'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.email} />
                                    <AuthInput img={padlock} placeholder={'Пароль'} type={'password'} name={'password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.password} />

                                    {
                                        this.state.isEmptyInputs &&
                                        <div className={'form__wrong'}>
                                            Все поля обязательны для заполнения
                                        </div>
                                    }

                                    {
                                        this.state.isLoginWrong &&
                                        <div className={'form__wrong'}>
                                            Неправильный логин или пароль
                                        </div>
                                    }

                                    {
                                        this.props.isSetPasswordRight &&
                                        <div className={'form__right'}>
                                            Пароль успешно изменен
                                        </div>
                                    }

                                    <NavLink className={s.forgot} to={'/reset_password'}>Забыли пароль?</NavLink>
                                    <div className={s.buttonContainer}>
                                        <BlueButton type={'btn'} className={'submit'} text={'Войти'} handleSubmit={this.handleSubmit}>Войти</BlueButton>
                                    </div>

                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isLoginWrong: state.auth.isLoginWrong,
        isSetPasswordRight: state.auth.isSetPasswordRight,
    }
}

export default connect(mapStateToProps,{login, logout})(Login);
