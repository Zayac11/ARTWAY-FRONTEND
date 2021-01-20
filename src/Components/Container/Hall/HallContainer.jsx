import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import Hall from "./Hall";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {deleteHall, getHallData, swapArtifacts, updateHallData} from "../../../redux/hall-reducer";

class HallContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDeleted: false,
        }

        this.updateHall = this.updateHall.bind(this)
        this.deleteHall = this.deleteHall.bind(this)
        this.swapArtifacts = this.swapArtifacts.bind(this)
    }

    deleteHall() {
        this.props.deleteHall(this.props.match.params.location_id, this.props.match.params.hall_id)
        this.setState({
            isDeleted: true,
        })
    }

    updateHall() {
        this.props.updateHallData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name, this.props.img, this.props.description)
        this.props.setImage('')
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapArtifacts(swap_type, location_id) {
        this.props.swapArtifacts(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.hallData !== this.props.hallData) {
            this.props.updateState(this.props.match.params.location_id, this.props.hallData.name, this.props.hallData.description, this.props.hallData.img, '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateHall()
        }
    }

    componentDidMount() {
        this.props.getHallData(this.props.match.params.location_id, this.props.match.params.hall_id)
    }

    render() {
        if(this.state.isDeleted) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}`} />
        }

        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }

        return (
            <Hall handleChangeInputs={this.props.handleChangeInputs}
                  handleSubmit={this.props.handleSubmit}
                  deleteHall={this.deleteHall}
                  swapArtifacts={this.swapArtifacts}
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
                  location_id={this.props.match.params.location_id}
                  hall_id={this.props.match.params.hall_id}
                  artifacts={this.props.artifacts}
            />

        );
    }
}

let mapStateToProps = (state) => {
    return {
        artifacts: state.hall.artifacts,
        hallData: state.hall.hallData,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
    }
}

export default compose(
    connect(mapStateToProps, {getHallData, updateHallData, deleteHall, swapArtifacts}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(HallContainer)
