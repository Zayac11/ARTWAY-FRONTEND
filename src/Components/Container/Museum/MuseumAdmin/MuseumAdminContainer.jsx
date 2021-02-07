import React from 'react';
import {connect} from "react-redux";
import s from './MuseumAdmin.module.css'
import MuseumAdmin from "./MuseumAdmin";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {
    createMuseumSuperAdmin, deleteMuseum,
    deleteMuseumSuperAdmin,
    getMuseumSuperAdmin
} from "../../../../redux/serviceAdmin-reducer";
import {CommonCreateWorkerLogic} from "../../../../hoc/CommonCreateWorkerLogic";
import MuseumInformation from "../../../../Common/MuseumInformation/MuseumInformation";
import TopContainer from "../../../../Common/Top/TopContainer";
import RedTransparentBtn from "../../../../Common/RedTransparentBtn/RedTransparentBtn";
import DeleteModal from "../../../../Common/DeleteModal/DeleteModal";
import Preloader from "../../../../Common/Preloader/Preloader";

class MuseumAdminContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isChanging: false, //Идет ли изменение
            isDeleted: false, //Удален ли музей
            isModalOpen: false, //Модальное окно для подтверждения удаления
            name: 'Main', //Название текущего раздела
        }
        this.deleteMuseum = this.deleteMuseum.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.toggleIsChanging = this.toggleIsChanging.bind(this)
        this.toggleOpenModal = this.toggleOpenModal.bind(this)
        this.deleteMuseumSuperAdmin = this.deleteMuseumSuperAdmin.bind(this)
    }

    deleteMuseum() {
        this.props.deleteMuseum(this.props.museum_id)
        this.setState({
            isDeleted: true,
        })
    }
    deleteMuseumSuperAdmin() {
        this.props.deleteMuseumSuperAdmin(this.props.museum_id)
        this.setState({
            isModalOpen: false
        })
    }

    handleChangeButton(e) {
        let name = e.target.name
        this.setState({
            name: name,
        })
    }

    toggleOpenModal(isOpen) {
        this.setState({
            isModalOpen:isOpen
        })
    }

    toggleIsChanging() {
        this.setState({
            isChanging: !this.state.isChanging,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isRight !== this.props.isRight && this.props.isRight) {
            this.props.createMuseumSuperAdmin(
                this.props.last_name,
                this.props.first_name,
                this.props.middle_name,
                this.props.email,
                this.props.password,
                this.props.museum_id,
            )
            this.toggleIsChanging()
            this.props.handleChangeCreateStatus(false)
        }

        if(prevProps.isEmailTaken !== this.props.isEmailTaken && this.props.isEmailTaken) {
            this.toggleIsChanging()
        }
    }

    componentDidMount() {
        this.props.getMuseumSuperAdmin(this.props.museum_id)
    }

    render() {

        if(this.state.isDeleted) {
            return <Redirect to={'/s-admin'} />
        }

        if(this.props.isFetch) {
            return <Preloader />
        }

        return (
            <div className={'outer'}>
                <div className={'container'}>
                    <div className={s.admin}>

                        <TopContainer isUserServiceAdmin={true} />

                        <div className={s.slick}>
                            <button onClick={this.handleChangeButton} className={this.state.name === 'Main' ? `${s.mainBtn} ${s.button}` : s.button} name={'Main'}>Главная</button>
                            <button onClick={this.handleChangeButton} className={this.state.name === 'Admin' ? `${s.adminBtn} ${s.button}` : s.button} name={'Admin'}>Персонал</button>
                        </div>

                        {
                            this.state.name === 'Main' &&
                            <>
                                <MuseumInformation isUserServiceAdmin={true}
                                                   name={this.props.currentMuseumData.name}
                                                   description={this.props.currentMuseumData.description}
                                                   main_img={this.props.currentMuseumData.img}
                                                   history={this.props.history}
                                />
                                <RedTransparentBtn type={'withProps'} data={true} handleSubmit={this.toggleOpenModal} text={'Удалить музей'} />

                                <DeleteModal isModalOpen={this.state.isModalOpen} toggleOpenModal={this.toggleOpenModal} deleteMuseum={this.deleteMuseum} />
                            </>
                        }
                        {
                            this.state.name === 'Admin' &&
                            <>
                                <MuseumAdmin {...this.props}
                                             toggleOpenModal={this.toggleOpenModal}
                                             deleteMuseumSuperAdmin={this.deleteMuseumSuperAdmin}
                                             deleteMuseum={this.deleteMuseum}
                                             isChanging={this.state.isChanging}
                                             isModalOpen={this.state.isModalOpen}
                                             toggleIsChanging={this.toggleIsChanging} />
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museumAdminData: state.service.museumAdminData,
        currentMuseumData: state.service.currentMuseumData,
        isEmailTaken: state.auth.isEmailTaken,
        isFetch: state.auth.isFetch,
        status: state.service.status,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumSuperAdmin, createMuseumSuperAdmin, deleteMuseumSuperAdmin, deleteMuseum}),
    withRouter,
    CommonCreateWorkerLogic,
)(MuseumAdminContainer)
