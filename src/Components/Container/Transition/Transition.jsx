import React from 'react';
import {connect} from "react-redux";
import {Route, withRouter} from "react-router-dom";
import ScannerContainer from "./Scanner/ScannerContainer";
import Enter from "./Enter/Enter";
import s from './Transition.module.css'
import TopContainer from "../../../Common/Top/TopContainer";
import {setArtifactError} from "../../../redux/user-reducer";

class Transition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 100,
            result: null,
            artifactId: '',

            isArtifactDigit: true, //Если введенный id является числом
        }
        this.handleScan = this.handleScan.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleError = this.handleError.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
    }

    handleScan(data){
        this.setState({
            result: data,
        })
    }

    handleFocus(){
        this.props.setArtifactError(false)
    }

    handleChange(e){
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value,
        })
        let digits = /^\d+$/

        if(value === '' || digits.test(value)) {
            this.setState({
                isArtifactDigit: true
            })
        }
        else if (!digits.test(value)) {
            this.setState({
                isArtifactDigit: false
            })
        }
    }

    handleError(err){
        console.error(err)
    }

    componentDidMount() {

    }

    render() {
        return (

        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.transition}>
                    <TopContainer />

                    <Route exact path='/scan' render={ () => <ScannerContainer handleScan={this.handleScan}
                                                                               handleError={this.handleError}
                                                                               delay={this.state.delay}
                                                                               history={this.props.history}
                                                                               result={this.state.result} />} />

                    <Route exact path='/enter' render={ () => <Enter handleChange={this.handleChange}
                                                                     history={this.props.history}
                                                                     handleFocus={this.handleFocus}
                                                                     isArtifactError={this.props.isArtifactError}
                                                                     isArtifactDigit={this.state.isArtifactDigit}
                                                                     artifactId={this.state.artifactId} />} />
                </div>
            </div>
        </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isArtifactError: state.user.isArtifactError,
    }
}

let WithUrlTransition = withRouter(Transition)
export default connect(mapStateToProps,{setArtifactError})(WithUrlTransition);
