import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {Redirect, withRouter} from "react-router-dom";
import {CommonMuseumLogic} from "../../../hoc/CommonMuseumLogic";
import {compose} from "redux";
import {CommonUpdateLogic} from "../../../hoc/CommonUpdateLogic";
import {getMuseumData, swapLocations, updateMuseumData} from "../../../redux/museum-reducer";
import MuseumAdminContainer from "./MuseumAdmin/MuseumAdminContainer";
import {WithServiceAdminRedirect} from "../../../hoc/Redirect/WithServiceAdminRedirect";

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
            this.props.updateState(this.props.museumData.id, this.props.museumData.name, this.props.museumData.description, this.props.museumData.img, '', '')
        }
        if(prevProps.isRight !== this.props.isRight && !prevProps.isRight) {
            this.updateMuseum()
        }
    }

    componentDidMount() {
        this.props.getMuseumData()
    }

    render() {
        //Если пользователь перешел по адресу, не являясь администратором музея
        if((this.props.match.url.includes('/m-admin')) && (!this.props.isUserMuseumAdmin)) {
            return <Redirect to={'/'} />
        }
        //Если пользователь перешел по адресу, не являясь сервисным администратором
        if((this.props.match.url.includes('/s-admin')) && (!this.props.isUserServiceAdmin)) {
            return <Redirect to={'/'} />
        }

        // Если пользователь сервисный администратор
        // if(this.props.isUserServiceAdmin) {
        //     return (
        //         <MuseumAdminContainer museum_id={this.props.match.params.museum_id} />
        //     )
        // }

        return (
            <Museum {...this.props}
                    swapLocations={this.swapLocations}

            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museumData: state.museum.museumData,
        locations: state.museum.locations,
        isLogin: state.auth.isLogin,
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumData, updateMuseumData, swapLocations}),
    withRouter,
    CommonMuseumLogic,
    CommonUpdateLogic,
)(MuseumContainer)
