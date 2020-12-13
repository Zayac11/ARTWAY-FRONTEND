import React from 'react';
import {connect} from "react-redux";
import Scanner from "./Scanner";
import QrReader from 'react-weblineindia-qrcode-scanner'
import {Redirect, Route} from "react-router-dom";
import s from './Scanner.module.css'


class ScannerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            link: "",
            delay: 100,
            result: null,
        }
        // this.handleChange = this.handleChange.bind(this)
        this.handleScan = this.handleScan.bind(this)


    }

    handleScan(data){
        this.setState({
            result: data,
        })
    }
    handleError(err){
        console.error(err)
    }

    componentDidMount() {

    }

    render() {

        const previewStyle = {
            height: 500,
            width: 320,
        }
        // if(this.state.result !== null) {
        //     return <Route path='/' component={() => { window.location = 'https://vk.com/im'; return null;} }/>
        // }

        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    className={s.styles}
                    // style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
                <p>{this.state.result}</p>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(ScannerContainer);
