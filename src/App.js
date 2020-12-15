import React from 'react';
import './App.css';
import './Common/style.css'
import {connect} from "react-redux";
import {Switch} from "react-router-dom";
import Container from "./Components/Container/Container";

class App extends React.Component {

    componentDidMount() {

    }

    render() {

        // Инициализация(авторизация) на будущее
        // if(!this.props.isInitialized) {
        //     return <Preloader />
        // }

        return (
            <Switch>
                {/*Route Login or Initializing*/}
                <Container />
            </Switch>
        );
    }
}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {})(App);
