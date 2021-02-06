import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Information from "./Information";

class InformationContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Information {...this.props} />
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter,
)(InformationContainer)
