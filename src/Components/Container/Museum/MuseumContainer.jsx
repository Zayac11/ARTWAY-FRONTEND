import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {getMuseumData} from "../../../redux/museum-reducer";

class MuseumContainer extends React.Component {

    componentDidMount() {
        this.props.getMuseumData()
    }

    render() {
        return (
            <Museum />

        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{getMuseumData})(MuseumContainer);
