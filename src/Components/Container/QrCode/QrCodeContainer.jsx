import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import QrCode from "./QrCode";
import {getArtifactData, getArtifactsQrCode} from "../../../redux/artifact";

class QrCodeContainer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id //id экспоната
        this.props.getArtifactsQrCode(id) //qr code экспоната по id
        if(!this.props.artifactData.id) {
            this.props.getArtifactData(id) //данные экспоната по id
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let id = this.props.match.params.id //id экспоната
        if(this.props.artifactData.id !== Math.floor(this.props.match.params.id)) { //Если не совпадают id предыдущего и текущего экспонатов
            this.props.getArtifactData(id) //данные экспоната по id
        }
    }

    render() {
        return (
            <QrCode history={this.props.history}
                    artifactQr={this.props.artifactQr}
                    name={this.props.artifactData.name}
                    id={this.props.artifactData.id}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactQr: state.artifact.artifactQr,
        artifactData: state.artifact.artifactData,
    }
}

let WithUrlQrContainer = withRouter(QrCodeContainer)

export default connect(mapStateToProps,{getArtifactsQrCode, getArtifactData})(WithUrlQrContainer);
