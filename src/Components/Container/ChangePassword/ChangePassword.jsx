import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";
import {setIsPasswordRight, setPassword, setPasswordConditions} from "../../../redux/authentication";
import s from './ChangePassword.module.css'
import TopContainer from "../../../Common/Top/TopContainer";
import prev from './../../../assets/images/left-chevron.svg'
import Input from "../../../Common/Input/Input";
import BlueButton from "../../../Common/BlueButton/BlueButton";

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current_password: "",
            new_password: "",
            re_new_password: "",

            //Валидация
            isEmptyInputs: false, //Пустые поля
            isCurrentPasswordWrong: false, //Если текущий пароль неправильный
            isPasswordsMatch: true, //Если пароли совпадают
            isPasswordShort: false, //Если пароль короче 8 символов
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

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
            isPasswordsMatch: true,
            isPasswordSimple: false,
            isCurrentPasswordWrong: false,
            isPasswordShort: false,
        })
    }

    handleSubmit() {
        if(this.state.new_password === '' || this.state.re_new_password === '' || this.state.current_password === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else if(this.state.new_password.length < 8) {
            this.setState({
                isPasswordShort: true
            })
        }
        else if(this.state.new_password === this.state.re_new_password) {
            this.props.setPassword(this.state.current_password, this.state.new_password, this.state.re_new_password)
        }
        else {
            this.setState({
                isPasswordsMatch: false,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.isSetPasswordRight !== this.props.isSetPasswordRight) {
            this.setState({
                isSetPasswordRight: this.props.isSetPasswordRight
            })
        }
        if(prevProps.isCurrentPasswordWrong !== this.props.isCurrentPasswordWrong) {
            this.setState({
                isCurrentPasswordWrong: this.props.isCurrentPasswordWrong
            })
        }
        if(prevProps.isPasswordSimple !== this.props.isPasswordSimple) {
            this.setState({
                isPasswordSimple: this.props.isPasswordSimple
            })
        }
    }

    componentWillUnmount() {
        this.props.setPasswordConditions()
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className={'outer'}>
                <div className={'container'}>
                    <div className={s.change}>
                        <TopContainer isUserMuseumAdmin={true} />

                        <div className={s.topContainer}>
                            <h2 className={'itemsTitle'}>
                                Смена пароля
                            </h2>
                            <button onClick={() => this.props.history.goBack()} className={'backBtn'}>
                                <img src={prev} alt="back"/>
                            </button>
                        </div>

                        <Input required={true} text={'Старый пароль'} type={'password'} name={'current_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.current_password} />
                        <Input required={true} text={'Новый пароль'} type={'password'} name={'new_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.new_password} />
                        <Input required={true} text={'Повторите пароль'} type={'password'} name={'re_new_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.re_new_password} />

                        {
                            !this.state.isPasswordsMatch &&
                            <div className={'form__wrong'}>
                                Пароли не совпадают
                            </div>
                        }

                        {
                            this.state.isCurrentPasswordWrong &&
                            <div className={'form__wrong'}>
                                Пароль неправильный
                            </div>
                        }

                        {
                            this.state.isPasswordSimple &&
                            <div className={'form__wrong'}>
                                Пароль слишком распространен
                            </div>
                        }

                        {
                            this.state.isPasswordShort &&
                            <div className={'form__wrong'}>
                                Пароль должен содержать минимум 8 символов
                            </div>
                        }

                        <div className={s.buttonContainer}>
                            <BlueButton type={'btn'} text={'Сохранить изменения'} handleSubmit={this.handleSubmit} />
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isSetPasswordRight: state.auth.isSetPasswordRight,
        isCurrentPasswordWrong: state.auth.isCurrentPasswordWrong,
        isPasswordSimple: state.auth.isPasswordSimple,
    }
}


export default compose(
    connect(mapStateToProps, {setPassword, setPasswordConditions, setIsPasswordRight}),
    withRouter,
    WithSuperAdminRedirect,
)(ChangePassword)
