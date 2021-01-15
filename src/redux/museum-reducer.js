import {museumApi} from "../api/api";

const SET_MUSEUM_DATA = 'SET_MUSEUM_DATA'

let initialState = {
    museumData: {}, //Информация по музею и списки локация
    artifactQr: "",
}

const museumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MUSEUM_DATA:
            return {
                ...state,
                museumData: action.museumData
            }

        default:
            return state;
    }
}

export const setMuseumData = (museumData) => ({type: SET_MUSEUM_DATA, museumData})

export const getMuseumData = () => { //Получение информации о музее по пользователю
    return (dispatch) => {
        museumApi.getMuseumData()
            .then(response => response.json()
                .then(result => {
                    console.log('museumData', result)
                    dispatch(setMuseumData(result))
            }))
    }
}
export const updateMuseumData = (id, name, img, description) => { //Обновлении информации о музее по пользователю
    return (dispatch) => {
        museumApi.updateMuseumData(id, name, img, description)
            .then(response => response.json()
                .then(result => {
                    console.log('updatedMuseumData', result)
                    dispatch(setMuseumData(result))
            }))
    }
}


export default museumReducer
