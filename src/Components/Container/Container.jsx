import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import ScannerContainer from "./Scanner/ScannerContainer";


class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            // <Switch>
                <ScannerContainer />
            // {/*</Switch>*/}
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);

//{/*<Route exact path='/' render={ () => <MainContainer />} />*/}
//                 {/*<Route exact path='/' render={ () => <ScannerContainer />} />*/}
