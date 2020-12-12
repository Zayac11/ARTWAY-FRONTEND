import React from 'react';
import {connect} from "react-redux";
import Scanner from "./Scanner";

class ScannerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            link: ""
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <Scanner handleChange={this.handleChange} />
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(ScannerContainer);
