import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {Redirect, Switch, withRouter} from "react-router-dom";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {compose} from "redux";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {getMuseumData, swapLocations, updateMuseumData} from "../../../redux/museum-reducer";

class MuseumContainer extends React.Component {

    constructor(props) {
        super(props);

        this.swapLocations = this.swapLocations.bind(this)
        this.updateMuseum = this.updateMuseum.bind(this)
    }

    updateMuseum() {
        this.props.updateMuseumData(this.props.id, this.props.name, this.props.img, this.props.description)
        this.props.setImage('')
        this.props.changeCreate(false) //Больше не изменяем
    }

    swapLocations(swap_type, location_id) {
        this.props.swapLocations(swap_type, location_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.museumData !== this.props.museumData) {
            this.props.updateState(this.props.museumData.id, this.props.museumData.name, this.props.museumData.description, this.props.museumData.img)
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateMuseum()
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
            <Switch>
                <Museum handleChangeInputs={this.props.handleChangeInputs}
                        handleSubmit={this.props.handleSubmit}
                        swapLocations={this.swapLocations}
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
            </Switch>

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

export default compose(
    connect(mapStateToProps, {getMuseumData, updateMuseumData, swapLocations}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(MuseumContainer)
