import React from 'react';
import './App.css';
import './Common/style.css'
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Container from "./Components/Container/Container";
import Login from "./Components/Login/Login";
import Preloader from "./Common/Preloader/Preloader";
import {getStatus} from "./redux/authentication";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

class App extends React.Component {

    componentDidMount() {
        this.props.getStatus()
    }

    render() {

        //Инициализация(авторизация) на будущее
        if(!this.props.isInitialized) {
            return <Preloader />
        }
        return (
            <Switch>
                {/*Route Login or Initializing*/}
                <Route exact path='/login' render={ () => <Login />} />
                <Route exact path='/reset_password' render={ () => <ResetPassword />} />
                <Container />
            </Switch>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isInitialized:state.auth.isInitialized
    }
}

export default connect(mapStateToProps, {getStatus})(App);
