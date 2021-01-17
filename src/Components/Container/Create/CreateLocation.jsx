import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {createLocation} from "../../../redux/museum-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {CommonCreateLogic} from "../../../hoc/CommonCreateLogic";

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
            <ChangeForm handleSubmit={this.props.handleSubmit}
                        handleFindKey={this.props.handleFindKey}
                        handleFocus={this.props.handleFocus}
                        handleChange={this.props.handleChange}
                        handleChangeInputs={this.props.handleChangeInputs}
                        isEmptyInputs={this.props.isEmptyInputs}
                        isPhotoTypeWrong={this.props.isPhotoTypeWrong}
                        handleChangeFile={this.props.handleChangeFile}
                        description={this.props.description}
                        name={this.props.name}
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
)(CreateLocation)

//Оборачиваем компонент в компонент с общими полями, а так же в компонент с общей логикой создания
