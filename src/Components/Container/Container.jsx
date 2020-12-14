import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Main from "./Main/Main";
import Transition from "./Transition/Transition";
import ArtifactContainer from "./Artifact/ArtifactContainer";
import Audio from "../../Common/Audio/Audio";
import PreloaderLogo from "../../Common/PreloaderLogo/PreloaderLogo";
import s from "../../Common/PreloaderLogo/PreloaderLogo.module.css";
import mirea from "../../assets/images/MIREA_Gerb_Colour.png";

class Container extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state={
    //         hidden: true
    //     }
    // }

    componentDidMount() {

    }


    render() {
        // setTimeout(() =>
        // {
        //     this.setState({
        //         hidden: false
        //     })
        // }, 1000)
        //
        // if(this.state.hidden) {
        //     return
        // }

        return (
            <>
            <PreloaderLogo />
                <Switch>
                    <Route exact path='/' render={ () => <Main />} />

                    <Route exact path='/enter' render={ () => <Transition />} />
                    <Route exact path='/scan' render={ () => <Transition />} />

                    <Route exact path='/artifact/:id' render={ () => <ArtifactContainer />} />
                    <Route exact path='/test' render={ () => <PreloaderLogo />} />
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
