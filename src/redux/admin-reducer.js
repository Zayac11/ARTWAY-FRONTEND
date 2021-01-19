import {adminApi} from "../api/api";

const SET_ADMIN_DATA = 'SET_ADMIN_DATA'

let initialState = {
    museum_super_admin: {}, //Профиль главного администратора
    museum_admins: [], //Лист админов музея
    museum_cashiers: [], //Лист кассиров музея
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_DATA:
            return {
                ...state,
                museum_super_admin: action.museum_super_admin,
                museum_admins: action.museum_admins,
                museum_cashiers: action.museum_cashiers,
            }
        default:
            return state;
    }
}

export const setAdminData = (museum_super_admin, museum_admins, museum_cashiers) => ({type: SET_ADMIN_DATA, museum_super_admin, museum_admins, museum_cashiers})

export const getAdminData = () => { //Получение информации о главном администраторе и его подчиненных
    return (dispatch) => {
        adminApi.getAdminData()
            .then(response => response.json()
                .then(result => {
                    console.log('getAdminData', result)
                    dispatch(setAdminData(result.museum_super_admin, result.museum_admins, result.museum_cashiers))
                }))
    }
}
export const updateWorkerData = (last_name, first_name, middle_name, username, worker_id) => { //Обновление информации о главном администраторе и его подчиненных
    return (dispatch) => {
        adminApi.updateWorkerProfile(last_name, first_name, middle_name, username, worker_id)
            .then(response => response.json()
                .then(result => {
                    console.log('updateWorkerProfile', result)
                    dispatch(setAdminData(result.museum_super_admin, result.museum_admins, result.museum_cashiers))
                }))
    }
}
export const deleteWorker = (worker_id) => { //Удаление сотрудника
    return (dispatch) => {
        adminApi.deleteWorkerProfile(worker_id)
            .then(response => response.json()
                .then(result => {
                    console.log('deleteWorkerProfile', result)
                    dispatch(setAdminData(result.museum_super_admin, result.museum_admins, result.museum_cashiers))
                }))
    }
}
export const createWorker = (last_name, first_name, middle_name, email, password, role) => { //Добавление сотрудника
    return (dispatch) => {
        adminApi.createWorker(last_name, first_name, middle_name, email, password, role)
            .then(response => response.json()
                .then(result => {
                    console.log('createWorker', result)
                    dispatch(setAdminData(result.museum_super_admin, result.museum_admins, result.museum_cashiers))
                }))
    }
}

export default adminReducer