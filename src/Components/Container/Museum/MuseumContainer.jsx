import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {Redirect, withRouter} from "react-router-dom";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {compose} from "redux";
import {getMuseumData, getUsersLocationsList, swapLocations, updateMuseumData} from "../../../redux/museum-reducer";
import {createLocation} from "../../../redux/location-reducer";
import MuseumAdminContainer from "./MuseumAdmin/MuseumAdminContainer";
import Preloader from "../../../Common/Preloader/Preloader";

class MuseumContainer extends React.Component {

    constructor(props) {
        super(props);

        this.swapLocations = this.swapLocations.bind(this)
        this.updateMuseum = this.updateMuseum.bind(this)
        this.createLocation = this.createLocation.bind(this)
    }
    createLocation() {
        this.props.createLocation('Новая локация')
    }
    updateMuseum() {
        this.props.updateMuseumData(this.props.id, this.props.name, this.props.img, this.props.description, this.props.ticket_lifetime)
        this.props.setImage('')
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapLocations(swap_type, location_id) {
        this.props.swapLocations(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.museumData !== this.props.museumData) {
            this.props.updateState(this.props.museumData.id, this.props.museumData.name, this.props.museumData.description, this.props.museumData.img, '', '', this.props.museumData.ticket_lifetime, '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateMuseum()
        }
    }

    componentDidMount() {
        if(this.props.isUserMuseumAdmin) {
            this.props.getMuseumData()
        }
        else if(!this.props.isUserServiceAdmin) {
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
                <MuseumAdminContainer museum_id={this.props.match.params.museum_id}/>
            )
        }

        if(this.props.isFetch) {
            return <Preloader />
        }

        return (
            <Museum {...this.props}
                    swapLocations={this.swapLocations}
                    createLocation={this.createLocation}
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
        isFetch: state.auth.isFetch,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumData, updateMuseumData, swapLocations, getUsersLocationsList, createLocation}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(MuseumContainer)
