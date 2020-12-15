import React from 'react';
import {connect} from "react-redux";
import ArtifactsList from "./ArtifactsList";
import Preloader from "../../../Common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {getArtifactsList} from "../../../redux/artifact";

class ArtifactsListContainer extends React.Component {

    componentDidMount() {
        this.props.getArtifactsList() //список экспонатов
    }

    render() {
        if(!this.props.artifactsList) {
            return <Preloader />
        }

        return (
            <ArtifactsList artifactsList={this.props.artifactsList} history={this.props.history} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactsList: state.artifact.artifactsList,
    }
}

let WithUrlArtifactListContainer = withRouter(ArtifactsListContainer)

export default connect(mapStateToProps,{getArtifactsList})(WithUrlArtifactListContainer);
