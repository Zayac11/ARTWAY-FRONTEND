import {artifactApi as museumApi} from "../api/api";


const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'
const SET_LOCATIONS_LIST = 'SET_LOCATIONS_LIST'

let initialState = {
    museumData: {},
    locationList: [],
    artifactQr: "",
}

const museumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUM_DATA:
            return {
                ...state,
                museumData: action.museumData
            }

        default:
            return state;
    }
}

export const setMuseumData = (museumData) => ({type: SET_MUSEUM_DATA, museumData})


export const getMuseumData = (artifactId) => { //Получение информации об экспонате по id
    return (dispatch) => {
        museumApi.getMuseumData()
            .then(response => response.json)
            .then(result => {
                console.log('museumData', result)
            })
    }
}


export default museumReducer
