import React from 'react';
import {connect} from "react-redux";
import MuseumsList from "./MuseumsList";
import {getMuseums} from "../../../redux/serviceAdmin-reducer";
import {compose} from "redux";
import {WithServiceAdminRedirect} from "../../../hoc/Redirect/WithServiceAdminRedirect";
import {withRouter} from "react-router-dom";

class MuseumsListContainer extends React.Component {

    componentDidMount() {
        this.props.getMuseums()
    }

    render() {

        return (
            <MuseumsList history={this.props.history} museums={this.props.museums} />
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

export default compose(
    connect(mapStateToProps, {getMuseums}),
    withRouter,
    WithServiceAdminRedirect,
)(MuseumsListContainer)

