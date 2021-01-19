import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createWorker} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {CommonCreateWorkerLogic} from "../../../hoc/CommonCreateWorkerLogic";
import CreateWorkerInputs from "../../../Common/CreateWorkerInputs/CreateWorkerInputs";

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

        if(!this.props.is_museum_super_adminTest) {
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
        is_museum_super_admin: state.museum.is_museum_super_admin,
        is_museum_super_adminTest: state.museum.is_museum_super_adminTest,
    }
}

export default compose(
    connect(mapStateToProps, {createWorker}),
    CommonCreateWorkerLogic,
)(CreateWorker)

// export default connect(mapStateToProps,{createWorker})(CreateWorker);
