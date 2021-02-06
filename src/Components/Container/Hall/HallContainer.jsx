import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import Hall from "./Hall";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {
    deleteHall,
    getHallData,
    getUserArtifactsList,
    swapArtifacts,
    updateHallData
} from "../../../redux/hall-reducer";

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
        this.props.updateHallData(this.props.match.params.location_id, this.props.match.params.hall_id, this.props.name)
        this.props.setImage('')
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapArtifacts(swap_type, location_id) {
        this.props.swapArtifacts(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.hallData !== this.props.hallData) {
            this.props.updateState(this.props.match.params.location_id, this.props.hallData.name, 'Описание', 'Картинка', '', '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateHall()
        }
    }

    componentDidMount() {
        if(this.props.isUserMuseumAdmin) { //Если пользватель - администратор
            this.props.getHallData(this.props.match.params.location_id, this.props.match.params.hall_id)
        }
        else {
            let token = localStorage.getItem('token') //Если у пользователя билет с токеном
            this.props.getUserArtifactsList(token, this.props.match.params.hall_id)
        }

    }

    render() {
        if(this.state.isDeleted) {
            return <Redirect to={`/m-admin/${this.props.match.params.location_id}`} />
        }

        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }

        return (
            <Hall {...this.props}
                  location_id={this.props.match.params.location_id}
                  hall_id={this.props.match.params.hall_id}
                  deleteHall={this.deleteHall}
                  swapArtifacts={this.swapArtifacts}
            />

        );
    }
}

let mapStateToProps = (state) => {
    return {
        artifacts: state.hall.artifacts,
        hallData: state.hall.hallData,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        hallName: state.hall.hallName,
    }
}

export default compose(
    connect(mapStateToProps, {getHallData, updateHallData, deleteHall, swapArtifacts, getUserArtifactsList}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(HallContainer)
