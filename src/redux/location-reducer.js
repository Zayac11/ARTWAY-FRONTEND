import {museumApi} from "../api/api";
import {setMuseumData} from "./museum-reducer";

const SET_LOCATION_DATA = 'SET_LOCATION_DATA'
const SET_HALLS = 'SET_HALLS'

let initialState = {
    locationData: {}, //Информация по локации
    halls: [], //Лист залы локации
}

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION_DATA:
            return {
                ...state,
                locationData: action.location,
                halls: action.halls,
            }
        case SET_HALLS:
            return {
                ...state,
                halls: action.halls.halls,
            }
        default:
            return state;
    }
}

export const setLocationData = (location, halls) => ({type: SET_LOCATION_DATA, location, halls})
export const setHalls = (halls) => ({type: SET_HALLS, halls})

//Локация
export const getLocationData = (location_id) => { //Получение информации о локации
    return (dispatch) => {
        museumApi.getLocationData(location_id)
            .then(response => response.json()
                .then(result => {
                    console.log('locationData', result)
                    dispatch(setLocationData(result.location, result.halls))
                }))
    }
}
export const updateLocationData = (id, name, img, description) => { //Обновлении информации о локации по id
    return (dispatch) => {
        museumApi.updateLocationData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedLocationData', result)
                    dispatch(setLocationData(result.location, result.halls))
                }))
    }
}

export const createLocation = (name, img, description) => { //Добавление локации в музей по пользователю
    return (dispatch) => {
        museumApi.createLocation(name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('createLocation', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
                }))
    }
}

export const deleteLocation = (id) => { //Удаление локации по id
    return (dispatch) => {
        museumApi.deleteLocation(id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteLocation', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
                }))
    }
}

export const swapHalls = (swap_type, id) => { //Изменение позиций залов в локации
    return (dispatch) => {
        museumApi.swapHalls(swap_type, id)
            .then(response => response.json()
                .then(result => {
                    console.log('swapHalls', result)
                    dispatch(setLocationData(result.location, result.halls))
                }))
    }
}

export const getUserHallsList = (token, location_id) => {
    return (dispatch) => {
        museumApi.getUserHallsList(token, location_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getUserHallsList', result)
                    dispatch(setHalls(result))
                }))
    }
}

export default locationReducer
