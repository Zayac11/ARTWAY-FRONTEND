import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserCashier: state.auth.isUserCashier,
    };
}

export const WithCashierRedirect = (Component) => {

    class WithCashierRedirect extends React.Component {

        render() {
            if (!this.props.isUserCashier) return <Redirect to='/' />
            return (
                <Component {...this.props}

                />
            )
        }
    }


    let ConnectedCashierRedirectComponent = connect(mapStateToPropsForRedirect)(WithCashierRedirect);

    return ConnectedCashierRedirectComponent;
}
