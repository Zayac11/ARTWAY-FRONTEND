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
import BackBtn from "../../../Common/BackBtn/BackBtn";
import TopContainer from "../../../Common/Top/TopContainer";
import prev from "../../../assets/images/left-chevron.svg";
import desktop_arrow from "../../../assets/images/arrow_back_blue.svg";

class RelocateContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artifact_id: '',
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

    selectHall(hall_id) {
        this.props.relocateArtifact(hall_id, this.state.artifact_id)
        this.setState({
            isHallSelected: true,
        })
        this.props.toggleRelocate()
        this.props.setIsRelocated(true)
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
        return (
            <>
                <div className={s.relocateContainer}>
                    <TopContainer isUserMuseumAdmin={true} />
                    <div className={s.top}>

                        <button onClick={() => this.props.toggleRelocate(false)} className={'backBtn'}>
                            <img className={'prev'} src={prev} alt="back"/>
                            <img className={'arrow'} height={20} src={desktop_arrow} alt="back"/>
                        </button>

                        <h2 className={'pageTitle'}>
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
