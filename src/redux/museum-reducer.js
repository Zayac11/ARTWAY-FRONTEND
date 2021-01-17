import {museumApi} from "../api/api";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'
const SET_LOCATION_DATA = 'SET_LOCATION_DATA'
const SET_HALL_DATA = 'SET_HALL_DATA'
const SET_ARTIFACT_DATA = 'SET_ARTIFACT_DATA'

let initialState = {
    museumData: {}, //Информация по музею
    locations: [], //Лист локации музея

    locationData: {}, //Информация по локации
    halls: [], //Лист залы локации

    hallData: {}, //Информация по залу
    artifacts: [], //Лист артефактов залов

    artifactData: {}, //Информация по артифакту

    artifactQr: "",
}

const museumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUM_DATA:
            return {
                ...state,
                museumData: action.museum,
                locations: action.locations,
            }
        case SET_LOCATION_DATA:
            return {
                ...state,
                locationData: action.location,
                halls: action.halls,
            }
        case SET_HALL_DATA:
            return {
                ...state,
                hallData: action.hall,
                artifacts: action.artifacts,
            }
        case SET_ARTIFACT_DATA:
            return {
                ...state,
                artifactData: action.artifactData,
            }
        default:
            return state;
    }
}

export const setMuseumData = (museum, locations) => ({type: SET_MUSEUM_DATA, museum, locations})
export const setLocationData = (location, halls) => ({type: SET_LOCATION_DATA, location, halls})
export const setHallData = (hall, artifacts) => ({type: SET_HALL_DATA, hall, artifacts})
export const setArtifactData = (artifactData) => ({type: SET_ARTIFACT_DATA, artifactData})

//Музей
export const getMuseumData = () => { //Получение информации о музее по пользователю
    return (dispatch) => {
        museumApi.getMuseumData()
            .then(response => response.json()
                .then(result => {
                    console.log('museumData', result)
                    dispatch(setMuseumData(result.museum, result.locations))
            }))
    }
}
export const updateMuseumData = (id, name, img, description) => { //Обновлении информации о музее по пользователю
    return (dispatch) => {
        museumApi.updateMuseumData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedMuseumData', result)
                    dispatch(setMuseumData(result.museum, result.locations))
            }))
    }
}

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
                    dispatch(setMuseumData(result.museum, result.locations))
                }))
    }
}

export const deleteLocation = (id) => { //Удаление локации по id
    return (dispatch) => {
        museumApi.deleteLocation(id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteLocation', result)
                    dispatch(setMuseumData(result.museum, result.locations))
                }))
    }
}

export const swapLocations = (swap_type, id) => { //Изменение позиций локации
    return (dispatch) => {
        museumApi.swapLocations(swap_type, id)
            .then(response => response.json()
                .then(result => {
                    console.log('swapLocations', result)
                    dispatch(setMuseumData(result.museum, result.locations))
                }))
    }
}

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

export const createHall = (id, name, img, description) => { //Добавление зала в локацию по id локации
    return (dispatch) => {
        museumApi.createHall(id, name, img, description)
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

//Артефакт

export const getArtifactData = (location_id, hall_id, artifact_id) => { //Получение информации об артефакте по id локации, зала и артефакта
    return (dispatch) => {
        museumApi.getArtifactData(location_id, hall_id, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getArtifactData', result)
                    dispatch(setArtifactData(result))
                }))
    }
}

export const updateArtifactData = (location_id, hall_id, artifact_id,name, img, description, audio) => { //Обновлении информации об артефакте по id локации, зала и артефакта
    return (dispatch) => {
        museumApi.updateArtifactData(location_id, hall_id, artifact_id,name, img, description, audio)
            .then(response => response.json()
                .then(result => {
                    console.log('updateArtifactData', result)
                    dispatch(setArtifactData(result))
                }))
    }
}

export const createArtifact = (location_id, hall_id, name, img, description, audio) => { //Добавление артефакта в зал по id локации и зала
    return (dispatch) => {
        museumApi.createArtifact(location_id, hall_id, name, img, description, audio)
            .then(response => response.json()
                .then(result => {
                    console.log('createArtifact', result)
                    dispatch(setHallData(result.hall, result.artifacts))
                }))
    }
}

export const deleteArtifact = (location_id, hall_id, artifact_id) => { //Удаление артефакта по id локации, зала и артефакта
    return (dispatch) => {
        museumApi.deleteArtifact(location_id, hall_id, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteArtifact', result)
                    dispatch(setHallData(result.hall, result.artifacts))
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

export default museumReducer
