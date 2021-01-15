import React from 'react';
import {connect} from "react-redux";
import {Route, withRouter} from "react-router-dom";
import ScannerContainer from "./Scanner/ScannerContainer";
import Enter from "./Enter/Enter";
import s from './Transition.module.css'

class Transition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 100,
            result: null,
            artifactId: '',
        }
        this.handleScan = this.handleScan.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleScan(data){
        this.setState({
            result: data,
        })
    }
    handleChange(e){
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value,
        })
    }
    handleError(err){
        console.error(err)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={s.container}>
                <div className={`blueBlur blur`}></div>
                <div className={`orangeBlur blur`}></div>

                <Route exact path='/scan' render={ () => <ScannerContainer handleScan={this.handleScan}
                                                                           handleError={this.handleError}
                                                                           delay={this.state.delay}
                                                                           history={this.props.history}
                                                                           result={this.state.result} />} />

                <Route exact path='/enter' render={ () => <Enter handleChange={this.handleChange}
                                                                 history={this.props.history}
                                                                 artifactId={this.state.artifactId} />} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {

    }
}

let WithUrlTransition = withRouter(Transition)
export default connect(mapStateToProps,{})(WithUrlTransition);
