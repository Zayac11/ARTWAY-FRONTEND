import React from 'react';
import {connect} from "react-redux";
import Museum from "./Museum";
import {getMuseumData, updateMuseumData} from "../../../redux/museum-reducer";
import {Redirect} from "react-router-dom";

class MuseumContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: 0,
            description: "",
            img: null,
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
        console.log(/image/.test(this.state.img.type))
        if(/image/.test(this.state.img.type)) {
            this.toggleIsChanging(false)
            this.props.updateMuseumData(this.state.id, this.state.name, this.state.img, this.state.description)
        }
        else {
            this.setState({
                isPhotoTypeWrong: true
            })
        }

        //put запрос
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.museumData !== this.props.museumData) {
            this.setState({
                name: this.props.museumData.name,
                description: this.props.museumData.description,
                img: this.props.museumData.img,
                id: this.props.museumData.id,
            })
        }
    }

    componentDidMount() {
        this.props.getMuseumData()
    }

    render() {
        if(!this.props.isLogin) {
            return <Redirect to={'/'} />
        }

        return (
            <Museum handleChangeInputs={this.handleChangeInputs}
                    handleSubmit={this.handleSubmit}
                    toggleIsChanging={this.toggleIsChanging}
                    handleChange={this.handleChange}
                    handleChangeFile={this.handleChangeFile}
                    isPhotoTypeWrong={this.state.isPhotoTypeWrong}
                    isChanging={this.state.isChanging}
                    name={this.state.name}
                    description={this.state.description}
                    img={this.state.img}
                    locations={this.props.museumData.locations}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        museumData: state.museum.museumData,
        isLogin: state.auth.isLogin,
    }
}

export default connect(mapStateToProps,{getMuseumData, updateMuseumData})(MuseumContainer);
