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
            debugger
            if(this.props.description === '' || this.props.name === '') {
                this.props.setValidation('isEmptyInputs', true) //Ошибка в пустых полях
            }
            else if(this.props.name.length > 35) {
                this.props.setValidation('isInputSizeRight', false)
            }
            else {
                if(this.props.img_1 === null && this.props.img_2 === null && this.props.img_3 === null && this.props.img_4 === null && this.props.img_5 === null && this.props.main_img === 'img') {
                    this.changeCreate(true)
                }
                //Если картинка музея окажется пустой пустая
                else if(this.props.img_1 === null && this.props.img_2 === null && this.props.img_3 === null && this.props.img_4 === null && this.props.img_5 === null && this.props.img === '') {
                    this.props.setValidation('isPhotoTypeWrong', true) //Ошибка в формате файла картинки
                    this.changeCreate(false)
                }
                //Если картинка заполнена и она не является изображением
                else if(this.props.img_1 !== null) {
                    if(!/image/.test(this.props.img_1.type)) {
                        this.props.setValidation('isPhotoTypeWrong', true)
                        this.changeCreate(false)
                    }
                    else if (this.props.img_2 === null && this.props.img_3 === null && this.props.img_4 === null && this.props.img_5 === null) {
                        this.changeCreate(true)
                    }
                }
                if(this.props.img_2 !== null) {
                    if(!/image/.test(this.props.img_2.type)) {
                        this.props.setValidation('isPhotoTypeWrong', true)
                        this.changeCreate(false)
                    }
                    else if (this.props.img_3 === null && this.props.img_4 === null && this.props.img_5 === null) {
                        this.changeCreate(true)
                    }
                }
                if(this.props.img_3 !== null) {
                    if(!/image/.test(this.props.img_3.type)) {
                        this.props.setValidation('isPhotoTypeWrong', true)
                        this.changeCreate(false)
                    }
                    else if (this.props.img_4 === null && this.props.img_5 === null) {
                        this.changeCreate(true)
                    }
                }
                if(this.props.img_4 !== null) {
                    if(!/image/.test(this.props.img_4.type)) {
                        this.props.setValidation('isPhotoTypeWrong', true)
                        this.changeCreate(false)
                    }
                    else if (this.props.img_5 === null) {
                        this.changeCreate(true)
                    }
                }
                if(this.props.img_5 !== null) {
                    if(!/image/.test(this.props.img_5.type)) {
                        this.props.setValidation('isPhotoTypeWrong', true)
                        this.changeCreate(false)
                    }
                    else {
                        this.changeCreate(true)
                    }
                }
                //Файл - картинка
                else if(/image/.test(this.props.img.type)) { //валидация картинки музея
                    this.changeCreate(true)
                }

                //Файл есть, но не является картинкой
                else if (!/image/.test(this.props.img.type) && this.props.img !== ''){
                    this.props.setValidation('isPhotoTypeWrong', true)
                    this.changeCreate(false)
                }
            }
            //добавляем возможность создания экспоната без картинки
        //    mass.filter(img => img.img === "222").length < 3 сравниваем длину и понимаем, что если кто-то отсеялся, то нужно загружать заново
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
