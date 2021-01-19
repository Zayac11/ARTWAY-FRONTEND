import React from 'react';
import {connect} from "react-redux";
import MuseumsList from "./MuseumsList";
import {Redirect} from "react-router-dom";
import {getMuseums} from "../../../redux/serviceAdmin-reducer";

class MuseumsListContainer extends React.Component {

    componentDidMount() {
        this.props.getMuseums()
    }

    render() {

        if(!this.props.isLogin && !this.props.isUserServiceAdmin) {
            return <Redirect to={'/'} />
        }

        return (
            <MuseumsList museums={this.props.museums} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        museums: state.service.museums,
    }
}

export default connect(mapStateToProps,{getMuseums})(MuseumsListContainer);
