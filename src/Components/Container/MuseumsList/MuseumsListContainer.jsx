import React from 'react';
import {connect} from "react-redux";
import MuseumsList from "./MuseumsList";
import {getMuseums} from "../../../redux/serviceAdmin-reducer";
import {compose} from "redux";
import {WithServiceAdminRedirect} from "../../../hoc/Redirect/WithServiceAdminRedirect";

class MuseumsListContainer extends React.Component {

    componentDidMount() {
        this.props.getMuseums()
    }

    render() {

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

export default compose(
    connect(mapStateToProps, {getMuseums}),
    WithServiceAdminRedirect,
)(MuseumsListContainer)

