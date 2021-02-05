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
import Modal from "react-png-modal";

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
    }

    deleteMuseum() {
        this.props.deleteMuseum(this.props.museum_id)
        this.setState({
            isDeleted: true,
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
        if(prevProps.isRight !== this.props.isRight) {
            this.props.createMuseumSuperAdmin(
                this.props.last_name,
                this.props.first_name,
                this.props.middle_name,
                this.props.email,
                this.props.password,
                this.props.museum_id,
            )
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
                                <Modal
                                    center
                                    className={'CustomModal'}
                                    closeModal={() => this.toggleOpenModal(false)}
                                    open={this.state.isModalOpen}>
                                    {
                                        <>
                                            <div className={'titleModal'}>
                                                Подтвердить удаление
                                            </div>
                                            <button onClick={() => this.deleteMuseum()} className={'submitModal'}>
                                                Подтвердить
                                            </button>
                                        </>
                                    }
                                </Modal>
                            </>
                        }
                        {
                            this.state.name === 'Admin' &&
                            <>
                                <MuseumAdmin {...this.props}
                                             toggleOpenModal={this.toggleOpenModal}
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
        status: state.service.status,
    }
}

export default compose(
    connect(mapStateToProps, {getMuseumSuperAdmin, createMuseumSuperAdmin, deleteMuseumSuperAdmin, deleteMuseum}),
    withRouter,
    CommonCreateWorkerLogic,
)(MuseumAdminContainer)
