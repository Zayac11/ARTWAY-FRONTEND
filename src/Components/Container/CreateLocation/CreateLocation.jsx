import React from 'react';
import {connect} from "react-redux";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {createLocation} from "../../../redux/museum-reducer";
import {Redirect} from "react-router-dom";

class CreateLocation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCreate: false //Создана ли локация
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

    }

    handleSubmit() {
        if(this.props.description === '' || this.props.name === '') {
            this.props.setValidation('isEmptyInputs', true)
        }
        else if(this.props.img.type === '') {
            this.props.setValidation('isPhotoTypeWrong', true)
        }
        else if(/image/.test(this.props.img.type)) {
            this.props.toggleIsChanging(false)
            this.props.createLocation(this.props.name, this.props.img, this.props.description)
            this.setState({
                isCreate: true
            })
        }
        else {
            this.props.setValidation('isPhotoTypeWrong', true)
        }

    }

    render() {

        if(this.state.isCreate) {
            return <Redirect to={'/m-admin'} />
        }

        return (
            <ChangeForm handleSubmit={this.handleSubmit}
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

let CommonMuseumContainer = CommonMuseumLogic(CreateLocation)

export default connect(mapStateToProps,{createLocation})(CommonMuseumContainer);
