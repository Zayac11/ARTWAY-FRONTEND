import React from 'react';
import {connect} from "react-redux";
import TicketsList from "./TicketsList";
import {createTicket, getTickets} from "../../../redux/cashier-reducer";
import {compose} from "redux";
import {WithCashierRedirect} from "../../../hoc/Redirect/WithCashierRedirect";
import {withRouter} from "react-router-dom";
import Preloader from "../../../Common/Preloader/Preloader";

class TicketsListContainer extends React.Component {

    componentDidMount() {
        this.props.getTickets()
    }

    render() {

        if(this.props.isFetch) {
            return <Preloader />
        }

        return (
            <TicketsList history={this.props.history} tickets={this.props.tickets} createTicket={this.props.createTicket} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isFetch: state.auth.isFetch,
        tickets: state.cashier.tickets,
    }
}

export default compose(
    connect(mapStateToProps, {getTickets, createTicket}),
    withRouter,
    WithCashierRedirect,
)(TicketsListContainer)
