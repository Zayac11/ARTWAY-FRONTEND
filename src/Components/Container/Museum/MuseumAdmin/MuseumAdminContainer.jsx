import React from 'react';
import {connect} from "react-redux";
import MuseumAdmin from "./MuseumAdmin";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    createMuseumSuperAdmin,
    deleteMuseumSuperAdmin,
    getMuseumSuperAdmin
} from "../../../../redux/serviceAdmin-reducer";
import {CommonCreateWorkerLogic} from "../../../../hoc/CommonCreateWorkerLogic";

class MuseumAdminContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isChanging: false,
        }

        this.toggleIsChanging = this.toggleIsChanging.bind(this)
    }

    toggleIsChanging() {
        this.setState({
            isChanging: !this.state.isChanging,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight) {
            this.props.createMuseumSuperAdmin(
                this.props.last_name,
                this.props.first_name,
                this.props.middle_name,
                this.props.email,
                this.props.password,
                this.props.museum_id,
            )
            this.toggleIsChanging()
        }
    }

    componentDidMount() {
        this.props.getMuseumSuperAdmin(this.props.museum_id)
    }

    render() {
        return (
            <MuseumAdmin {...this.props} museumAdminData={this.props.museumAdminData}
                         deleteMuseumSuperAdmin={this.props.deleteMuseumSuperAdmin}
                         museum_id={this.props.museum_id}
                         isChanging={this.state.isChanging}
                         toggleIsChanging={this.toggleIsChanging} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museumAdminData: state.service.museumAdminData,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumSuperAdmin, createMuseumSuperAdmin, deleteMuseumSuperAdmin}),
    withRouter,
    CommonCreateWorkerLogic,
)(MuseumAdminContainer)
