import React from 'react';
import {connect} from "react-redux";
import './PreloaderLogo.css'
import mirea from './../../assets/images/MIREA_Gerb_Colour.png'

class TestContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            class: "transition",
        }
        this.changeClass = this.changeClass.bind(this)
    }

    changeClass() {
        setTimeout(() =>
        {
            this.setState({

                class: 'trans'
            })
        }, 400)

        setTimeout(() =>
        {
            this.setState({
                class: 'display'
            })
        }, 1400)
    }

    componentDidMount() {
        this.changeClass()
    }

    render() {
        return (
            <>
                <div className={`${this.state.class}`}>
                    <img className={'img'} src={mirea} alt="mirea logo preloader"/>
                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps,{})(TestContainer);
