import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonCreateLogic} from "../../../hoc/CommonCreateLogic";
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
        if(/audio/.test(this.props.audio.type)) { //Если нет ошибки в формате файла
            this.props.toggleIsChanging(false)
            this.createArtifact()
            this.setState({
                isCreate: true
            })
        }
        else if(this.props.audio === '') {
            this.props.setValidation('isAudioTypeWrong', true) //Ошибка в формате файла аудио
            this.props.changeCreate(false)
        }
        else { //Если файл загружен, но он не аудио
            this.props.setValidation('isAudioTypeWrong', true) //Ошибка в формате файла аудио
            this.props.changeCreate(false)
        }
    }
    createArtifact() {
        this.props.createArtifact(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name, this.props.img, this.props.description, this.props.audio)
    }

    render() {
        if(this.state.isCreate) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}/${this.props.match.params.hall_id}`} />
        }

        return (
            <ChangeForm handleSubmit={this.props.handleSubmit}
                        handleFindKey={this.props.handleFindKey}
                        handleFocus={this.props.handleFocus}
                        handleChange={this.props.handleChange}
                        handleChangeInputs={this.props.handleChangeInputs}
                        isEmptyInputs={this.props.isEmptyInputs}
                        isPhotoTypeWrong={this.props.isPhotoTypeWrong}
                        isAudioTypeWrong={this.props.isAudioTypeWrong}
                        handleChangeFile={this.props.handleChangeFile}
                        description={this.props.description}
                        name={this.props.name}
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
)(CreateArtifact)

//Оборачиваем компонент в компонент с общими полями, а так же в компонент с общей логикой создания
