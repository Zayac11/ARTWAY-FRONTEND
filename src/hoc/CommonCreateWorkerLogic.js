import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserServiceAdmin: state.service.isUserServiceAdmin,
        isEmailTaken: state.auth.isEmailTaken,
    };
}

export const CommonCreateWorkerLogic = (Component) => {

    class CommonCreateWorkerLogic extends React.Component {

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
                isEmailAlreadyTaken: false, //Если почтовый адрес занят
                isPasswordMatch: true, //Если пароли совпадают
                isCreate: false, //Если успешно создано
                isRight: false, //Если все поля успешно заполнены
                isInputSizeRight: true, //Если все поля нормальной длины
            }

            this.handleFindKey = this.handleFindKey.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleChangeInputs = this.handleChangeInputs.bind(this)
            this.handleChange = this.handleChange.bind(this)
            this.handleChangeRadio = this.handleChangeRadio.bind(this)
            this.handleChangeCreateStatus = this.handleChangeCreateStatus.bind(this)
            this.deleteInputs = this.deleteInputs.bind(this)
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
            if (e.keyCode === 13) { // Логин с нажатием enter
                this.handleSubmit()
            }
        }

        handleSubmit() {
            let mail = /^[\w.\d*]+@[\w\d]+(\.\w{2,4})$/
            if (this.state.first_name === '' || this.state.last_name === '' || this.state.email === '' || this.state.password === '') {
                this.setState({
                    isEmptyInputs: true
                })
            } else if (this.state.password !== this.state.confirm_password) {
                this.setState({
                    isPasswordMatch: false,
                })
            } else if (this.state.last_name.length > 72 || this.state.first_name.length > 72 || this.state.middle_name.length > 72 || this.state.email.length > 72) {
                this.setState({
                    isInputSizeRight: false,
                })
            } else if (!mail.test(this.state.email)) {
                this.setState({
                    isEmailWrong: true,
                })
            } else {
                this.handleChangeCreateStatus(true)
            }
        }

        handleChangeInputs() {

            this.setState({
                isEmptyInputs: false,
                isEmailWrong: false,
                isPasswordMatch: true,
                isInputSizeRight: true,
                isEmailAlreadyTaken: false,
            })
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevProps.isEmailTaken !== this.props.isEmailTaken) {
                this.setState({
                    isEmailAlreadyTaken: this.props.isEmailTaken
                })}
            if(this.props.isEmailTaken && this.state.isCreate) {
                this.handleChangeCreateStatus(false)
            }
        }

        handleChangeCreateStatus(status) {
            this.setState({
                isCreate: status,
                isRight: status,
            })
        }

        deleteInputs() {
            this.setState({
                last_name: "",
                first_name: "",
                middle_name: "",
                email: "",
                password: "",
                confirm_password: "",
                role: "museum_admins",
            })
        }

        render() {

            return (

                <Component {...this.props}
                           {...this.state}
                           handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           deleteInputs={this.deleteInputs}
                           handleChangeInputs={this.handleChangeInputs}
                           handleChangeCreateStatus={this.handleChangeCreateStatus}
                           handleFindKey={this.handleFindKey}
                           handleChangeRadio={this.handleChangeRadio}
                />
            );
        }

    }

    let ConnectedCommonCreateWorkerComponent = connect(mapStateToPropsForRedirect)(CommonCreateWorkerLogic);
    return ConnectedCommonCreateWorkerComponent;
}
