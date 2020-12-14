import React from 'react';
import {connect} from "react-redux";
import QrReader from 'react-weblineindia-qrcode-scanner'
import {Redirect, Route} from "react-router-dom";
import s from './Scanner.module.css'
import '../../../../Common/style.css'
import Top from "../Top/Top";

class ScannerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            facingMode: 'rear',
        }
        this.changeCamera = this.changeCamera.bind(this)
    }

    changeCamera() {
        if(this.state.facingMode === 'rear') {
            this.setState({
                facingMode: 'front'
            })
        }
        if(this.state.facingMode === 'front') {
            this.setState({
                facingMode: 'rear'
            })
        }
    }

    componentDidMount() {

    }

    render() {

        const previewStyle = {
            maxHeight: '40vh',
            width: '100%',
            margin: 'auto',
        }
        if(this.props.result !== null) {
            return <Route path='/' component={() => { window.location = `${this.props.result}`; return null;} }/>

            // return <Redirect path={`${this.props.result}`} />
        }

        return (
            <>
                <Top history={this.props.history} section={'scan'} />
                <div className={s.scannerContainer}>

                    <QrReader
                        facingMode={this.state.facingMode}
                        delay={this.props.delay}
                        className={s.scanner}
                        style={previewStyle}
                        onError={this.props.handleError}
                        onScan={this.props.handleScan}
                    />
                <button className={'links'} onClick={this.changeCamera}>ПОМЕНЯТЬ КАМЕРУ</button>
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
