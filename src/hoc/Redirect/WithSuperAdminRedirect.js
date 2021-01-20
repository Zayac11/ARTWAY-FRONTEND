import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin,
    };
}

export const WithSuperAdminRedirect = (Component) => {

    class WithSuperAdminRedirect extends React.Component {

        render() {
            if (!this.props.isUserMuseumSuperAdmin) return <Redirect to='/' />
            return (
                <Component {...this.props}

                />
            )
        }
    }


    let ConnectedSuperAdminRedirectComponent = connect(mapStateToPropsForRedirect)(WithSuperAdminRedirect);

    return ConnectedSuperAdminRedirectComponent;
}
