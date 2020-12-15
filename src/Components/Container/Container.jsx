import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Main from "./Main/Main";
import Transition from "./Transition/Transition";
import ArtifactContainer from "./Artifact/ArtifactContainer";
import PreloaderLogo from "../../Common/PreloaderLogo/PreloaderLogo";
import ArtifactsListContainer from "./ArtifactsListContainer/ArtifactsListContainer";

class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
            <PreloaderLogo />
                <Switch>
                    <Route exact path='/' render={ () => <Main />} />

                    <Route exact path='/enter' render={ () => <Transition />} />
                    <Route exact path='/scan' render={ () => <Transition />} />

                    <Route exact path='/artifacts' render={ () => <ArtifactsListContainer />} />
                    <Route path='/artifacts/:id' render={ () => <ArtifactContainer />} />

                    {/*<Route exact path='/test' render={ () => <TestContainer />} />*/}
                </Switch>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);
