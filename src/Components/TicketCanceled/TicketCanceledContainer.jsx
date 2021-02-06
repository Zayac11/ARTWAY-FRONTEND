import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import TicketCanceled from "./TicketCanceled";
import Preloader from "../../Common/Preloader/Preloader";

class TicketCanceledContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        if(this.props.isFetch) {
            return <Preloader />
        }

        if(this.props.isUserCashier) {
            return <Redirect to={'/cashier'} />
        }
        if(this.props.isUserMuseumAdmin) {
            return <Redirect to={'/m-admin'} />
        }
        if(this.props.isUserServiceAdmin) {
            return <Redirect to={'/s-admin'} />
        }

        return (
            <TicketCanceled {...this.props} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        isUserCashier: state.auth.isUserCashier,
        isFetch: state.auth.isFetch,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter,
)(TicketCanceledContainer)
