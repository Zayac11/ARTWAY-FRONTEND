import React from 'react';
import {connect} from "react-redux";
import Top from "./Top";

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

export default connect(mapStateToProps,{})(TestContainer);
