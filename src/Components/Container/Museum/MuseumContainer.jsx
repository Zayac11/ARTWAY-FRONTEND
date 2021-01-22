import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {Redirect, withRouter} from "react-router-dom";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {compose} from "redux";
import {getMuseumData, getUsersLocationsList, swapLocations, updateMuseumData} from "../../../redux/museum-reducer";
import MuseumAdminContainer from "./MuseumAdmin/MuseumAdminContainer";

class MuseumContainer extends React.Component {

    constructor(props) {
        super(props);

        this.swapLocations = this.swapLocations.bind(this)
        this.updateMuseum = this.updateMuseum.bind(this)
    }

    updateMuseum() {
        this.props.updateMuseumData(this.props.id, this.props.name, this.props.img, this.props.description)
        this.props.setImage('')
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapLocations(swap_type, location_id) {
        this.props.swapLocations(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.museumData !== this.props.museumData) {
            this.props.updateState(this.props.museumData.id, this.props.museumData.name, this.props.museumData.description, this.props.museumData.img, '', '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateMuseum()
        }
    }

    componentDidMount() {
        if(this.props.isUserMuseumAdmin) {
            this.props.getMuseumData()
        }
        else {
            let token = localStorage.getItem('token')
            this.props.getUsersLocationsList(token)
        }
    }

    render() {
        //Если пользователь перешел по адресу, не являясь администратором музея
        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }
        //Если пользователь перешел по адресу, не являясь сервисным администратором
        if((this.props.match.url.includes('/s-admin')) && (!this.props.isUserServiceAdmin)) {
            return <Redirect to={'/'} />
        }

        // Если пользователь сервисный администратор

        if(this.props.isUserServiceAdmin) {
            return (
                <MuseumAdminContainer museum_id={this.props.match.params.museum_id} />
            )
        }

        return (
            <Museum {...this.props}
                    swapLocations={this.swapLocations}

            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        museumData: state.museum.museumData,
        locations: state.museum.locations,
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumData, updateMuseumData, swapLocations, getUsersLocationsList}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(MuseumContainer)
