import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {

    };
}

export const CommonUpdateLogic = (Component) => {

    class CommonUpdateLogic extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isRight: false, //Если проверка прошла успешно
                isCreate: false, //Успешно ли создание
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.changeCreate = this.changeCreate.bind(this)
            this.handleFindKey = this.handleFindKey.bind(this)
        }

        handleFindKey(e) {
            if(e.keyCode === 13) { // Логин с нажатием enter
                this.handleSubmit()
            }
        }

        handleSubmit() {
            if(this.props.description === '' || (this.props.name === '' && this.props.sectionName === '') || this.props.ticket_lifetime === '') { //Ошибка в пустых полях
                this.props.setValidation('isEmptyInputs', true)
            }
            else if(this.props.name.length > 35 || this.props.ticket_lifetime.length > 5 || this.props.sectionName.length > 100) {
                this.props.setValidation('isInputSizeRight', false)
            }
            else if(this.props.ticket_lifetime < 1) {
                this.props.setValidation('isTicketLifeTimeWrong', true)
            }
            else if(this.props.img === '') { //Если пользователь не хочет обновлять фотографию, то просто берется ссылка на старую
                this.props.setImage(this.props.main_img) //Обновление фотографии в state
                this.props.toggleIsChanging(false)
                this.changeCreate(true)
            }
            else if(/image/.test(this.props.img.type)) {
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
                           handleFindKey={this.handleFindKey}
                />
            )
        }
    }


    let ConnectedCommonUpdateComponent = connect(mapStateToPropsForRedirect)(CommonUpdateLogic);

    return ConnectedCommonUpdateComponent;
}
