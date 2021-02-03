import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Location from "./Location";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {
    deleteLocation,
    getLocationData,
    getUserHallsList,
    swapHalls,
    updateLocationData
} from "../../../redux/location-reducer";
import {createHall} from "../../../redux/hall-reducer";

class LocationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
        }
        this.updateLocation = this.updateLocation.bind(this)
        this.deleteLocation = this.deleteLocation.bind(this)
        this.swapHalls = this.swapHalls.bind(this)
        this.createLocation = this.createLocation.bind(this)
    }

    createLocation() {
        this.props.createHall(this.props.match.params.location_id, "Новый зал")
    }

    deleteLocation() {
        this.props.deleteLocation(this.props.match.params.location_id)
        this.setState({
            isDeleted: true,
        })
    }

    updateLocation() {
        this.props.updateLocationData(this.props.match.params.location_id, this.props.name)
        this.props.setImage('')
        this.props.changeCreate(false)
    }

    swapHalls(swap_type, location_id) {
        this.props.swapHalls(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.locationData !== this.props.locationData) {
            this.props.updateState(this.props.match.params.location_id, this.props.locationData.name, 'Описание', 'Картинка', '', '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight){
            this.updateLocation()

        }
    }

    componentDidMount() {
        if(this.props.isUserMuseumAdmin) { //Если пользватель - администратор
            this.props.getLocationData(this.props.match.params.location_id)
        }
        else {
            let token = localStorage.getItem('token') //Если у пользователя билет с токеном
            this.props.getUserHallsList(token, this.props.match.params.location_id)
        }

    }

    render() {
        if(this.state.isDeleted) {
            return <Redirect to={'/m-admin'} />
        }
        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }

        return (
            <Location {...this.props}
                      deleteLocation={this.deleteLocation}
                      swapHalls={this.swapHalls}
                      createLocation={this.createLocation}
                      location_id={this.props.match.params.location_id}
            />

        );
    }
}

let mapStateToProps = (state) => {
    return {
        locationData: state.location.locationData,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        halls: state.location.halls,
        locationName: state.location.locationName,
    }
}

export default compose(
    connect(mapStateToProps, {getLocationData, updateLocationData, deleteLocation, swapHalls, getUserHallsList, createHall}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(LocationContainer)
