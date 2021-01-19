import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Main from "./Main/Main";
import Transition from "./Transition/Transition";
import ArtifactContainer from "./Artifact/ArtifactContainer";
import PreloaderLogo from "../../Common/PreloaderLogo/PreloaderLogo";
import MuseumContainer from "./Museum/MuseumContainer";
import LocationContainer from "./Location/LocationContainer";
import CreateLocation from "./Create/CreateLocation";
import HallContainer from "./Hall/HallContainer";
import CreateHall from "./Create/CreateHall";
import CreateArtifact from "./Create/CreateArtifact";
import ManagementContainer from "./Management/ManagementContainer";
import CreateWorker from "./CreateWorker/CreateWorker";
import MuseumsListContainer from "./MuseumsList/MuseumsListContainer";
import CreateMuseum from "./Create/CreateMuseum";

class Container extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
                <PreloaderLogo />
                <Switch>
                    <Route exact path='/' render={ () => <Main />} />

                    <Route exact path='/enter' render={ () => <Transition />} />
                    <Route exact path='/scan' render={ () => <Transition />} />

                    {/*<Route exact path='/artifacts/:id/Qr-code' render={ () => <QrCodeContainer /> } />*/}
                    {/*<Route exact path='/artifacts/:id' render={ () => <ArtifactContainer />} />*/}
                    {/*<Route exact path='/artifacts' render={ () => <ArtifactsListContainer />} />*/}

                    {/*Музей*/}
                    <Route exact path='/m-admin' render={ () => <MuseumContainer />} />
                    <Route exact path='/m-admin/hr-management' render={ () => <ManagementContainer />} />
                    <Route exact path='/m-admin/hr-management/create_worker' render={ () => <CreateWorker />} />
                    <Route exact path='/m-admin/create_location' render={ () => <CreateLocation />} />
                    <Route exact path='/m-admin/:location_id' render={ () => <LocationContainer />} />
                    <Route exact path='/m-admin/:location_id/create_halls' render={ () => <CreateHall />} />
                    <Route exact path='/m-admin/:location_id/:hall_id' render={ () => <HallContainer />} />
                    <Route exact path='/m-admin/:location_id/:hall_id/create_artifacts' render={ () => <CreateArtifact />} />
                    <Route exact path='/m-admin/:location_id/:hall_id/:artifact_id' render={ () => <ArtifactContainer />} />

                    {/*Администратор сервиса*/}
                    <Route exact path='/s-admin' render={ () => <MuseumsListContainer />} />
                    <Route exact path='/s-admin/create_museum' render={ () => <CreateMuseum />} />
                    <Route exact path='/s-admin/:museum_id' render={ () => <MuseumContainer />} />

                    {/*<Route exact path='/test' render={ () => <TestContainer />} />*/}
                </Switch>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(Container);
