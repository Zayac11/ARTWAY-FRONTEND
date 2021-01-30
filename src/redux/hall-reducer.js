import {museumApi} from "../api/api";
import {setLocationData} from "./location-reducer";

const SET_HALL_DATA = 'SET_HALL_DATA'
const SET_ARTIFACTS = 'SET_ARTIFACTS'

let initialState = {
    hallData: {}, //Информация по залу
    artifacts: [], //Лист артефактов залов
}

const hallReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HALL_DATA:
            return {
                ...state,
                hallData: action.hall,
                artifacts: action.artifacts,
            }
        case SET_ARTIFACTS:
            return {
                ...state,
                artifacts: action.artifacts.artifacts,
            }
        default:
            return state;
    }
}

export const setHallData = (hall, artifacts) => ({type: SET_HALL_DATA, hall, artifacts})
export const setArtifacts = (artifacts) => ({type: SET_ARTIFACTS, artifacts})

//Зал
export const getHallData = (location_id, hall_id) => { //Получение информации о зале по id локации и зала
    return (dispatch) => {
        museumApi.getHallData(location_id, hall_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getHallData', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                }))
    }
}

export const updateHallData = (location_id, hall_id, name, img, description) => { //Обновлении информации о зале по id локации и зала
    return (dispatch) => {
        museumApi.updateHallData(location_id, hall_id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updateHallData', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                }))
    }
}

export const createHall = (id, name) => { //Добавление зала в локацию по id локации
    return (dispatch) => {
        museumApi.createHall(id, name)
            .then(response => response.json()
                .then(result => {
                    console.log('createHall', result)
                    dispatch(setLocationData(result.location, result.halls))
                }))
    }
}

export const deleteHall = (location_id, hall_id) => { //Удаление зала по id локации и зала
    return (dispatch) => {
        museumApi.deleteHall(location_id, hall_id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteHall', result)
                    dispatch(setLocationData(result.location, result.halls))
                }))
    }
}

export const swapArtifacts = (swap_type, id) => { //Изменение позиций артефактов в зале
    return (dispatch) => {
        museumApi.swapArtifacts(swap_type, id)
            .then(response => response.json()
                .then(result => {
                    console.log('swapArtifacts', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                }))
    }
}

export const getUserArtifactsList = (token, hall_id) => {
    return (dispatch) => {
        museumApi.getUserArtifactsList(token, hall_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getUserArtifactsList', result)
                    dispatch(setArtifacts(result))
                }))
    }
}

export default hallReducer
