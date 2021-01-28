import React from 'react';
import {connect} from "react-redux";
import './../../../Common/style.css'
import {resetPassword} from "../../../redux/authentication";
import {Redirect} from "react-router-dom";
import s from './ResetPassword.module.css'
import AuthInput from "../../../Common/AuthInput/AuthInput";
import email from './../../../assets/images/email-2.svg'
import send from './../../../assets/images/send.svg'
import artSquare from "../../../assets/images/artsquare.svg";
import BlueButton from "../../../Common/BlueButton/BlueButton";

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isConfirm: false, //Нажал ли пользователь кнопку "Восстановить"
            isEmptyInputs: false, //Заполнено ли поле
            isEmailExists: true, //Существует ли пользователь с таким адресом
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        if (this.state.email === '') {
            this.setState({
                isEmptyInputs: true
            })
        } else {
            this.props.resetPassword(this.state.email)
            this.setState({
                isConfirm: true
            })
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isEmailExists !== this.props.isEmailExists) {
            this.setState({
                isEmailExists: this.props.isEmailExists,
            })
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={'outer'}>
                <div className={'container'}>
                    <div className={'artContainer'}>
                        <div className={'artSquare'}>
                            <img className={'artImg'} src={artSquare} alt="artSquare"/>
                            <span>art</span>
                            <span className={'way'}>way</span>
                        </div>
                    </div>
                    {
                        this.props.isLogin ? <Redirect to="/catalog"/>
                            :
                            <div className={s.reset}>{
                                this.state.isConfirm && this.state.isEmailExists
                                    ?
                                    <div className={s.confirm}>
                                        <img className={s.sendImg} src={send} alt="mail send"/>
                                        <div className={s.send}>
                                            Вам выслано письмо на почту
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div className={s.title}>Восстановление пароля</div>
                                        <div className={s.subtitle}>Введите Email и мы вышлем письмо на почту</div>

                                        <AuthInput img={email} placeholder={'Email'} type={'email'} name={'email'}
                                                   handleChange={this.handleChange}
                                                   value={this.state.email} handleFocus={this.handleChangeInputs}
                                                   required={true}/>

                                        {
                                            this.state.isEmptyInputs &&
                                            <div className={'form__wrong'}>
                                                Пожалуйста, заполните поле
                                            </div>
                                        }
                                        {
                                            !this.state.isEmailExists &&
                                            <div className={'form__wrong'}>
                                                Пользователь с таким адресом не существует
                                            </div>
                                        }
                                        <div className={s.buttonContainer}>
                                            <BlueButton type={'btn'} text={'Войти'}
                                                        handleSubmit={this.handleSubmit}>Войти</BlueButton>
                                        </div>
                                    </>
                            }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isEmailExists: state.auth.isEmailExists,
    }
}

export default connect(mapStateToProps, {resetPassword})(ResetPassword);
