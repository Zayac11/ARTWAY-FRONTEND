import React from 'react';
import {connect} from "react-redux";
import QrReader from 'react-weblineindia-qrcode-scanner'
import {Redirect, Route} from "react-router-dom";
import s from './Scanner.module.css'


class ScannerContainer extends React.Component {

    componentDidMount() {

    }

    render() {

        // if(this.props.result !== null) {
        //     return <Redirect path={`${this.props.result}`} />
        // }

        return (
            <div>
                <QrReader
                    delay={this.props.delay}
                    className={s.styles}
                    // style={previewStyle}
                    onError={this.props.handleError}
                    onScan={this.props.handleScan}
                />
                <p>{this.props.result}</p>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(ScannerContainer);
