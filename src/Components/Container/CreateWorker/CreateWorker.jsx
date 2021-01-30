import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createWorker} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {CommonCreateWorkerLogic} from "../../../hoc/CommonCreateWorkerLogic";
import CreateWorkerInputs from "../../../Common/CreateWorkerInputs/CreateWorkerInputs";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";

class CreateWorker extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight) {
            this.props.createWorker(
                this.props.last_name,
                this.props.first_name,
                this.props.middle_name,
                this.props.email,
                this.props.password,
                this.props.role)
        }
    }

    render() {

        if(!this.props.isUserMuseumSuperAdmin) {
            return <Redirect to={'/'} />
        }
        if(this.props.isCreate) {
            return <Redirect to={'/m-admin/hr-management'} />
        }
        return (
            <CreateWorkerInputs {...this.props} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin
    }
}

export default compose(
    connect(mapStateToProps, {createWorker}),
    CommonCreateWorkerLogic,
    WithSuperAdminRedirect,
)(CreateWorker)

// export default connect(mapStateToProps,{createWorker})(CreateWorker);
