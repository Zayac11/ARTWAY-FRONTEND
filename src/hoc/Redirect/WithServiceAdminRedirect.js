import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => {
    return {
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
    };
}

export const WithServiceAdminRedirect = (Component) => {

    class WithServiceAdminRedirect extends React.Component {

        render() {
            if (!this.props.isUserServiceAdmin) return <Redirect to='/login' />
            return (
                <Component {...this.props}

                />
            )
        }
    }


    let ConnectedServiceAdminRedirectComponent = connect(mapStateToPropsForRedirect)(WithServiceAdminRedirect);

    return ConnectedServiceAdminRedirectComponent;
}
