import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {initializingToken, setToken} from "../../redux/user-reducer";
import {compose} from "redux";
import MainContainer from "./Main/MainContainer";
import Transition from "./Transition/Transition";
import ArtifactContainer from "./Artifact/ArtifactContainer";
import PreloaderLogo from "../../Common/PreloaderLogo/PreloaderLogo";
import MuseumContainer from "./Museum/MuseumContainer";
import LocationContainer from "./Location/LocationContainer";
import HallContainer from "./Hall/HallContainer";
import CreateArtifact from "./Create/CreateArtifact";
import ManagementContainer from "./Management/ManagementContainer";
import CreateWorker from "./CreateWorker/CreateWorker";
import MuseumsListContainer from "./MuseumsList/MuseumsListContainer";
import CreateMuseum from "./Create/CreateMuseum";
import TicketsListContainer from "./TicketsList/TicketsListContainer";
import PrintListContainer from "./PrintList/PrintListContainer";
import InformationContainer from "./Information/InformationContainer";
import Preloader from "../../Common/Preloader/Preloader";
import Error404 from "./404/Error404";

class Container extends React.Component {

    componentDidMount() {
        const url = new URLSearchParams(this.props.location.search)
        let localToken = localStorage.getItem('token')
        let token = url.get('token');
        if(!this.props.isUserMuseumSuperAdmin && !this.props.isUserServiceAdmin && !this.props.isUserCashier && !this.props.isUserMuseumAdmin) {
            if(token !== null) {
                localStorage.setItem('token', token)
                this.props.setToken(token)
            }
            else if(localToken !== null) {
                this.props.setToken(localToken)
            }

        }
        this.props.initializingToken() //Отрисовка приложения после установки/неустановки токена из билета
    }

    render() {
        //Пока не определится наличие токена, то редирект не произойдет
        if(!this.props.isTokenSet) {
            return <Preloader />
        }
        //Если у пользователя нет токена и он не залогинен
        let localToken = localStorage.getItem('token')
        if((localToken === null && !this.props.isLogin) || this.props.isTokenDeleted) {
            return <Redirect to={'/canceled'} />
        }
        return (
            <>
                <PreloaderLogo />
                <Switch>
                    {/*Покупатель*/}
                    <Route exact path='/' render={ () => <MainContainer />} /> {/*Главная стр пользователя*/}
                    <Route exact path='/information' render={ () => <InformationContainer />} /> {/*Информация по использованию*/}
                    <Route exact path='/enter' render={ () => <Transition />} /> {/*Ввод руками id*/}
                    <Route exact path='/scan' render={ () => <Transition />} /> {/*Скан qr кода*/}
                    <Route exact path='/locations/' render={ () => <MuseumContainer />} /> {/*Список локация музея*/}
                    <Route exact path='/locations/:location_id/halls' render={ () => <LocationContainer />} /> {/*Список залов конкретной локации*/}
                    <Route exact path='/halls/:hall_id/artifacts' render={ () => <HallContainer/>} /> {/*Список артифактов конкретного зала*/}
                    <Route exact path='/artifacts/:artifact_id' render={ () => <ArtifactContainer />} /> {/*Экспонат*/}

                    {/*Музей*/}
                    <Route exact path='/m-admin' render={ () => <MuseumContainer />} /> {/*Музей*/}
                    <Route exact path='/m-admin/print' render={ () => <PrintListContainer />} /> {/*Экспонаты для печати*/}
                    <Route exact path='/m-admin/hr-management' render={ () => <ManagementContainer />} /> {/*Персонал музея*/}
                    <Route exact path='/m-admin/hr-management/create_worker' render={ () => <CreateWorker />} /> {/*Создание работника*/}
                    <Route exact path='/m-admin/:location_id' render={ () => <LocationContainer />} /> {/*Локация*/}
                    <Route exact path='/m-admin/:location_id/:hall_id' render={ () => <HallContainer />} /> {/*Зал*/}
                    <Route exact path='/m-admin/:location_id/:hall_id/create_artifacts' render={ () => <CreateArtifact />} /> {/*Создание экспоната*/}
                    <Route exact path='/m-admin/:location_id/:hall_id/:artifact_id' render={ () => <ArtifactContainer />} /> {/*Экспонат*/}

                    {/*Администратор сервиса*/}
                    <Route exact path='/s-admin' render={ () => <MuseumsListContainer />} /> {/*Лист музеев*/}
                    <Route exact path='/s-admin/create_museum' render={ () => <CreateMuseum />} /> {/*Создание музея*/}
                    <Route exact path='/s-admin/:museum_id' render={ () => <MuseumContainer />} /> {/*Отрисовывает информацию по музею*/}

                    {/*Кассир*/}
                    <Route exact path='/cashier' render={ () => <TicketsListContainer />} /> {/*Лист билетов*/}

                    <Route exact path='*' render={ () => <Error404 />} />
                </Switch>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isUserMuseumAdmin: state.auth.isUserMuseumAdmin,
        isUserCashier: state.auth.isUserCashier,
        isUserServiceAdmin: state.auth.isUserServiceAdmin,
        isUserMuseumSuperAdmin: state.auth.isUserMuseumSuperAdmin,
        isLogin: state.auth.isLogin,
        isTokenSet: state.user.isTokenSet,
        isTokenDeleted: state.user.isTokenDeleted,
    }
}
export default compose(
    connect(mapStateToProps, {setToken, initializingToken}),
    withRouter,
)(Container)

