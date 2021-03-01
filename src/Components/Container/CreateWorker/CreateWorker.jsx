import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {createWorker, setIsWorkerCreate} from "../../../redux/admin-reducer";
import {compose} from "redux";
import {CommonCreateWorkerLogic} from "../../../hoc/CommonCreateWorkerLogic";
import CreateWorkerInputs from "../../../Common/CreateWorkerInputs/CreateWorkerInputs";
import {WithSuperAdminRedirect} from "../../../hoc/Redirect/WithSuperAdminRedirect";
import Preloader from "../../../Common/Preloader/Preloader";
import {setIsEmailTaken} from "../../../redux/authentication";

class CreateWorker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCreate: false
        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight && this.props.isRight) {
            this.props.createWorker(
                this.props.last_name,
                this.props.first_name,
                this.props.middle_name,
                this.props.email,
                this.props.password,
                this.props.role)
        }
        if(!prevProps.isWorkerCreate && this.props.isWorkerCreate && this.props.isWorkerCreate) {
            this.setState({
                isCreate: true
            })
        }
    }

    componentWillUnmount() {
        this.props.setIsEmailTaken(false)
        this.props.setIsWorkerCreate(false)
    }

    componentDidMount() {
        this.props.setIsWorkerCreate(false)
    }

    render() {

        if(!this.props.isUserMuseumSuperAdmin) {
            return <Redirect to={'/'} />
        }
        if(this.props.isFetch) {
            return <Preloader />
        }
        if(this.state.isCreate) {
            return <Redirect to={'/m-admin/hr-management'} />
        }
        return (
            <CreateWorkerInputs {...this.props} />
        );
    }

}

let mapStateToProps = (state) => {
    return {

        isFetch: state.auth.isFetch,
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin,
        isWorkerCreate: state.admin.isWorkerCreate,
    }
}

export default compose(
    connect(mapStateToProps, {createWorker, setIsWorkerCreate, setIsEmailTaken}),
    withRouter,
    CommonCreateWorkerLogic,
    WithSuperAdminRedirect,
)(CreateWorker)

// export default connect(mapStateToProps,{createWorker})(CreateWorker);
