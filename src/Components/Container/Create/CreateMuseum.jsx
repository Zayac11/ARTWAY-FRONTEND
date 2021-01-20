import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonCreateLogic} from "../../../hoc/CommonCreateLogic";
import {createMuseum} from "../../../redux/serviceAdmin-reducer";
import {WithServiceAdminRedirect} from "../../../hoc/Redirect/WithServiceAdminRedirect";

class CreateMuseum extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight) {
            this.props.createMuseum(this.props.name, this.props.img, this.props.description)
        }
    }

    render() {
        if(this.props.isCreate) {
            return <Redirect to={'/s-admin'} />
        }

        return (
            <ChangeForm {...this.props}/>

        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps, {createMuseum}),
    withRouter,
    CommonMuseumLogic,
    CommonCreateLogic,
    WithServiceAdminRedirect,
)(CreateMuseum)

//Оборачиваем компонент в компонент с общими полями, а так же в компонент с общей логикой создания
