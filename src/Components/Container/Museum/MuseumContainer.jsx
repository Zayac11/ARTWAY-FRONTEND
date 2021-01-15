import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {getMuseumData, updateMuseumData} from "../../../redux/museum-reducer";
import {Redirect} from "react-router-dom";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";

class MuseumContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        if(this.props.description === '' || this.props.name === '') {
            this.props.setValidation('isEmptyInputs', true)
        }
        else if(this.props.img.type === '') {
            this.props.updateMuseumData(this.props.id, this.props.name, this.props.main_img, this.props.description)
            this.props.toggleIsChanging(false)
        }
        else if(/image/.test(this.props.img.type)) {
            this.props.toggleIsChanging(false)
            this.props.updateMuseumData(this.props.id, this.props.name, this.props.img, this.props.description)
        }
        else {
            this.props.setValidation('isPhotoTypeWrong', true)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.museumData !== this.props.museumData) {
            this.props.updateState(this.props.museumData.id, this.props.museumData.name, this.props.museumData.description, this.props.museumData.img)
        }
    }

    componentDidMount() {
        this.props.getMuseumData()
    }

    render() {
        if(!this.props.isLogin) {
            return <Redirect to={'/'} />
        }

        return (
            <Museum handleChangeInputs={this.props.handleChangeInputs}
                    handleSubmit={this.handleSubmit}
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
                    locations={this.props.locations}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museumData: state.museum.museumData,
        locations: state.museum.locations,
        isLogin: state.auth.isLogin,
    }
}

let CommonMuseumContainer = CommonMuseumLogic(MuseumContainer)

export default connect(mapStateToProps,{getMuseumData, updateMuseumData})(CommonMuseumContainer);
