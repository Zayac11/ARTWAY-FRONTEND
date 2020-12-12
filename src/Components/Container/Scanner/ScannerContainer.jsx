import React from 'react';
import {connect} from "react-redux";
import Test from "./Test";

class TestContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Test />
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(TestContainer);
