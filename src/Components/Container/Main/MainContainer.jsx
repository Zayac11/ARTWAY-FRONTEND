import React from 'react';
import {connect} from "react-redux";
import Main from "./Main";

class MainContainer extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <Main isUserServiceAdmin={this.props.isUserServiceAdmin} isUserMuseumSuperAdmin={this.props.isUserMuseumSuperAdmin}
                  isUserMuseumAdmin={this.props.isUserMuseumAdmin} isUserCashier={this.props.isUserCashier}

            />

        );
    }

}

let mapStateToProps = (state) => {
    return {
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin,
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        isUserCashier: state.auth.isUserCashier,
    }
}

export default connect(mapStateToProps,{})(MainContainer);
