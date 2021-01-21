import {museumApi} from "../api/api";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'
const ADD_ARTIFACT_TO_PRINT = 'ADD_ARTIFACT_TO_PRINT'
const REMOVE_ALL_ARTIFACTS = 'REMOVE_ALL_ARTIFACTS'
const DELETE_ARTIFACT = 'DELETE_ARTIFACT'

let initialState = {
    museumData: {}, //Информация по музею
    locations: [], //Лист локации музея
    print: [], //Артефакты, которые необходимо распечатать
    is_museum_super_admin: false, //Является ли пользователь супер-админом музея
    is_museum_super_adminTest: true, //Является ли пользователь супер-админом музея
}

const museumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUM_DATA:
            return {
                ...state,
                museumData: action.museum,
                locations: action.locations,
                is_museum_super_admin: action.is_museum_super_admin,
            }
        case ADD_ARTIFACT_TO_PRINT:
            return {
                ...state,
                print: [...state.print, action.artifact]
            }
        case REMOVE_ALL_ARTIFACTS:
            return {
                ...state,
                print: []
            }
        case DELETE_ARTIFACT:
            return {
                ...state,
                print: state.print.filter(
                    (p) => {
                        return p.id !== action.id
                    }
                )
            }
        default:
            return state;
    }
}

export const setMuseumData = (museum, locations, is_museum_super_admin) => ({type: SET_MUSEUM_DATA, museum, locations, is_museum_super_admin})
export const addArtifactToPrint = (artifact) => ({type: ADD_ARTIFACT_TO_PRINT, artifact})
export const removeArtifactsToPrint = () => ({type: REMOVE_ALL_ARTIFACTS})
export const deleteOneArtifact = (id) => ({type: DELETE_ARTIFACT, id})

//Музей
export const getMuseumData = () => { //Получение информации о музее по пользователю
    return (dispatch) => {
        museumApi.getMuseumData()
            .then(response => response.json()
                .then(result => {
                    console.log('museumData', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
            }))
    }
}
export const updateMuseumData = (id, name, img, description) => { //Обновлении информации о музее по пользователю
    return (dispatch) => {
        museumApi.updateMuseumData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedMuseumData', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
            }))
    }
}

export const swapLocations = (swap_type, id) => { //Изменение позиций локации
    return (dispatch) => {
        museumApi.swapLocations(swap_type, id)
            .then(response => response.json()
                .then(result => {
                    console.log('swapLocations', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
                }))
    }
}

export default museumReducer
