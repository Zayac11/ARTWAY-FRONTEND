import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";
import {setPassword, setPasswordConditions} from "../../../redux/authentication";
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
            isSetPasswordRight: false, //Если успешно сменил пароль
            isCurrentPasswordWrong: false, //Если текущий пароль неправильный
            isPasswordsMatch: true, //Если пароли совпадают
            isPasswordSimple: false, //Если пароль распространен
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangePasswordsMatch = this.handleChangePasswordsMatch.bind(this)
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
            this.props.setPassword(this.state.current_password, this.state.new_password, this.state.re_new_password)
        }
        else {
            this.setState({
                isPasswordsMatch: false,
            })
        }
    }

    handleChangePasswordsMatch() {
        this.setState({
            isPasswordsMatch: true,
            isCurrentPasswordWrong: false,
        })
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

                        <Input text={'Старый пароль'} type={'password'} name={'current_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.current_password} />
                        <Input text={'Новый пароль'} type={'password'} name={'new_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.new_password} />
                        <Input text={'Повторите пароль'} type={'password'} name={'re_new_password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.re_new_password} />

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
                            this.state.isSetPasswordRight &&
                            <div className={'form__right'}>
                                Пароль успешно изменен
                            </div>
                        }

                        {
                            this.state.isPasswordSimple &&
                            <div className={'form__wrong'}>
                                Пароль слишком распространен
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

    }
}


export default compose(
    connect(mapStateToProps, {setPassword, setPasswordConditions}),
    withRouter,
    WithSuperAdminRedirect,
)(ChangePassword)
