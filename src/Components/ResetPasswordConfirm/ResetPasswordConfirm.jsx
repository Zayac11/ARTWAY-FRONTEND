import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import padlock from './../../assets/images/padlock-2.svg'
import s from './ResetPasswordConfirm.module.css'
import BlueButton from "../../Common/BlueButton/BlueButton";
import TopContainer from "../../Common/Top/TopContainer";
import AuthInput from "../../Common/AuthInput/AuthInput";
import {resetPasswordConfirm} from "../../redux/authentication";

class ResetPasswordConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            token: "",
            new_password: "",
            re_new_password: "",

            //Валидация
            isEmptyInputs: false, //Есть ли пустые поля
            isSetPasswordRight: false, //Если успешно сменил пароль
            isPasswordsMatch: true, //Если пароли совпадают
            isPasswordSimple: false, //Если пароль распространен
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
        if(this.state.new_password === this.state.re_new_password) {
            this.props.resetPasswordConfirm(this.state.uid, this.state.token, this.state.new_password, this.state.re_new_password)
            this.setState({
                isSetPasswordRight: true,
            })
        }
        else {
            this.setState({
                isPasswordsMatch: false,
            })
        }
    }

    handleChangeInputs() {
        this.setState({
            isPasswordsMatch: true,
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isPasswordSimple !== this.props.isPasswordSimple) {
            this.setState({
                isPasswordSimple: this.props.isPasswordSimple
            })
        }
    }

    componentDidMount() {
        const url = new URLSearchParams(this.props.location.search)
        this.setState({
            uid: url.get('uid'),
            token: url.get('token'),
        })
    }

    render() {

        if(this.props.isLogin) {
            return <Redirect to="/" />
        }
        if(this.state.isSetPasswordRight && !this.state.isPasswordSimple) {
            return <Redirect to="/login" />
        }

        return (
            <>
                <div className={'outer'}>
                    <div className={'container'}>
                        <div className={s.resetContainer}>
                            <TopContainer isTicketCanceled={true} />

                            <div className={s.reset}>
                                <h3 className={s.title}>Восстановление пароля</h3>

                                <AuthInput img={padlock} placeholder={'Новый пароль'} type={'password'} name={'new_password'}
                                           handleChange={this.handleChange}
                                           value={this.state.new_password} handleFocus={this.handleChangeInputs}
                                           required={true}/>

                                <AuthInput img={padlock} placeholder={'Повторите пароль'} type={'password'} name={'re_new_password'}
                                           handleChange={this.handleChange}
                                           value={this.state.re_new_password} handleFocus={this.handleChangeInputs}
                                           required={true}/>

                                {
                                    !this.state.isPasswordsMatch &&
                                    <div className={'form__wrong'}>
                                        Пароли не совпадают
                                    </div>
                                }
                                {
                                    this.state.isPasswordSimple &&
                                    <div className={'form__wrong'}>
                                        Пароль слишком распространен
                                    </div>
                                }
                                <div className={s.buttonContainer}>
                                    <BlueButton type={'btn'} text={'Изменить пароль'} handleSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isPasswordSimple: state.auth.isPasswordSimple,
    }
}

let WithUrlResetPasswordConfirm = withRouter(ResetPasswordConfirm)
export default connect(mapStateToProps,{resetPasswordConfirm})(WithUrlResetPasswordConfirm);
