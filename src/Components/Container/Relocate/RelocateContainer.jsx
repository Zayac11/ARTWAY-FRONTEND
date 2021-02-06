import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";
import {getMuseumData} from "../../../redux/museum-reducer";
import {withRouter} from "react-router-dom";
import {relocateArtifact} from "../../../redux/artifact-reducer";
import {getLocationData} from "../../../redux/location-reducer";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import s from './Relocate.module.css'
import prev from "../../../assets/images/left-chevron.svg";
import BackBtn from "../../../Common/BackBtn/BackBtn";

class RelocateContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            artifact_id: '',
            isRelocated: false,

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
        this.props.toggleRelocate()

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
        // if(this.state.isRelocated) {
        //     return <Redirect to={`/m-admin/${this.props.match.params.location_id}/${this.props.match.params.hall_id}`} />
        // }
        return (
            <>
                <div className={s.relocateContainer}>
                    <div className={s.top}>
                        <BackBtn history={this.props.history} />

                        <h2 className={s.title}>
                            Перемещение экспоната
                        </h2>
                    </div>

                    {
                        (!this.state.isLocationSelected && !this.state.isHallSelected) &&
                            <>
                                <div className={'titleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список локаций
                                    </h2>
                                </div>
                                {
                                    this.props.locations &&
                                    this.props.locations.map(l => {

                                        return (
                                            <div className={'locationContainer'} key={l.id}>
                                                <div onClick={() => this.selectLocation(l.id)}>
                                                    <div className={s.cover}></div>
                                                    <MuseumCard link={'#'} isUserMuseumAdmin={false} id={l.id} name={l.name} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                    {
                        (!this.state.isHallSelected && this.state.isLocationSelected) &&
                        <>
                            <div className={'titleContainer'}>
                                <h2 className={'itemsTitle'}>
                                    Список залов
                                </h2>
                            </div>
                            {
                                this.props.halls &&
                                this.props.halls.map(l => {

                                    return (
                                        <div className={'locationContainer'} key={l.id}>
                                            <div onClick={() => this.selectHall(l.id)}>
                                                <div className={s.cover}></div>
                                                <MuseumCard link={'#'} isUserMuseumAdmin={false} id={l.id} name={l.name} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </>
        )
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
