import React from 'react';
import {connect} from "react-redux";
import ArtifactsList from "./ArtifactsList";
import Preloader from "../../../Common/Preloader/Preloader";
import {withRouter} from "react-router-dom";

class ArtifactsListContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        //
        // if(this.props.artifactsList.length === 0) {
        //     return <Preloader />
        // }

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

export default connect(mapStateToProps,{})(WithUrlArtifactListContainer);
