import {museumApi} from "../api/api";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'
const SET_LOCATION_DATA = 'SET_LOCATION_DATA'

let initialState = {
    museumData: {}, //Информация по музею и списки локация
    locationData: {}, //Информация по локации
    artifactQr: "",
}

const museumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUM_DATA:
            return {
                ...state,
                museumData: action.museumData
            }
        case SET_LOCATION_DATA:
            return {
                ...state,
                locationData: action.locationData
            }
        default:
            return state;
    }
}

export const setMuseumData = (museumData) => ({type: SET_MUSEUM_DATA, museumData})
export const setLocationData = (locationData) => ({type: SET_LOCATION_DATA, locationData})

export const getMuseumData = () => { //Получение информации о музее по пользователю
    return (dispatch) => {
        museumApi.getMuseumData()
            .then(response => response.json()
                .then(result => {
                    console.log('museumData', result)
                    dispatch(setMuseumData(result))
            }))
    }
}
export const updateMuseumData = (id, name, img, description) => { //Обновлении информации о музее по пользователю
    return (dispatch) => {
        museumApi.updateMuseumData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedMuseumData', result)
                    dispatch(setMuseumData(result))
            }))
    }
}

export const getLocationData = (location_id) => { //Получение информации о локации
    return (dispatch) => {
        let id = Math.floor(location_id)
        museumApi.getLocationData(id)
            .then(response => response.json()
                .then(result => {
                    console.log('locationData', result)
                    dispatch(setLocationData(result))
                }))
    }
}
export const updateLocationData = (id, name, img, description) => { //Обновлении информации о локации по id
    return (dispatch) => {
        museumApi.updateLocationData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedLocationData', result)
                    dispatch(setLocationData(result))
                }))
    }
}

export default museumReducer
