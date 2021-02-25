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
        this.checkVideo = this.checkVideo.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.checkVideo()
        }
    }

    checkVideo() {
        let vid = /^(ftp|http|https):\/\/[^ "]+$/

        if(this.props.link_name_1 !== '' || this.props.link_value_1 !== '') {
            if(!vid.test(this.props.link_value_1)) {
                this.props.setValidation('isVideoUrlWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.link_name_2 === '' && this.props.link_name_3 === '' && this.props.link_name_4 === '' && this.props.link_name_5 === '' &&
                this.props.link_value_2 === '' && this.props.link_value_3 === '' && this.props.link_value_4 === '' && this.props.link_value_5 === ''
            ){
                this.checkAudio()
            }
        }

        if(this.props.link_name_2 !== '' || this.props.link_value_2 !== '') {
            if(!vid.test(this.props.link_value_2)) {
                this.props.setValidation('isVideoUrlWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.link_name_3 === '' && this.props.link_name_4 === '' && this.props.link_name_5 === '' &&
                this.props.link_value_3 === '' && this.props.link_value_4 === '' && this.props.link_value_5 === '') {
                this.checkAudio()
            }
        }

        if(this.props.link_name_3 !== '' || this.props.link_value_3 !== '') {
            if(!vid.test(this.props.link_value_3)) {
                this.props.setValidation('isVideoUrlWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.link_name_4 === '' && this.props.link_name_5 === '' && this.props.link_value_4 === '' && this.props.link_value_5 === '') {
                this.checkAudio()
            }
        }

        if(this.props.link_name_4 !== '' || this.props.link_value_4 !== '') {
            if(!vid.test(this.props.link_value_4)) {
                this.props.setValidation('isVideoUrlWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.link_name_5 === '' && this.props.link_value_5 === '') {
                this.checkAudio()
            }
        }

        if(this.props.link_name_5 !== '' || this.props.link_value_5 !== '') {
            if(!vid.test(this.props.link_value_5)) {
                this.props.setValidation('isVideoUrlWrong', true)
                this.props.changeCreate(false)
            }
            else {
                this.checkAudio()
            }
        }

    }

    checkAudio() {

        //Если аудио нет вообще
        if(this.props.audio_1 === null && this.props.audio_2 === null && this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
            this.props.setValidation('isAudioTypeWrong', true)
            this.props.changeCreate(false)
        }
        //Если картинка заполнена и она не является изображением
        else if(this.props.audio_1 !== null) {
            if(!/audio/.test(this.props.audio_1.type)) {
                this.props.setValidation('isAudioTypeWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.audio_2 === null && this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
                this.createArtifact()
                this.setState({
                    isCreate: true
                })
            }
        }
        if(this.props.audio_2 !== null) {
            if(!/audio/.test(this.props.audio_2.type)) {
                this.props.setValidation('isAudioTypeWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
                this.createArtifact()
                this.setState({
                    isCreate: true
                })
            }
        }
        if(this.props.audio_3 !== null) {
            if(!/audio/.test(this.props.audio_3.type)) {
                this.props.setValidation('isAudioTypeWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.audio_4 === null && this.props.audio_5 === null) {
                this.createArtifact()
                this.setState({
                    isCreate: true
                })
            }
        }
        if(this.props.audio_4 !== null) {
            if(!/audio/.test(this.props.audio_4.type)) {
                this.props.setValidation('isAudioTypeWrong', true)
                this.props.changeCreate(false)
            }
            else if (this.props.audio_5 === null) {
                this.createArtifact()
                this.setState({
                    isCreate: true
                })
            }
        }
        if(this.props.audio_5 !== null) {
            if(!/audio/.test(this.props.audio_5.type)) {
                this.props.setValidation('isAudioTypeWrong', true)
                this.props.changeCreate(false)
            }
            else {
                this.createArtifact()
                this.setState({
                    isCreate: true
                })
            }
        }

        // else { //Если файл загружен, но он не аудио
        //     this.props.setValidation('isAudioTypeWrong', true)
        //     this.props.changeCreate(false)
        // }
    }
    createArtifact() {
        this.props.createArtifact(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name, this.props.img_1, this.props.img_2, this.props.img_3, this.props.img_4, this.props.img_5, this.props.description,
            this.props.audio_1, this.props.audio_2, this.props.audio_3, this.props.audio_4, this.props.audio_5,
            this.props.link_name_1, this.props.link_name_2, this.props.link_name_3, this.props.link_name_4, this.props.link_name_5,
            this.props.link_value_1, this.props.link_value_2, this.props.link_value_3, this.props.link_value_4, this.props.link_value_5
        )
    }

    render() {
        if(this.state.isCreate) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}/${this.props.match.params.hall_id}`} />
        }

        return (
            <ChangeForm text={'Создание экспоната'} {...this.props}
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
