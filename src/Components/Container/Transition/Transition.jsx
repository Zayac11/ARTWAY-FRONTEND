import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import ScannerContainer from "../Scanner/ScannerContainer";
import Top from "./Top/Top";
import Enter from "./Enter/Enter";
import s from './Transition.module.css'

class Transition extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className={s.container}>
                <div className={`${s.blueBlur} ${s.blur}`}></div>
                <div className={`${s.orangeBlur} ${s.blur}`}></div>
                <Top />
                <Route exact path='/scan' render={ () => <ScannerContainer />} />
                <Route exact path='/enter' render={ () => <Enter />} />
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Transition);
