import React from 'react';
import {connect} from "react-redux";
// import Test from "./Test";
import QrReader from 'react-qr-reader'


class TestContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: 'No result',
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


    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }

    componentDidMount() {

    }

    render() {
        const previewStyle = {
            // maxHeight: 100,
            width: 300,
            margin: 'auto',
        }
        return (
            <div>
                <QrReader delay={500}
                          style={previewStyle}
                          resolutuin={720}
                          onError={this.handleError}
                          onScan={this.handleScan}
                          showViewFinder={false}
                          facingMode={this.state.facingMode}
                />
                <p>{this.state.result}</p>
                <button onClick={this.changeCamera}>Возможно эта кнопка будет менять камеру</button>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(TestContainer);

{/*<h1>Html5Qrcode React example!</h1>*/}
{/*<Html5QrcodeScannerPlugin*/}
{/*    fps={10}*/}
{/*    qrBox={250}*/}
{/*    disableFlip={false}*/}
{/*    qrCodeSuccessCallback={mesg => { console.log(mesg); }}*/}
{/*    qrCodeErrorCallback={error => { console.error(error); }} />*/}
