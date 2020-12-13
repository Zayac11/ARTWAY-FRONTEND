import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Main from "./Main/Main";
import Transition from "./Transition/Transition";


class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={ () => <Main />} />
                <Route exact path='/enter' render={ () => <Transition />} />
                <Route exact path='/scan' render={ () => <Transition />} />
            </Switch>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);
