import React from 'react';
import {connect} from "react-redux";
import Management from "./Management";
import {getAdminData} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";
import {Redirect, withRouter} from "react-router-dom";
import Preloader from "../../../Common/Preloader/Preloader";

class ManagementContainer extends React.Component {

    componentDidMount() {
        this.props.getAdminData()
    }

    render() {
        if(this.props.isFetch) {
            return <Preloader />
        }
        if(this.props.isEmailTaken) {
            return <Redirect to={'/m-admin/hr-management/create_worker'} />
        }
            return (
            <Management museum_super_admin={this.props.museum_super_admin}
                        museum_admins={this.props.museum_admins}
                        museum_cashiers={this.props.museum_cashiers}
                        history={this.props.history}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museum_super_admin: state.admin.museum_super_admin, //профиль супер-админа
        museum_admins: state.admin.museum_admins, //админы музея
        museum_cashiers: state.admin.museum_cashiers, //кассиры музея
        isEmailTaken: state.auth.isEmailTaken,
        isFetch: state.auth.isFetch,
    }
}

export default compose(
    connect(mapStateToProps, {getAdminData}),
    withRouter,
    WithSuperAdminRedirect,
)(ManagementContainer)

