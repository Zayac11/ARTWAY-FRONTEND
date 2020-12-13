import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Main from "./Main/Main";
import Transition from "./Transition/Transition";
import ArtifactContainer from "./Artifact/ArtifactContainer";

class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={ () => <Main />} />
                <Route exact path='/enter' render={ () => <Transition />} />
                <Route exact path='/scan' render={ () => <Transition />} />
                <Route exact path='/artifact/:id' render={ () => <ArtifactContainer />} />
            </Switch>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);
