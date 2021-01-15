import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Location from "./Location";
import {getLocationData, updateLocationData} from "../../../redux/museum-reducer";

class LocationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: 0,
            description: "",
            img: {
                type: '',
            },
            main_img: null,
            isChanging: false, //Меняется ли информация
            isEmptyInputs: false, //Если ли пустые поля
            isPhotoTypeWrong: false, //Если файл не является картинкой
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.toggleIsChanging = this.toggleIsChanging.bind(this)
    }

    toggleIsChanging(isChanging) {
        this.setState({
            isChanging: isChanging,
            isPhotoTypeWrong: false,
        })
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleChangeFile(e) {
        let name = e.target.name
        let file = e.target.files[0]

        this.setState({
            [name]: file
        })
    }

    handleSubmit() {
        if(this.state.description === '' || this.state.name === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else if(this.state.img.type === '') {
            this.toggleIsChanging(false)
            this.props.updateLocationData(this.props.match.params.location_id, this.state.name, this.state.main_img, this.state.description)
        }
        else if(/image/.test(this.state.img.type)) {
            this.toggleIsChanging(false)
            this.props.updateLocationData(this.props.match.params.location_id, this.state.name, this.state.img, this.state.description)
        }
        else {
            this.setState({
                isPhotoTypeWrong: true
            })
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.locationData !== this.props.locationData) {
            this.setState({
                name: this.props.locationData.name,
                description: this.props.locationData.description,
                main_img: this.props.locationData.img,
            })
        }
    }

    componentDidMount() {
        this.props.getLocationData(this.props.match.params.location_id)
    }

    render() {
        return (
            <Location handleChangeInputs={this.handleChangeInputs}
                      handleSubmit={this.handleSubmit}
                      toggleIsChanging={this.toggleIsChanging}
                      handleChange={this.handleChange}
                      handleChangeFile={this.handleChangeFile}
                      isPhotoTypeWrong={this.state.isPhotoTypeWrong}
                      isChanging={this.state.isChanging}
                      isEmptyInputs={this.state.isEmptyInputs}
                      name={this.state.name}
                      description={this.state.description}
                      img={this.state.img}
                      main_img={this.state.main_img}
            />

        );
    }

}

let mapStateToProps = (state) => {
    return {
        locationData: state.museum.locationData,
    }
}

let WithUrlLocationContainer = withRouter(LocationContainer)

export default connect(mapStateToProps,{getLocationData, updateLocationData})(WithUrlLocationContainer);
