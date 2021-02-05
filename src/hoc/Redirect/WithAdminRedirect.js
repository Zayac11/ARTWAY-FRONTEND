import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
    };
}

export const WithAdminRedirect = (Component) => {

    class WithAdminRedirect extends React.Component {

        render() {
            if (!this.props.isUserMuseumAdmin) return <Redirect to='/login' />
            return (
                <Component {...this.props}

                />
            )
        }
    }


    let ConnectedAdminRedirectComponent = connect(mapStateToPropsForRedirect)(WithAdminRedirect);

    return ConnectedAdminRedirectComponent;
}
