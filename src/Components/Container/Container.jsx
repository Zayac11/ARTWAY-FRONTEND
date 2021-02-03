import React from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";
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
import {initializingToken, setToken} from "../../redux/user-reducer";
import {compose} from "redux";
import Preloader from "../../Common/Preloader/Preloader";
import PrintListContainer from "./PrintList/PrintListContainer";
import RelocateContainer from "./Relocate/RelocateContainer";
import TopContainer from "../../Common/Top/TopContainer";

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

        if(!this.props.isTokenSet) {
            return <Preloader />
        }

        return (
            <>
                <PreloaderLogo />
                <Switch>
                    <Route exact path='/' render={ () => <MainContainer />} />

                    <Route exact path='/enter' render={ () => <Transition />} />
                    <Route exact path='/scan' render={ () => <Transition />} />

                    {/*Покупатель*/}
                    {/*<Route exact path='/artifacts/:id/Qr-code' render={ () => <QrCodeContainer /> } />*/}
                    <Route exact path='/locations/' render={ () => <MuseumContainer />} /> {/*Список локация музея*/}
                    <Route exact path='/locations/:location_id/halls' render={ () => <LocationContainer />} /> {/*Список залов конкретной локации*/}
                    <Route exact path='/halls/:hall_id/artifacts' render={ () => <HallContainer/>} /> {/*Список артифактов конкретного зала*/}
                    <Route exact path='/artifacts/:artifact_id' render={ () => <ArtifactContainer />} />
                    {/*<Route exact path='/artifacts' render={ () => <ArtifactsListContainer />} />*/}

                    {/*Музей*/}
                    <Route exact path='/m-admin' render={ () => <MuseumContainer />} />
                    <Route exact path='/m-admin/print' render={ () => <PrintListContainer />} />
                    <Route exact path='/m-admin/hr-management' render={ () => <ManagementContainer />} />
                    <Route exact path='/m-admin/hr-management/create_worker' render={ () => <CreateWorker />} />
                    <Route exact path='/m-admin/:location_id' render={ () => <LocationContainer />} />
                    <Route exact path='/m-admin/:location_id/:hall_id' render={ () => <HallContainer />} />
                    <Route exact path='/m-admin/:location_id/:hall_id/create_artifacts' render={ () => <CreateArtifact />} />
                    <Route exact path='/m-admin/:location_id/:hall_id/:artifact_id' render={ () => <ArtifactContainer />} />

                    {/*Администратор сервиса*/}
                    <Route exact path='/s-admin' render={ () => <MuseumsListContainer />} /> {/*Лист музеев*/}
                    <Route exact path='/s-admin/create_museum' render={ () => <CreateMuseum />} /> {/*Создание музея*/}
                    <Route exact path='/s-admin/:museum_id' render={ () => <MuseumContainer />} /> {/*Отрисовывает главного администратора музея*/}

                    {/*Кассир*/}
                    <Route exact path='/cashier' render={ () => <TicketsListContainer />} /> {/*Лист билетов*/}

                    {/*<Route exact path='/test' render={ () => <TestContainer />} />*/}
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
        isTokenSet: state.user.isTokenSet,
    }
}
export default compose(
    connect(mapStateToProps, {setToken, initializingToken}),
    withRouter,
)(Container)

