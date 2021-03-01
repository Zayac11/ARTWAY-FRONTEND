import {adminApi, serviceAdminApi} from "../api/api";
import {setIsEmailTaken, toggleIsFetching} from "./authentication";

const SET_MUSEUMS = 'SET_MUSEUMS'
const SET_MUSEUM_ADMIN_DATA = 'SET_MUSEUM_ADMIN_DATA'

let initialState = {
    museums: [], //Все музеи
    museumAdminData: {}, //Информация об супер-администраторе музея
    currentMuseumData: {}, //Информация об конкретном музее
    status: {}, //Есть ли админ у музея
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
                museumAdminData: action.museumAdminData,
                currentMuseumData: action.currentMuseumData,
                status: action.status,
            }
        default:
            return state;
    }
}

export const setMuseums = (museums) => ({type: SET_MUSEUMS, museums})
export const setMuseumAdminData = (museumAdminData, currentMuseumData, status) => ({type: SET_MUSEUM_ADMIN_DATA, museumAdminData, currentMuseumData,status})

export const getMuseums = () => { //Получение списка музеев
    return (dispatch) => {
        serviceAdminApi.getMuseums()
            .then(response => response.json()
                .then(result => {
                    // console.log('getServiceAdminData', result)
                    dispatch(setMuseums(result))
                }))
    }
}

export const createMuseum = (name, img, description) => { //Создание музея
    return (dispatch) => {
        serviceAdminApi.createMuseum(name, img, description)
            .then(response => response.json()
                .then(result => {
                    // console.log('createMuseum', result)
                    dispatch(setMuseums(result))
                }))
    }
}

export const deleteMuseum = (museum_id) => { //Удаление музея
    return (dispatch) => {
        serviceAdminApi.deleteMuseum(museum_id)
            .then(response => response.json()
                .then(result => {
                    // console.log('deleteMuseum', result)
                    dispatch(setMuseums(result))
                }))
    }
}

export const getMuseumSuperAdmin = (museum_id) => { //Получение супер-админа музея и информацию о музее по id музея
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        serviceAdminApi.getMuseumAdminData(museum_id)
            .then(response => response.json()
                .then(result => {
                    // console.log('getMuseumAdminData', result)
                    dispatch(setMuseumAdminData(result.museum_super_admin, result.museum, result.status))
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export const deleteMuseumSuperAdmin = (museum_id) => { //Удаление супер-админа музея по id музея
    return (dispatch) => {
        serviceAdminApi.deleteMuseumSuperAdmin(museum_id)
            .then(response => response.json()
                .then(result => {
                    // console.log('deleteMuseumSuperAdmin', result)
                    dispatch(setMuseumAdminData(result.museum_super_admin, result.museum, result.status))
                }))
    }
}

export const createMuseumSuperAdmin = (last_name, first_name, middle_name, email, password, museum_id) => { //Создание супер-админа музея по id музея
    return (dispatch) => {
        adminApi.checkIsUserExists(email)
            .then(response => response.json()
                .then(result => {
                    // console.log('checkIsUserExists', result)
                    dispatch(toggleIsFetching(true))
                    if(result.status === 404) {
                        serviceAdminApi.createMuseumSuperAdmin(last_name, first_name, middle_name, email, password, museum_id)
                            .then(response => response.json()
                                .then(result => {
                                    dispatch(setIsEmailTaken(false))
                                    // console.log('createMuseumSuperAdmin', result)
                                    dispatch(setMuseumAdminData(result.museum_super_admin, result.museum, result.status))
                                }))
                    }
                    else {
                        dispatch(setIsEmailTaken(true))
                    }
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export default serviceAdminReducer
