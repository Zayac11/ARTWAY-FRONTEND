import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonCreateLogic} from "../../../hoc/CommonCreateLogic";
import {createLocation} from "../../../redux/location-reducer";
import {WithAdminRedirect} from "../../../hoc/Redirect/WithAdminRedirect";

class CreateLocation extends React.Component {

    constructor(props) {
        super(props);

        this.createLocation = this.createLocation.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight) {
            this.createLocation()
        }
    }

    createLocation() {
        this.props.createLocation(this.props.name, this.props.img, this.props.description)
    }

    render() {
        if(this.props.isCreate) {
            return <Redirect to={'/m-admin'} />
        }

        return (
            <ChangeForm text={'Создание локации'} {...this.props}
            />

        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, {createLocation}),
    withRouter,
    CommonMuseumLogic,
    CommonCreateLogic,
    WithAdminRedirect,
)(CreateLocation)

//Оборачиваем компонент в компонент с общими полями, а так же в компонент с общей логикой создания
