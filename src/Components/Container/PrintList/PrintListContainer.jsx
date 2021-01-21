import React from 'react';
import {connect} from "react-redux";
import PrintList from "./PrintList";
import {deleteOneArtifact, printArtifacts, removeArtifactsToPrint} from "../../../redux/museum-reducer";
import {compose} from "redux";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";


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
        print: state.museum.print,
        pdf: state.museum.pdf,
    }
}


export default compose(
    connect(mapStateToProps, {removeArtifactsToPrint, deleteOneArtifact, printArtifacts}),
    WithAdminRedirect,
)(PrintListContainer)
