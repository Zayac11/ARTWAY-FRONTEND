import React from 'react';
import {connect} from "react-redux";
import TicketsList from "./TicketsList";
import {Redirect} from "react-router-dom";
import {createTicket, getTickets} from "../../../redux/cashier-reducer";
import {compose} from "redux";
import {WithCashierRedirect} from "../../../hoc/Redirect/WithCashierRedirect";

class TicketsListContainer extends React.Component {

    componentDidMount() {
        this.props.getTickets()
    }

    render() {

        if(!this.props.isUserCashier) {
            return <Redirect to={'/'} />
        }

        return (
            <TicketsList tickets={this.props.tickets} createTicket={this.props.createTicket} />

        );
    }

}

let mapStateToProps = (state) => {
    return {
        isUserCashier: state.auth.isUserCashier,
        tickets: state.cashier.tickets,
    }
}

export default compose(
    connect(mapStateToProps, {getTickets, createTicket}),
    WithCashierRedirect,
)(TicketsListContainer)
