import React from 'react';
import {connect} from "react-redux";
import Artifact from "./Artifact";
import {Route, Switch, withRouter} from "react-router-dom";
import {getArtifactData} from "../../../redux/artifact";
import Preloader from "../../../Common/Preloader/Preloader";
import QrCode from "./QrCode/QrCode";

class ArtifactContainer extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.getArtifactData(id)
    }

    render() {
        // debugger
        // if(this.props.artifactData === undefined) {
        //     return <Preloader />
        // }

        return (
            <Switch>
                <Route exact path='/artifacts/:id/Qr-code' render={ () => <QrCode name={this.props.artifactData.name}
                                                                                  id={this.props.artifactData.id}
                                                                                  history={this.props.history}
                                                                                  // qr={this.props.artifactData.qr}
                                                                          />}
                />

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
