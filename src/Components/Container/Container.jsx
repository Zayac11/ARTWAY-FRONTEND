import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import ScannerContainer from "./Scanner/ScannerContainer";
import Main from "./Main/Main";


class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={ () => <Main />} />
                <Route exact path='/scan' render={ () => <ScannerContainer />} />
                <Route exact path='/enter' render={ () => <ScannerContainer />} />
            </Switch>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);
