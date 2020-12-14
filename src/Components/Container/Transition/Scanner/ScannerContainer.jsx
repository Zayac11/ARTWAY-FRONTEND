import React from 'react';
import {connect} from "react-redux";
import QrReader from 'react-qr-reader'
import {Route} from "react-router-dom";
import s from './Scanner.module.css'
import '../../../../Common/style.css'
import Top from "../Top/Top";
import refresh from './../../../../assets/images/refresh-256x256.png'

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

        const previewStyle = {

        }
        if(this.props.result !== null) {
            return <Route path='/' component={() => { window.location = `${this.props.result}`; return null;} }/>
        }

        return (
            <>
                <Top history={this.props.history} section={'scan'} />
                <div className={s.scannerContainer}>

                    <QrReader
                        facingMode={this.state.facingMode}
                        delay={this.props.delay}
                        resolution={600}
                        className={s.scanner}
                        style={previewStyle}
                        showViewFinder={false}
                        onError={this.props.handleError}
                        onScan={this.props.handleScan}
                    />
                <button className={s.refresh} onClick={this.changeCamera}><img src={refresh} alt="refresh button"/></button>
                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(ScannerContainer);
