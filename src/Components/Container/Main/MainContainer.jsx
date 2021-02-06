import React from 'react';
import {connect} from "react-redux";
import Main from "./Main";
import {Redirect} from "react-router-dom";
import {getUsersLocationsList} from "../../../redux/museum-reducer";

class MainContainer extends React.Component {

    componentDidMount() {
        //Запрос на проверку токена, чтобы редиректнуть с main page в случае чего
        let token = localStorage.getItem('token')
        this.props.getUsersLocationsList(token)
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
            <Main />
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{getUsersLocationsList})(MainContainer);
