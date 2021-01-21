import React from 'react';
import {connect} from "react-redux";
import PrintList from "./PrintList";
import {removeArtifactsToPrint} from "../../../redux/museum-reducer";


class PrintListContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <PrintList {...this.props} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        print: state.museum.print
    }
}

export default connect(mapStateToProps,{removeArtifactsToPrint})(PrintListContainer);
