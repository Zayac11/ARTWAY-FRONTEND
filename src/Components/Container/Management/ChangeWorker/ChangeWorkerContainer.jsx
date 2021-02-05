import React from 'react';
import {connect} from "react-redux";
import ChangeWorkerProfile from "./ChangeWorkerProfile";
import {deleteWorker, updateWorkerData} from "../../../../redux/admin-reducer";
import WorkerProfile from "../WorkerProfile/WorkerProfile";

class ChangeWorkerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            middle_name: "",
            isEmptyInputs: false, //Все ли поля пустые
            isChanging: false, //Идет ли изменение профиля
            isModalOpen: false, //Открыто ли модальное окно
        }
        this.handleFindKey = this.handleFindKey.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
        this.updateWorker = this.updateWorker.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteWorker = this.deleteWorker.bind(this)
        this.toggleIsChanging = this.toggleIsChanging.bind(this)
        this.toggleOpenModal = this.toggleOpenModal.bind(this)
    }

    toggleOpenModal(isOpen) {
        this.setState({
            isModalOpen:isOpen
        })
    }

    deleteWorker() {
        this.props.deleteWorker(this.props.id)
    }

    toggleIsChanging() {
        this.setState({
            isChanging: !this.state.isChanging
        })
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    updateWorker() {
        if(this.state.first_name === "" || this.state.last_name === "") {
            this.setState({
                isEmptyInputs: true //Поля пустые
            })
        }
        else {
            this.props.updateWorkerData(this.state.last_name, this.state.first_name, this.state.middle_name, this.props.username, this.props.id)
            this.toggleIsChanging()
        }
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Логин с нажатием enter
            this.updateWorker()
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.last_name !== this.props.last_name) {
            this.setState({
                last_name: this.props.last_name,
            })
        }
        if(prevProps.first_name !== this.props.first_name) {
            this.setState({
                first_name: this.props.first_name,
            })
        }
        if(prevProps.middle_name !== this.props.middle_name) {
            this.setState({
                middle_name: this.props.middle_name,
            })
        }
    }

    componentDidMount() {
        this.setState({
            last_name: this.props.last_name,
            first_name: this.props.first_name,
            middle_name: this.props.middle_name,
        })
    }

    render() {
        return (
            <>
                {
                    this.state.isChanging
                        ? <ChangeWorkerProfile last_name={this.state.last_name} first_name={this.state.first_name} isEmptyInputs={this.state.isEmptyInputs}
                                               middle_name={this.state.middle_name} isModalOpen={this.state.isModalOpen} toggleOpenModal={this.toggleOpenModal}
                                               handleChange={this.handleChange} updateWorker={this.updateWorker} museumAdminId={this.props.museumAdminId}
                                               handleFindKey={this.handleFindKey} handleChangeInputs={this.handleChangeInputs} id={this.props.id}
                                               deleteWorker={this.deleteWorker} isUserServiceAdmin={this.props.isUserServiceAdmin}
                        />
                        : <WorkerProfile toggleIsChanging={this.toggleIsChanging} text={this.props.text}
                                         last_name={this.state.last_name} first_name={this.state.first_name}
                                         middle_name={this.state.middle_name} id={this.props.id}/>
                }
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{updateWorkerData, deleteWorker})(ChangeWorkerContainer);
