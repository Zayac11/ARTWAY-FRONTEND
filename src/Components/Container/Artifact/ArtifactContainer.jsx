import React from 'react';
import {connect} from "react-redux";
import Artifact from "./Artifact";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {deleteArtifact, getArtifactData, updateArtifactData,} from "../../../redux/museum-reducer";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";

class ArtifactContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            // isChanged: false, //Поле, нужно для артефактов для дополнительной проверки изменения аудиофайла
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

        return (
            <Artifact handleChangeInputs={this.props.handleChangeInputs}
                      handleSubmit={this.props.handleSubmit}
                      deleteArtifact={this.deleteArtifact}
                      swapArtifacts={this.swapArtifacts}
                      toggleIsChanging={this.props.toggleIsChanging}
                      handleChange={this.props.handleChange}
                      handleChangeFile={this.props.handleChangeFile}
                      isPhotoTypeWrong={this.props.isPhotoTypeWrong}
                      isAudioTypeWrong={this.props.isAudioTypeWrong}
                      isChanging={this.props.isChanging}
                      isChanged={this.state.isChanged}
                      isEmptyInputs={this.props.isEmptyInputs}
                      name={this.props.name}
                      description={this.props.description}
                      audio={this.props.audio}
                      main_audio={this.props.main_audio}
                      img={this.props.img}
                      main_img={this.props.main_img}
                      location_id={this.props.match.params.location_id}
                      hall_id={this.props.match.params.hall_id}
                      artifactData={this.props.artifactData}
                      history={this.props.history}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactData: state.museum.artifactData
    }
}

export default compose(
    connect(mapStateToProps, {getArtifactData, updateArtifactData, deleteArtifact}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(ArtifactContainer)

