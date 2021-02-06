import React from 'react';
import {connect} from "react-redux";
import Artifact from "./Artifact";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {deleteArtifact, getArtifactData, updateArtifactData} from "../../../redux/artifact-reducer";
import {getUserArtifactData} from "../../../redux/user-reducer";
import {addArtifactToPrint, deleteOneArtifact} from "../../../redux/museum-reducer";
import Preloader from "../../../Common/Preloader/Preloader";

class ArtifactContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false, //Удалился ли экспонат
            isRelocate: false, //Происходит ли перемещение экспоната
        }
        this.updateArtifact = this.updateArtifact.bind(this)
        this.deleteArtifact = this.deleteArtifact.bind(this)
        this.swapArtifacts = this.swapArtifacts.bind(this)
        this.checkAudio = this.checkAudio.bind(this)
        this.toggleRelocate = this.toggleRelocate.bind(this)
    }

    deleteArtifact() {
        this.props.deleteArtifact(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id)
        this.setState({
            isDeleted: true,
        })
    }
    toggleRelocate() {
        this.setState({
            isRelocate: !this.state.isRelocate,
        })
    }

    checkAudio() {
        let vid = /^(ftp|http|https):\/\/[^ "]+$/
        if(/audio/.test(this.props.audio.type) && (vid.test(this.props.video) || this.props.video === '')) { //Если нет ошибки в формате файла и видео - корректная ссылка или пустая строка
            this.updateArtifact()
        }
        else if(this.props.audio === '') { //Если аудио не заполнено, то присваивается старая ссылка
            this.props.setAudio(this.props.main_audio)
            this.updateArtifact()
        }
        else if(!vid.test(this.props.video)) { //Если аудио не заполнено, то присваивается старая ссылка
            this.props.changeCreate(false)
            this.props.toggleIsChanging(true)
            this.props.setValidation('isVideoUrlWrong', true)
        }
        else { //Если файл загружен, но он не аудио
            this.props.changeCreate(false)
            this.props.toggleIsChanging(true)
            this.props.setValidation('isAudioTypeWrong', true)
        }
    }

    updateArtifact() {
        this.props.updateArtifactData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id,this.props.name, this.props.img, this.props.description, this.props.audio, this.props.video)
        this.props.setImage('') //Зануляем картинку
        this.props.setAudio('') //Зануляем аудиофайл
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapArtifacts(swap_type, location_id) {
        this.props.swapArtifacts(swap_type, location_id)
    }

    componentDidMount() {
        //Данные об экспонате
        if(this.props.isUserMuseumAdmin) {
            this.props.getArtifactData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id)
        }
        else {
            this.props.getUserArtifactData(this.props.match.params.artifact_id)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.artifactData !== this.props.artifactData) {
            this.props.updateState(this.props.match.params.location_id, this.props.artifactData.name, this.props.artifactData.description, this.props.artifactData.img, this.props.artifactData.audio, this.props.artifactData.video)
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.checkAudio()
        }

    }

    render() {
        if(this.props.isArtifactError) {
            return <Redirect to={'/enter'} />
        }

        if(!this.props.artifactData.hall) {
            return  <Preloader />
        }


        if(this.state.isDeleted) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}/${this.props.match.params.hall_id}`} />
        }

        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }

        return (
            <Artifact {...this.props}
                      deleteArtifact={this.deleteArtifact}
                      swapArtifacts={this.swapArtifacts}
                      toggleRelocate={this.toggleRelocate}
                      isRelocate={this.state.isRelocate}
                      location_id={this.props.match.params.location_id}
                      hall_id={this.props.match.params.hall_id}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactData: state.artifact.artifactData,
        isArtifactError: state.user.isArtifactError,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        print: state.museum.print,
    }
}

export default compose(
    connect(mapStateToProps, {getArtifactData, updateArtifactData, addArtifactToPrint, deleteOneArtifact, deleteArtifact, getUserArtifactData}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(ArtifactContainer)

