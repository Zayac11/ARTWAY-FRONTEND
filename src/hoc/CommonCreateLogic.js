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
            else if(this.props.img.type === '') {
                this.props.setValidation('isPhotoTypeWrong', true) //Ошибка в формате файла
            }
            if(/image/.test(this.props.img.type)) { //Если нет ошибки в формате файла
                this.props.toggleIsChanging(false)
                this.changeCreate(true)
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


    let ConnectedCommonMuseumComponent = connect(mapStateToPropsForRedirect)(CommonCreateLogic);

    return ConnectedCommonMuseumComponent;
}
