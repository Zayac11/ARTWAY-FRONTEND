import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserServiceAdmin: state.service.isUserServiceAdmin,
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
                isPasswordMatch: true, //Если пароли совпадают
                isCreate: false, //Если успешно создано
                isRight: false, //Если все поля успешно заполнены
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
            if (e.keyCode === 13) { // Логин с нажатием enter
                this.handleSubmit()
            }
        }

        handleSubmit() {

            let mail = /^[\w\.\d*]+@[\w\d]+(\.\w{2,4})$/
            if (this.state.first_name === '' || this.state.last_name === '' || this.state.email === '' || this.state.password === '') {
                this.setState({
                    isEmptyInputs: true
                })
            } else if (this.state.password !== this.state.confirm_password) {
                this.setState({
                    isPasswordMatch: false,
                })
            } else if (!mail.test(this.state.email)) {
                this.setState({
                    isEmailWrong: true,
                })
            } else {
                this.setState({
                    isCreate: true,
                    isRight: true,
                })
            }
        }

        handleChangeInputs() {
            this.setState({
                isEmptyInputs: false,
                isEmailWrong: false,
                isPasswordMatch: true,
            })
        }

        render() {

            return (
                <Component {...this.props}
                           isCreate={this.state.isCreate}
                           isRight={this.state.isRight}
                           isEmptyInputs={this.state.isEmptyInputs}
                           isEmailWrong={this.state.isEmailWrong}
                           isPasswordMatch={this.state.isPasswordMatch}
                           last_name={this.state.last_name}
                           middle_name={this.state.middle_name}
                           first_name={this.state.first_name}
                           email={this.state.email}
                           password={this.state.password}
                           confirm_password={this.state.confirm_password}
                           role={this.state.role}
                           handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           handleChangeInputs={this.handleChangeInputs}
                           handleFindKey={this.handleFindKey}
                           handleChangeRadio={this.handleChangeRadio}
                />
            );
        }

    }

    let ConnectedCommonCreateWorkerComponent = connect(mapStateToPropsForRedirect)(CommonCreateWorkerLogic);

    return ConnectedCommonCreateWorkerComponent;
}
