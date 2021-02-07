import {museumApi} from "../api/api";
import {setHallData} from "./hall-reducer";
import {toggleIsFetching} from "./authentication";

const SET_ARTIFACT_DATA = 'SET_ARTIFACT_DATA'

let initialState = {
    artifactData: {}, //Информация по артифакту
}

const artifactReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTIFACT_DATA:
            return {
                ...state,
                artifactData: action.artifactData,
            }
        default:
            return state;
    }
}

export const setArtifactData = (artifactData) => ({type: SET_ARTIFACT_DATA, artifactData})

//Экспонат
export const getArtifactData = (location_id, hall_id, artifact_id) => { //Получение информации об артефакте по id локации, зала и артефакта
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.getArtifactData(location_id, hall_id, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getArtifactData', result)
                    dispatch(setArtifactData(result))
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export const updateArtifactData = (location_id, hall_id, artifact_id,name, img, description, audio, video) => { //Обновлении информации об артефакте по id локации, зала и артефакта
    return (dispatch) => {
        museumApi.updateArtifactData(location_id, hall_id, artifact_id,name, img, description, audio, video)
            .then(response => response.json()
                .then(result => {
                    console.log('updateArtifactData', result)
                    dispatch(setArtifactData(result))
                }))
    }
}

export const createArtifact = (location_id, hall_id, name, img, description, audio, video) => { //Добавление артефакта в зал по id локации и зала
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.createArtifact(location_id, hall_id, name, img, description, audio, video)
            .then(response => response.json()
                .then(result => {
                    console.log('createArtifact', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export const deleteArtifact = (location_id, hall_id, artifact_id) => { //Удаление артефакта по id локации, зала и артефакта
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.deleteArtifact(location_id, hall_id, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteArtifact', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export const relocateArtifact = (hall_id, artifact_id) => { //Перемещение артефакта в другой зал
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.relocateArtifact(hall_id, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('relocateArtifact', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                    dispatch(toggleIsFetching(false))
                }))
    }
}




export default artifactReducer
