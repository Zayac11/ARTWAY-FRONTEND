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
                audio: "",
                video: "",
                main_audio: null,
                main_img: null,
                isChanging: false, //Меняется ли информация
                isCardsChanging: false, //Меняются ли местами карточки локаций/залов/артефактов
                isEmptyInputs: false, //Если ли пустые поля
                isPhotoTypeWrong: false, //Если файл не является картинкой
                isAudioTypeWrong: false, //Если файл не является аудио
                isVideoUrlWrong: false, //Если видео не является ссылкой
            }

            this.handleChange = this.handleChange.bind(this)
            this.handleChangeInputs = this.handleChangeInputs.bind(this)
            this.handleChangeFile = this.handleChangeFile.bind(this)
            this.toggleIsChanging = this.toggleIsChanging.bind(this)
            this.toggleIsCardsChanging = this.toggleIsCardsChanging.bind(this)
            this.updateState = this.updateState.bind(this)
            this.setValidation = this.setValidation.bind(this)
            this.setImage = this.setImage.bind(this)
            this.setAudio = this.setAudio.bind(this)
        }

        setImage(img) { //Обновление фотографии в state
            this.setState({
                img: img,
            })
        }
        setAudio(audio) { //Обновление аудио в state
            this.setState({
                audioToUpdate: audio,
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
                isAudioTypeWrong: false,
                isVideoUrlWrong: false,
            })
        }
        toggleIsCardsChanging(isCardsChanging) {
            this.setState({
                isCardsChanging: isCardsChanging,
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

            if (file === undefined) {
                file = ""
            }

            this.setState({
                [name]: file,
                isPhotoTypeWrong: false,
                isAudioTypeWrong: false,
            })
        }

        handleChangeInputs() {
            this.setState({
                isEmptyInputs: false,
                isVideoUrlWrong: false,
            })
        }

        updateState(id, name, description, main_img, audio, video) {
            this.setState({
                name:name,
                description: description,
                id: id,
                main_img: main_img,
                main_audio: audio,
                video: video,
            })
        }

        render() {
            return (
                <Component {...this.props}
                           {...this.state}
                           handleChangeInputs={this.handleChangeInputs}
                           toggleIsChanging={this.toggleIsChanging}
                           toggleIsCardsChanging={this.toggleIsCardsChanging}
                           setValidation={this.setValidation}
                           setImage={this.setImage}
                           setAudio={this.setAudio}
                           handleChange={this.handleChange}
                           updateState={this.updateState}
                           handleChangeFile={this.handleChangeFile}
                />
            )
        }
    }

    let ConnectedCommonMuseumComponent = connect(mapStateToPropsForRedirect)(CommonMuseumLogic);

    return ConnectedCommonMuseumComponent;
}
