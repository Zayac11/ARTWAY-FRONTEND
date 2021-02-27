import React from 'react';
import {connect} from "react-redux";
import Top from "./Top";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class TestContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Top {...this.props} />

        );
    }

}

let mapStateToProps = (state) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps,{}),
    withRouter
)
(TestContainer)
