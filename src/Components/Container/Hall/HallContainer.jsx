import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {
    deleteHall,
    getHallData,
    updateHallData,
} from "../../../redux/museum-reducer";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import Hall from "./Hall";

class HallContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDeleted: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteHall = this.deleteHall.bind(this)
        this.swapArtifacts = this.swapArtifacts.bind(this)
    }

    deleteHall() {
        this.props.deleteHall(this.props.match.params.location_id, this.props.match.params.hall_id)
        this.setState({
            isDeleted: true,
        })
    }

    handleSubmit() {
        if(this.props.description === '' || this.props.name === '') {
            this.props.setValidation('isEmptyInputs', true)
        }
        else if(this.props.img.type === '') {
            this.props.toggleIsChanging(false)
            this.props.updateHallData(this.props.match.params.location_id, this.props.match.params.hall_id,this.props.name, this.props.main_img, this.props.description)
        }
        else if(/image/.test(this.props.img.type)) {
            this.props.toggleIsChanging(false)
            this.props.updateHallData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name, this.props.img, this.props.description)
        }
        else {
            this.props.setValidation('isPhotoTypeWrong', true)
        }
    }

    swapArtifacts(swap_type, location_id) {
        // this.props.swapArtifacts(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.hallData !== this.props.hallData) {
            this.props.updateState(this.props.match.params.location_id, this.props.hallData.name, this.props.hallData.description, this.props.hallData.img)

        }
    }

    componentDidMount() {
        this.props.getHallData(this.props.match.params.location_id, this.props.match.params.hall_id)
    }

    render() {
        if(this.state.isDeleted) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}`} />
        }
        return (
            <Hall handleChangeInputs={this.props.handleChangeInputs}
                  handleSubmit={this.handleSubmit}
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
            />

        );
    }
}

let mapStateToProps = (state) => {
    return {
        hallData: state.museum.hallData,
        // artifacts: state.museum.artifacts,
    }
}

export default compose(
    connect(mapStateToProps, {getHallData, updateHallData, deleteHall}),
    withRouter,
    CommonMuseumLogic
)(HallContainer)
