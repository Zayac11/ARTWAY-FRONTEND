import {museumApi} from "../api/api";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'


let initialState = {
    museumData: {}, //Информация по музею
    locations: [], //Лист локации музея
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
        default:
            return state;
    }
}

export const setMuseumData = (museum, locations, is_museum_super_admin) => ({type: SET_MUSEUM_DATA, museum, locations, is_museum_super_admin})

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
