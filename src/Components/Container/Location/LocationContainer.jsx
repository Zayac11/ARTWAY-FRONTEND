import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Location from "./Location";
import {deleteLocation, getLocationData, updateLocationData} from "../../../redux/museum-reducer";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";

class LocationContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteLocation = this.deleteLocation.bind(this)
    }

    deleteLocation() {
        this.props.deleteLocation(this.props.match.params.location_id)
    }

    handleSubmit() {
        if(this.props.description === '' || this.props.name === '') {
            this.props.setValidation('isEmptyInputs', true)
        }
        else if(this.props.img.type === '') {
            this.props.toggleIsChanging(false)
            this.props.updateLocationData(this.props.match.params.location_id, this.props.name, this.props.main_img, this.props.description)
        }
        else if(/image/.test(this.props.img.type)) {
            this.props.toggleIsChanging(false)
            this.props.updateLocationData(this.props.match.params.location_id, this.props.name, this.props.img, this.props.description)
        }
        else {
            this.props.setValidation('isPhotoTypeWrong', true)
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.locationData !== this.props.locationData) {
            this.props.updateState(this.props.match.params.location_id, this.props.locationData.name, this.props.locationData.description, this.props.locationData.img)

        }
    }

    componentDidMount() {
        this.props.getLocationData(this.props.match.params.location_id)
    }

    render() {
        return (
            <Location handleChangeInputs={this.props.handleChangeInputs}
                      handleSubmit={this.handleSubmit}
                      deleteLocation={this.deleteLocation}
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
            />

        );
    }

}

let mapStateToProps = (state) => {
    return {
        locationData: state.museum.locationData,
    }
}

export default compose(
    connect(mapStateToProps, {getLocationData, updateLocationData, deleteLocation}),
    withRouter,
    CommonMuseumLogic
)(LocationContainer)
