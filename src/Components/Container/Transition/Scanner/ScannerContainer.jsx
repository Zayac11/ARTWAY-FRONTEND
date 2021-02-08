import React from 'react';
import {connect} from "react-redux";
import QrReader from 'react-qr-reader'
import {Route, withRouter} from "react-router-dom";
import s from './Scanner.module.css'
import refresh from './../../../../assets/images/refresh-256x256.png'
import BackBtn from "../../../../Common/BackBtn/BackBtn";
import {compose} from "redux";

class ScannerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            facingMode: 'environment',
        }
        this.changeCamera = this.changeCamera.bind(this)
    }

    changeCamera() {
        if(this.state.facingMode === 'environment') {
            this.setState({
                facingMode: 'user'
            })
        }
        if(this.state.facingMode === 'user') {
            this.setState({
                facingMode: 'environment'
            })
        }
    }

    componentDidMount() {

    }

    render() {

        if(this.props.result !== null) {
            return <Route path='/' component={() => { window.location = `${this.props.result}`; return null;} }/>
        }

        return (
            <>

                <div className={s.scannerContainer}>
                    <div className={s.top}>
                        <BackBtn history={this.props.history} />
                        <div className={s.title}>
                            Отсканируйте QR код
                        </div>
                    </div>

                    <div className={s.qrContainer}>
                        <QrReader
                            facingMode={this.state.facingMode}
                            delay={this.props.delay}
                            resolution={600}
                            className={'scanner'}
                            showViewFinder={false}
                            onError={this.props.handleError}
                            onScan={this.props.handleScan}
                        />
                        <button className={s.refresh} onClick={this.changeCamera}><img src={refresh} alt="refresh button"/></button>
                    </div>

                    <div className={`emptyLocations ${s.bottom}`}>
                        Если камера не работает, попробуйте обновить страницу
                    </div>

                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps,{}),
    withRouter,
)(ScannerContainer)

