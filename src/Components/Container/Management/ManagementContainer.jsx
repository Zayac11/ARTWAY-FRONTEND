import React from 'react';
import {connect} from "react-redux";
import Management from "./Management";
import {Redirect} from "react-router-dom";
import {getAdminData} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";

class ManagementContainer extends React.Component {

    componentDidMount() {
    this.props.getAdminData()
    }

    render() {

        if(!this.props.is_museum_super_adminTest) {
            return <Redirect to={'/'} />
        }

        return (
            <Management museum_super_admin={this.props.museum_super_admin}
                        museum_admins={this.props.museum_admins}
                        museum_cashiers={this.props.museum_cashiers}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        is_museum_super_admin: state.museum.is_museum_super_admin,
        is_museum_super_adminTest: state.museum.is_museum_super_adminTest,
        museum_super_admin: state.admin.museum_super_admin,
        museum_admins: state.admin.museum_admins,
        museum_cashiers: state.admin.museum_cashiers,
    }
}

export default compose(
    connect(mapStateToProps, {getAdminData}),
    WithSuperAdminRedirect,
)(ManagementContainer)

