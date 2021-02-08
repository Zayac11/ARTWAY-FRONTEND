import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {

    };
}

export const CommonCreateLogic = (Component) => {

    class CommonCreateLogic extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isRight: false, //Если проверка прошла успешно
                isCreate: false, //Успешно ли создание
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.changeCreate = this.changeCreate.bind(this)
        }

        handleSubmit() {
            if(this.props.description === '' || this.props.name === '') {
                this.props.setValidation('isEmptyInputs', true) //Ошибка в пустых полях
            }
            else if(this.props.name.length > 35) {
                this.props.setValidation('isInputSizeRight', false)
            }
            else if(/image/.test(this.props.img.type)) { //Если нет ошибки в формате файла
                this.changeCreate(true)
            }
            else if(this.props.img === '') {
                this.props.setValidation('isPhotoTypeWrong', true) //Ошибка в формате файла картинки
                this.changeCreate(false)
            }
            else {
                this.props.setValidation('isPhotoTypeWrong', true)
                this.changeCreate(false)
            }
        }

        changeCreate(isCreate) {
            this.setState({
                isCreate: isCreate,
                isRight: isCreate,
            })
        }

        render() {
            return (
                <Component {...this.props}
                           isCreate={this.state.isCreate}
                           isRight={this.state.isRight}
                           handleSubmit={this.handleSubmit}
                           changeCreate={this.changeCreate}
                />
            )
        }
    }


    let ConnectedCommonCreateComponent = connect(mapStateToPropsForRedirect)(CommonCreateLogic);

    return ConnectedCommonCreateComponent;
}
