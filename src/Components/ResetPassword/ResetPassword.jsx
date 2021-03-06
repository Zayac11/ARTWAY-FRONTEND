import React from 'react';
import {connect} from "react-redux";
import '../../Common/style.css'
import {resetPassword} from "../../redux/authentication";
import {Redirect, withRouter} from "react-router-dom";
import s from './ResetPassword.module.css'
import AuthInput from "../../Common/AuthInput/AuthInput";
import email from '../../assets/images/email-2.svg'
import send from '../../assets/images/send.svg'
import resetPic from "../../assets/images/resetPic.svg";
import BlueButton from "../../Common/BlueButton/BlueButton";
import TopContainer from "../../Common/Top/TopContainer";
import Preloader from "../../Common/Preloader/Preloader";
import BackBtn from "../../Common/BackBtn/BackBtn";
import {compose} from "redux";


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

        if(this.props.isFetch) {
            return <Preloader />
        }

        return (
            <div className={'outer'}>
                <div className={'container'}>
                    <div className={s.resetContainer}>

                        <TopContainer isTicketCanceled={true} />

                        <div className={s.top}>
                            <BackBtn history={this.props.history} />
                        </div>

                        <div className={s.picture}>
                            <img src={resetPic} alt="reset password"/>
                        </div>

                        {
                            this.props.isLogin ? <Redirect to="/"/>
                                :
                                <div className={s.reset}> {
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

                                                <BlueButton type={'btn'} text={'Восстановить'} handleSubmit={this.handleSubmit} />
                                        </>
                                }
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
        isFetch: state.auth.isFetch,
        isEmailExists: state.auth.isEmailExists,
    }
}

export default compose(
    connect(mapStateToProps,{resetPassword}),
    withRouter,
)(ResetPassword)

