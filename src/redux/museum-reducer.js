import {museumApi} from "../api/api";
import {deleteToken} from "./user-reducer";
import {toggleIsFetching} from "./authentication";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'
const ADD_ARTIFACT_TO_PRINT = 'ADD_ARTIFACT_TO_PRINT'
const REMOVE_ALL_ARTIFACTS = 'REMOVE_ALL_ARTIFACTS'
const DELETE_ARTIFACT = 'DELETE_ARTIFACT'
const SET_PDF_TO_PRINT = 'SET_PDF_TO_PRINT'
const SET_LOCATIONS_LIST = 'SET_LOCATIONS_LIST'
const CLEAR_PDF = 'CLEAR_PDF'

let initialState = {
    museumData: {}, //Информация по музею
    locations: [], //Лист локации музея
    print: [], //Артефакты, которые необходимо распечатать
    pdf: '', //Сгенерированный pdf файл с qr-кодами артефактов

    //Надо убрать
    is_museum_super_admin: false, //Является ли пользователь супер-админом музея
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
        case SET_PDF_TO_PRINT:
            return {
                ...state,
                pdf: action.pdf
            }
        case CLEAR_PDF:
            return {
                ...state,
                pdf: ''
            }
        case SET_LOCATIONS_LIST:
            return {
                ...state,
                locations: action.locations.locations
            }
        case DELETE_ARTIFACT:
            return {
                ...state,
                print: state.print.filter(
                    (p) => {
                        return p.id !== Math.floor(action.id)
                    }
                )
            }
        default:
            return state;
    }
}

export const setMuseumData = (museum, locations, is_museum_super_admin) => ({type: SET_MUSEUM_DATA, museum, locations, is_museum_super_admin})
export const addArtifactToPrint = (artifact) => ({type: ADD_ARTIFACT_TO_PRINT, artifact}) //Добавить артефакт для принта
export const removeArtifactsToPrint = () => ({type: REMOVE_ALL_ARTIFACTS}) //Удалить все артефакты из принта
export const deleteOneArtifact = (id) => ({type: DELETE_ARTIFACT, id}) //Удалить только один артефакт
export const setPdfToPrint = (pdf) => ({type: SET_PDF_TO_PRINT, pdf}) //Установить ссылку на пдф для печати qr-кодов артефактов
export const clearPdf = () => ({type: CLEAR_PDF}) //Очистить файл pdf

//Музей
export const getMuseumData = () => { //Получение информации о музее по пользователю
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.getMuseumData()
            .then(response => response.json()
                .then(result => {
                    console.log('museumData', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
                    dispatch(toggleIsFetching(false))
            }))
    }
}
export const updateMuseumData = (id, name, img, description, ticket_lifetime) => { //Обновлении информации о музее по пользователю
    return (dispatch) => {
        museumApi.updateMuseumData(id, name, img, description, ticket_lifetime)
            .then(response => response.json()
                .then(result => {
                    // console.log('updatedMuseumData', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
            }))
    }
}

export const swapLocations = (swap_type, id) => { //Изменение позиций локации
    return (dispatch) => {
        museumApi.swapLocations(swap_type, id)
            .then(response => response.json()
                .then(result => {
                    // console.log('swapLocations', result)
                    dispatch(setMuseumData(result.museum, result.locations, result.is_museum_super_admin))
                }))
    }
}

export const printArtifacts = (artifacts, size) => { //Отправить артефакты на печать
    return (dispatch) => {
        let artifacts_ids = artifacts.map(c => {
            return c.id
        })
        museumApi.printArtifactsCards(artifacts_ids, size)
            .then(response => response.json()
                .then(result => {
                    // console.log('printArtifactsCards', result)
                    dispatch(setPdfToPrint(result))
                }))
    }
}

export const getUsersLocationsList = (token) => { //Получения списка локаций музея по токену пользователя
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        museumApi.getUserLocationsList(token)
            .then(response => response.json()
                .then(result => {
                    // console.log('getUserLocationsList', result)
                    if(result.status === 403) {
                        dispatch(deleteToken())
                    }
                    else {
                        dispatch(setMuseumData(result.museum, result.locations, false))
                    }
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export default museumReducer
