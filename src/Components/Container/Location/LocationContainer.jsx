import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Location from "./Location";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {deleteLocation, getLocationData, swapHalls, updateLocationData} from "../../../redux/location-reducer";

class LocationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
        }
        this.updateLocation = this.updateLocation.bind(this)
        this.deleteLocation = this.deleteLocation.bind(this)
        this.swapHalls = this.swapHalls.bind(this)
    }

    deleteLocation() {
        this.props.deleteLocation(this.props.match.params.location_id)
        this.setState({
            isDeleted: true,
        })
    }

    updateLocation() {
        this.props.updateLocationData(this.props.match.params.location_id, this.props.name, this.props.img, this.props.description)
        this.props.setImage('')
        this.props.changeCreate(false)
    }

    swapHalls(swap_type, location_id) {
        this.props.swapHalls(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.locationData !== this.props.locationData) {
            this.props.updateState(this.props.match.params.location_id, this.props.locationData.name, this.props.locationData.description, this.props.locationData.img, '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight){
            this.updateLocation()

        }
    }

    componentDidMount() {
        // if()
        this.props.getLocationData(this.props.match.params.location_id)
    }

    render() {
        if(this.state.isDeleted) {
            return <Redirect to={'/m-admin'} />
        }
        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }

        return (
            <Location handleChangeInputs={this.props.handleChangeInputs}
                      handleSubmit={this.props.handleSubmit}
                      deleteLocation={this.deleteLocation}
                      swapHalls={this.swapHalls}
                      toggleIsChanging={this.props.toggleIsChanging}
                      handleChange={this.props.handleChange}
                      handleChangeFile={this.props.handleChangeFile}
                      isPhotoTypeWrong={this.props.isPhotoTypeWrong}
                      isChanging={this.props.isChanging}
                      isEmptyInputs={this.props.isEmptyInputs}
                      name={this.props.name}
                      description={this.props.description}
                      img={this.props.img}
                      main_img={this.props.main_img}
                      halls={this.props.halls}
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
    }
}

export default compose(
    connect(mapStateToProps, {getLocationData, updateLocationData, deleteLocation, swapHalls}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(LocationContainer)
