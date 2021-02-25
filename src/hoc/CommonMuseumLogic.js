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
                sectionName: "",
                id: 0,
                description: "",
                img: "", //переменная в которую записывается новая картинка (картинка музея)

                img_1 : null, //Максимальное количество картинок в экспонате
                img_2 : null, //В будущем переделать в массив...
                img_3 : null,
                img_4 : null,
                img_5 : null,

                audio_1 : null, //Максимальное количество аудио в экспонате
                audio_2 : null, //В будущем переделать в массив...
                audio_3 : null,
                audio_4 : null,
                audio_5 : null,

                link_value_1 : '',
                link_value_2 : '',
                link_value_3 : '',
                link_value_4 : '',
                link_value_5 : '',

                link_name_1 : '',
                link_name_2 : '',
                link_name_3 : '',
                link_name_4 : '',
                link_name_5 : '',

                audio: "",
                video: "",
                ticket_lifetime: 1,
                images: null,
                main_audio: null,
                main_img: null, //картинка, которая показывается на экране (картинка музея)

                isChanging: false, //Меняется ли информация
                isCardsChanging: false, //Меняются ли местами карточки локаций/залов/артефактов
                isEmptyInputs: false, //Если ли пустые поля
                isModalOpen: false, //Открыто ли модальное окно
                isPhotoTypeWrong: false, //Если файл не является картинкой
                isAudioTypeWrong: false, //Если файл не является аудио
                isVideoUrlWrong: false, //Если видео не является ссылкой
                isInputSizeRight: true, //Если все поля нормальной длины
                isTicketLifeTimeWrong: false, //Если время жизни билета отрицательное
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
            this.toggleOpenModal = this.toggleOpenModal.bind(this)
            this.setArtifactImages = this.setArtifactImages.bind(this)
            this.deleteFromForm = this.deleteFromForm.bind(this)
            this.setArtifactAudios = this.setArtifactAudios.bind(this)
            this.setVideos = this.setVideos.bind(this)
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

        setArtifactImages(img_1, img_2, img_3, img_4, img_5) { //добавление картинок экспоната
            this.setState({
                img_1 : img_1,
                img_2 : img_2,
                img_3 : img_3,
                img_4 : img_4,
                img_5 : img_5,
            })
        }
        setArtifactAudios(audio_1, audio_2, audio_3, audio_4, audio_5) { //добавление аудио экспоната
            this.setState({
                audio_1 : audio_1,
                audio_2 : audio_2,
                audio_3 : audio_3,
                audio_4 : audio_4,
                audio_5 : audio_5,
            })
        }
        setVideos(link_value_1, link_value_2, link_value_3, link_value_4, link_value_5, link_name_1, link_name_2, link_name_3, link_name_4, link_name_5) { //добавление аудио экспоната
            this.setState({
                link_value_1 : link_value_1,
                link_value_2 : link_value_2,
                link_value_3 : link_value_3,
                link_value_4 : link_value_4,
                link_value_5 : link_value_5,
                link_name_1 : link_name_1,
                link_name_2 : link_name_2,
                link_name_3 : link_name_3,
                link_name_4 : link_name_4,
                link_name_5 : link_name_5,
            })
        }

        deleteFromForm(name) {
            this.setState({
                [name]: null
            })
        }

        setValidation(name, bool) {
            this.setState({
                [name]: bool,
            })
        }

        toggleOpenModal(isOpen) {
            this.setState({
                isModalOpen:isOpen
            })
        }

        toggleIsChanging(isChanging) {
            this.setState({
                isChanging: isChanging,
                isPhotoTypeWrong: false,
                isAudioTypeWrong: false,
                isVideoUrlWrong: false,
                isInputSizeRight: true,
                isTicketLifeTimeWrong: false,
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
                isTicketLifeTimeWrong: false,
                isInputSizeRight: true,
            })
        }

        updateState(id, name, description, main_img, audio, video, ticket_lifetime, sectionName, images) {
            this.setState({
                name:name,
                description: description,
                id: id,
                main_img: main_img,
                main_audio: audio,
                video: video,
                ticket_lifetime: ticket_lifetime,
                sectionName: sectionName,
                images: images,
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
                           setArtifactImages={this.setArtifactImages}
                           deleteFromForm={this.deleteFromForm}
                           setArtifactAudios={this.setArtifactAudios}
                           setVideos={this.setVideos}

                           setImage={this.setImage}
                           setAudio={this.setAudio}
                           handleChange={this.handleChange}
                           updateState={this.updateState}
                           handleChangeFile={this.handleChangeFile}
                           toggleOpenModal={this.toggleOpenModal}
                />
            )
        }
    }

    let ConnectedCommonMuseumComponent = connect(mapStateToPropsForRedirect)(CommonMuseumLogic);

    return ConnectedCommonMuseumComponent;
}
