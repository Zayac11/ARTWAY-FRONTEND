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
            isRelocated: false, //Перемещен ли экспонат
        }
        this.updateArtifact = this.updateArtifact.bind(this)
        this.deleteArtifact = this.deleteArtifact.bind(this)
        this.swapArtifacts = this.swapArtifacts.bind(this)
        this.checkAudio = this.checkAudio.bind(this)
        this.checkVideo = this.checkVideo.bind(this)
        this.toggleRelocate = this.toggleRelocate.bind(this)
        this.setIsRelocated = this.setIsRelocated.bind(this)
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
    setIsRelocated(isRelocated) {
        this.setState({
            isRelocated: isRelocated,
        })
    }

    checkVideo() {
        let vid = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/

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

        if(this.props.link_name_1 === '' && this.props.link_name_2 === '' && this.props.link_name_3 === '' && this.props.link_name_4 === '' && this.props.link_name_5 === '')
        {
            this.checkAudio()
        }

    }

    checkAudio() {

        //Если аудио нет вообще пустая
        if(this.props.audio_1 === null && this.props.audio_2 === null && this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
            this.props.changeCreate(false)
            this.props.toggleIsChanging(true)
            this.props.setValidation('isAudioTypeWrong', true)
        }
        //Если картинка заполнена и она не является изображением
        else if(this.props.audio_1 !== null) {
            if(!/audio/.test(this.props.audio_1.type) && !this.props.audio_1.length) {
                this.props.changeCreate(false)
                this.props.toggleIsChanging(true)
                this.props.setValidation('isAudioTypeWrong', true)
            }
            else if (this.props.audio_2 === null && this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
                this.updateArtifact()
                this.props.toggleIsChanging(false)
            }
        }
        if(this.props.audio_2 !== null) {
            if(!/audio/.test(this.props.audio_2.type) && !this.props.audio_2.length) {
                this.props.changeCreate(false)
                this.props.toggleIsChanging(true)
                this.props.setValidation('isAudioTypeWrong', true)
            }
            else if (this.props.audio_3 === null && this.props.audio_4 === null && this.props.audio_5 === null) {
                this.updateArtifact()
                this.props.toggleIsChanging(false)
            }
        }
        if(this.props.audio_3 !== null) {
            if(!/audio/.test(this.props.audio_3.type) && !this.props.audio_3.length) {
                this.props.changeCreate(false)
                this.props.toggleIsChanging(true)
                this.props.setValidation('isAudioTypeWrong', true)
            }
            else if (this.props.audio_4 === null && this.props.audio_5 === null) {
                this.updateArtifact()
                this.props.toggleIsChanging(false)
            }
        }
        if(this.props.audio_4 !== null) {
            if(!/audio/.test(this.props.audio_4.type) && !this.props.audio_4.length) {
                this.props.changeCreate(false)
                this.props.toggleIsChanging(true)
                this.props.setValidation('isAudioTypeWrong', true)
            }
            else if (this.props.audio_5 === null) {
                this.updateArtifact()
                this.props.toggleIsChanging(false)
            }
        }

        if(this.props.audio_5 !== null) {
            if(!/audio/.test(this.props.audio_5.type) && !this.props.audio_5.length) {
                this.props.changeCreate(false)
                this.props.toggleIsChanging(true)
                this.props.setValidation('isAudioTypeWrong', true)
            }
            else {
                this.updateArtifact()
                this.props.toggleIsChanging(false)
            }
        }
    }

    updateArtifact() {
        this.props.updateArtifactData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.match.params.artifact_id,this.props.name,
            this.props.img_1, this.props.img_2, this.props.img_3, this.props.img_4, this.props.img_5, this.props.description,
            this.props.audio_1, this.props.audio_2, this.props.audio_3, this.props.audio_4, this.props.audio_5,
            this.props.link_name_1, this.props.link_name_2, this.props.link_name_3, this.props.link_name_4, this.props.link_name_5,
            this.props.link_value_1, this.props.link_value_2, this.props.link_value_3, this.props.link_value_4, this.props.link_value_5
            )
        this.props.setArtifactImages(null,null,null,null,null) //Зануляем картинки
        this.props.setArtifactAudios(null,null,null,null,null) //Зануляем аудио
        this.props.changeCreate(false) //Больше не изменяем
        this.props.deleteOneArtifact(this.props.match.params.artifact_id)
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
            this.props.updateState(this.props.match.params.location_id, this.props.artifactData.name, this.props.artifactData.description, '', this.props.artifactData.audio, this.props.artifactData.video, 1, '', this.props.images_massive)
            this.props.setArtifactImages(this.props.artifactData.img_1, this.props.artifactData.img_2, this.props.artifactData.img_3, this.props.artifactData.img_4, this.props.artifactData.img_5)
            this.props.setArtifactAudios(this.props.artifactData.audio_1, this.props.artifactData.audio_2, this.props.artifactData.audio_3, this.props.artifactData.audio_4, this.props.artifactData.audio_5)
            this.props.setVideos(this.props.artifactData.link_value_1, this.props.artifactData.link_value_2, this.props.artifactData.link_value_3, this.props.artifactData.link_value_4, this.props.artifactData.link_value_5,
            this.props.artifactData.link_name_1, this.props.artifactData.link_name_2, this.props.artifactData.link_name_3, this.props.artifactData.link_name_4, this.props.artifactData.link_name_5
                )
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.checkVideo()
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

        if(this.props.isFetch && !this.state.isRelocate) {
            return <Preloader />
        }

        return (
            <Artifact {...this.props}
                      deleteArtifact={this.deleteArtifact}
                      swapArtifacts={this.swapArtifacts}
                      toggleRelocate={this.toggleRelocate}
                      setIsRelocated={this.setIsRelocated}
                      isRelocate={this.state.isRelocate}
                      isRelocated={this.state.isRelocated}
                      location_id={this.props.match.params.location_id}
                      hall_id={this.props.match.params.hall_id}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactData: state.artifact.artifactData,
        images_massive: state.artifact.images,
        isArtifactError: state.user.isArtifactError,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        isFetch: state.auth.isFetch,
        print: state.museum.print,
    }
}

export default compose(
    connect(mapStateToProps,
        {getArtifactData, updateArtifactData, addArtifactToPrint,
            deleteOneArtifact, deleteArtifact, getUserArtifactData}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(ArtifactContainer)

