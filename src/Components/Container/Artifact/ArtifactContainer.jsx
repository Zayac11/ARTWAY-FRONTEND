import React from 'react';
import {connect} from "react-redux";
import Artifact from "./Artifact";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {deleteArtifact, getArtifactData, updateArtifactData} from "../../../redux/artifact-reducer";

class ArtifactContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
        }
        this.updateArtifact = this.updateArtifact.bind(this)
        this.deleteArtifact = this.deleteArtifact.bind(this)
        this.swapArtifacts = this.swapArtifacts.bind(this)
        this.checkAudio = this.checkAudio.bind(this)
    }

    deleteArtifact() {
        this.props.deleteArtifact(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id)
        this.setState({
            isDeleted: true,
        })
    }

    checkAudio() {
        if(/audio/.test(this.props.audio.type)) { //Если нет ошибки в формате файла
            this.updateArtifact()
        }
        else if(this.props.audio === '') { //Если аудио не заполнено, то присваивается старая ссылка
            this.props.setAudio(this.props.main_audio)
            this.updateArtifact()
        }
        else { //Если файл загружен, но он не аудио

            this.props.changeCreate(false)
            this.props.toggleIsChanging(true)
            this.props.setValidation('isAudioTypeWrong', true)
        }
    }

    updateArtifact() {

        this.props.updateArtifactData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id,this.props.name, this.props.img, this.props.description, this.props.audio)
        this.props.setImage('') //Зануляем картинку
        this.props.setAudio('') //Зануляем аудиофайл
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapArtifacts(swap_type, location_id) {
        this.props.swapArtifacts(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.artifactData !== this.props.artifactData) {
            this.props.updateState(this.props.match.params.location_id, this.props.artifactData.name, this.props.artifactData.description, this.props.artifactData.img, this.props.artifactData.audio)
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.checkAudio()
        }
    }

    componentDidMount() {
        //Данные об экспонате
        this.props.getArtifactData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id)
    }

    render() {

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
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactData: state.artifact.artifactData,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
    }
}

export default compose(
    connect(mapStateToProps, {getArtifactData, updateArtifactData, deleteArtifact}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(ArtifactContainer)

