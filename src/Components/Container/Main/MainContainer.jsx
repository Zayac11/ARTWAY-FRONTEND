import React from 'react';
import {connect} from "react-redux";
import Main from "./Main";
import {logout} from "../../../redux/authentication";
import {Redirect} from "react-router-dom";

class MainContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isTokenExists: false, //существует ли токен у пользователя
        }
    }


    componentDidMount() {
        let localToken = localStorage.getItem('token')
        if(localToken !== null) { //Если у пользователя есть сохраненный токен
            this.setState({
                isTokenExists: true
            })
        }
    }

    render() {

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
            <Main isUserServiceAdmin={this.props.isUserServiceAdmin} isUserMuseumSuperAdmin={this.props.isUserMuseumSuperAdmin}
                  isUserMuseumAdmin={this.props.isUserMuseumAdmin} isUserCashier={this.props.isUserCashier} logout={this.props.logout}
                  isTokenExists={this.state.isTokenExists}

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

export default connect(mapStateToProps,{logout})(MainContainer);
