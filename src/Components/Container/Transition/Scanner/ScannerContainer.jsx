import React from 'react';
import {connect} from "react-redux";
import QrReader from 'react-weblineindia-qrcode-scanner'
import {Redirect, Route} from "react-router-dom";
import s from './Scanner.module.css'
import '../../../../Common/style.css'
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";


class ScannerContainer extends React.Component {

    componentDidMount() {

    }

    render() {

        const previewStyle = {
            height: '100%',
            width: '100%',
            margin: 'auto',
        }
        if(this.props.result !== null) {
            return <Route path='/' component={() => { window.location = `${this.props.result}`; return null;} }/>

            // return <Redirect path={`${this.props.result}`} />
        }

        return (
            <div className={s.scannerContainer}>

                <QrReader
                    delay={this.props.delay}
                    className={s.scanner}
                    style={previewStyle}
                    onError={this.props.handleError}
                    onScan={this.props.handleScan}
                />

                <div className={'links'}>
                    {/*<p>{this.props.result}</p>*/}
                    <TransparentButton link={'/'} text='Вернуться назад' />
                </div>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(ScannerContainer);
