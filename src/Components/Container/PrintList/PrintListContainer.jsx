import React from 'react';
import {connect} from "react-redux";
import PrintList from "./PrintList";
import {clearPdf, deleteOneArtifact, printArtifacts, removeArtifactsToPrint} from "../../../redux/museum-reducer";
import {compose} from "redux";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";
import {Route} from "react-router-dom";


class PrintListContainer extends React.Component {

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.pdf !== this.props.pdf) {
            this.props.clearPdf()
        }
    }

    render() {
        if(this.props.pdf !== '') {
            return <Route path={'/'} component={() => { window.open(this.props.pdf); return <PrintList {...this.props} />} }/>
        }
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
    connect(mapStateToProps, {removeArtifactsToPrint, deleteOneArtifact, printArtifacts, clearPdf}),
    WithAdminRedirect,
)(PrintListContainer)
