import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";
import {getMuseumData} from "../../../redux/museum-reducer";
import {Redirect, withRouter} from "react-router-dom";
import Museum from "../Museum/Museum";
import Location from "../Location/Location";
import {relocateArtifact} from "../../../redux/artifact-reducer";
import {getLocationData} from "../../../redux/location-reducer";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";

class RelocateContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            location_id: '',
            hall_id: '',
            artifact_id: '',

            isRelocated: false, //Если перемещение прошло успешно
            isLocationSelected: false, //Если выбор локации произошел
            isHallSelected: false, //Если выбор зала произошел
        }
        this.selectHall = this.selectHall.bind(this)
        this.selectLocation = this.selectLocation.bind(this)
    }


    selectLocation(location_id) {
        this.props.getLocationData(location_id)
        this.setState({
            isLocationSelected: true,
        })
    }

    selectHall (hall_id) {
        this.props.relocateArtifact(hall_id, this.state.artifact_id)
        this.setState({
            isHallSelected: true,
            isRelocated: true,
        })
    }

    componentDidMount() {
        if(this.props.locations.length === 0) {
            this.props.getMuseumData()
        }
        this.setState({
            artifact_id: this.props.match.params.artifact_id,
            location_id: this.props.match.params.location_id,
            hall_id: this.props.match.params.hall_id,
        })
    }

    render() {
        if(!this.state.isLocationSelected) {
            return (
                <Museum locations={this.props.locations} name={this.props.museumData.name}
                        main_img={this.props.museumData.img} description={this.props.museumData.description}
                        selectLocation={this.selectLocation} isRelocate={true}/>
            );
        }
        else if(!this.state.isHallSelected) {
            return (
                <Location halls={this.props.halls} name={this.props.locationData.name} main_img={this.props.locationData.img}
                          description={this.props.locationData.description} selectHall={this.selectHall} isRelocate={true}/>
            );
        }
        else if(this.state.isRelocated) {
            return <Redirect to={`/m-admin/${this.state.location_id}/${this.state.hall_id}`} />
        }
    }

}

let mapStateToProps = (state) => {
    return {
        locations: state.museum.locations,
        museumData: state.museum.museumData,
        locationData: state.location.locationData,
        halls: state.location.halls,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumData, relocateArtifact, getLocationData}),
    withRouter,
    WithAdminRedirect,
)(RelocateContainer)
