import React from 'react';
import {connect} from "react-redux";
import MuseumAdmin from "./MuseumAdmin";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {
    createMuseumSuperAdmin, deleteMuseum,
    deleteMuseumSuperAdmin,
    getMuseumSuperAdmin
} from "../../../../redux/serviceAdmin-reducer";
import {CommonCreateWorkerLogic} from "../../../../hoc/CommonCreateWorkerLogic";

class MuseumAdminContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isChanging: false, //Идет ли изменение
            isDeleted: false, //Удален ли музей
        }
        this.deleteMuseum = this.deleteMuseum.bind(this)
        this.toggleIsChanging = this.toggleIsChanging.bind(this)
    }

    deleteMuseum() {
        this.props.deleteMuseum(this.props.museum_id)
        this.setState({
            isDeleted: true,
        })
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

        if(this.state.isDeleted) {
            return <Redirect to={'/s-admin'} />
        }

        return (
            <MuseumAdmin {...this.props}
                         deleteMuseum={this.deleteMuseum}
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
    connect(mapStateToProps, {getMuseumSuperAdmin, createMuseumSuperAdmin, deleteMuseumSuperAdmin, deleteMuseum}),
    withRouter,
    CommonCreateWorkerLogic,
)(MuseumAdminContainer)
