import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonCreateLogic} from "../../../hoc/CommonCreateLogic";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";
import {createArtifact} from "../../../redux/artifact-reducer";

class CreateArtifact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCreate: false
        }

        this.createArtifact = this.createArtifact.bind(this)
        this.checkAudio = this.checkAudio.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.checkAudio()
        }
    }

    checkAudio() {
        let vid = /^(ftp|http|https):\/\/[^ "]+$/

        //Если загруженный файл является аудио и видео - ссылка или не заполнено
        if(/audio/.test(this.props.audio.type) && (vid.test(this.props.video) || this.props.video === '')) {
            this.props.toggleIsChanging(false)
            this.createArtifact()
            this.setState({
                isCreate: true
            })
        }
        else if(this.props.audio === '') { //Если аудио не загрузили
            this.props.setValidation('isAudioTypeWrong', true)
            this.props.changeCreate(false)
        }
        else if(!vid.test(this.props.video)) { //Если видео не является ссылкой
            this.props.setValidation('isVideoUrlWrong', true)
            this.props.changeCreate(false)
        }
        else { //Если файл загружен, но он не аудио
            this.props.setValidation('isAudioTypeWrong', true)
            this.props.changeCreate(false)
        }
    }
    createArtifact() {
        this.props.createArtifact(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name, this.props.img, this.props.description, this.props.audio, this.props.video)
    }

    render() {
        if(this.state.isCreate) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}/${this.props.match.params.hall_id}`} />
        }

        return (
            <ChangeForm text={'Создание артефакта'} {...this.props}
                        isItemArtifact={true} //Является ли создаваемы объект артефактом
            />

        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, {createArtifact}),
    withRouter,
    CommonMuseumLogic,
    CommonCreateLogic,
    WithAdminRedirect,
)(CreateArtifact)

//Оборачиваем компонент в компонент с общими полями, а так же в компонент с общей логикой создания
