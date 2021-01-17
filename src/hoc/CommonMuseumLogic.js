import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {

    };
}

export const CommonMuseumLogic = (Component) => {

    class CommonMuseumLogic extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                name: "",
                id: 0,
                description: "",
                img: "",
                main_img: null,
                isChanging: false, //Меняется ли информация
                isEmptyInputs: false, //Если ли пустые поля
                isPhotoTypeWrong: false, //Если файл не является картинкой
            }

            this.handleChange = this.handleChange.bind(this)
            this.handleChangeInputs = this.handleChangeInputs.bind(this)
            this.handleChangeFile = this.handleChangeFile.bind(this)
            this.toggleIsChanging = this.toggleIsChanging.bind(this)
            this.updateState = this.updateState.bind(this)
            this.setValidation = this.setValidation.bind(this)
            this.setImage = this.setImage.bind(this)
        }

        setImage(img) { //Обновление фотографии в state
            this.setState({
                img: img,
            })
        }

        setValidation(name, bool) {
            this.setState({
                [name]: bool,
            })
        }
        toggleIsChanging(isChanging) {
            this.setState({
                isChanging: isChanging,
                isPhotoTypeWrong: false,
            })
        }

        handleChange(e) {
            let name = e.target.name
            let value = e.target.value

            this.setState({
                [name]: value,
            })
        }

        handleChangeFile(e) {
            let name = e.target.name
            let file = e.target.files[0]

            this.setState({
                [name]: file,
                isPhotoTypeWrong: false,
            })
        }

        handleChangeInputs() {
            this.setState({
                isEmptyInputs: false,
            })
        }

        updateState(id, name, description, main_img) {
            this.setState({
                name:name,
                description: description,
                id: id,
                main_img: main_img,
            })
        }

        render() {
            return (
                <Component {...this.props}
                           handleChangeInputs={this.handleChangeInputs}
                           toggleIsChanging={this.toggleIsChanging}
                           setValidation={this.setValidation}
                           setImage={this.setImage}
                           handleChange={this.handleChange}
                           updateState={this.updateState}
                           handleChangeFile={this.handleChangeFile}
                           isPhotoTypeWrong={this.state.isPhotoTypeWrong}
                           isChanging={this.state.isChanging}
                           isEmptyInputs={this.state.isEmptyInputs}
                           name={this.state.name}
                           description={this.state.description}
                           img={this.state.img}
                           main_img={this.state.main_img}
                />
            )
        }
    }

    let ConnectedCommonMuseumComponent = connect(mapStateToPropsForRedirect)(CommonMuseumLogic);

    return ConnectedCommonMuseumComponent;
}
