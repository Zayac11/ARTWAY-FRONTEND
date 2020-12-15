import React from 'react';
import {connect} from "react-redux";
import Artifact from "./Artifact";
import {Switch, withRouter} from "react-router-dom";
import {getArtifactData} from "../../../redux/artifact";
import Preloader from "../../../Common/Preloader/Preloader";

class ArtifactContainer extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.getArtifactData(id) //данные об экспонате по id
    }

    render() {

        return (
            <Switch>
                <Artifact artifactData={this.props.artifactData} history={this.props.history} />
            </Switch>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        artifactData: state.artifact.artifactData
    }
}

let WithUrlArtifactContainer = withRouter(ArtifactContainer)

export default connect(mapStateToProps,{getArtifactData})(WithUrlArtifactContainer);
