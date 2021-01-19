import {serviceAdminApi} from "../api/api";

const SET_MUSEUMS = 'SET_MUSEUMS'
const SET_MUSEUM_ADMIN_DATA = 'SET_MUSEUM_ADMIN_DATA'

let initialState = {
    museums: [], //Все музеи
    museumAdminData: {}, //Информация об супер-администраторе музея
}

const serviceAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUMS:
            return {
                ...state,
                museums: action.museums
            }
        case SET_MUSEUM_ADMIN_DATA:
            return {
                ...state,
                museumAdminData: action.museumAdminData
            }
        default:
            return state;
    }
}

export const setMuseums = (museums) => ({type: SET_MUSEUMS, museums})
export const setMuseumAdminData = (museumAdminData) => ({type: SET_MUSEUM_ADMIN_DATA, museumAdminData})

export const getMuseums = () => { //Получение списка музеев
    return (dispatch) => {
        serviceAdminApi.getMuseums()
            .then(response => response.json()
                .then(result => {
                    console.log('getServiceAdminData', result)
                    dispatch(setMuseums(result))
                }))
    }
}

export const createMuseum = () => { //Создание музея
    return (dispatch) => {
        serviceAdminApi.createMuseum()
            .then(response => response.json()
                .then(result => {
                    console.log('createMuseum', result)
                    dispatch(setMuseums(result))
                }))
    }
}

export const getMuseumSuperAdmin = (museum_id) => { //Получение супер-админа музея по id музея
    return (dispatch) => {
        serviceAdminApi.getMuseumAdminData(museum_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getMuseumAdminData', result)
                    dispatch(setMuseumAdminData(result))
                }))
    }
}

export const deleteMuseumSuperAdmin = (museum_id) => { //Удаление супер-админа музея по id музея
    return (dispatch) => {
        serviceAdminApi.deleteMuseumSuperAdmin(museum_id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteMuseumSuperAdmin', result)
                    dispatch(setMuseumAdminData(result))
                }))
    }
}

export const createMuseumSuperAdmin = (last_name, first_name, middle_name, email, password, museum_id) => { //Создание супер-админа музея по id музея
    return (dispatch) => {
        serviceAdminApi.createMuseumSuperAdmin(last_name, first_name, middle_name, email, password, museum_id)
            .then(response => response.json()
                .then(result => {
                    console.log('createMuseumSuperAdmin', result)
                    dispatch(setMuseumAdminData(result))
                }))
    }
}

export default serviceAdminReducer
