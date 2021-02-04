import React from 'react';
import {connect} from "react-redux";
import PrintList from "./PrintList";
import {clearPdf, deleteOneArtifact, printArtifacts, removeArtifactsToPrint} from "../../../redux/museum-reducer";
import {compose} from "redux";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";
import {Route, withRouter} from "react-router-dom";


class PrintListContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "large",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.printArtifacts = this.printArtifacts.bind(this)
    }

    printArtifacts() {
        this.props.printArtifacts(this.props.print, this.state.name)
    }

    handleSubmit(e) {
        let name = e.target.name

        this.setState({
            name: name
        })
    }

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
            <PrintList {...this.props} name={this.state.name} handleSubmit={this.handleSubmit} printArtifacts={this.printArtifacts} />
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
    withRouter,
    WithAdminRedirect,
)(PrintListContainer)
