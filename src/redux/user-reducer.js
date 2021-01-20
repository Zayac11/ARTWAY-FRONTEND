import {userApi} from "../api/api";
import {setArtifactData} from "./artifact-reducer";

const SET_TOKEN = 'SET_TOKEN'
const INITIALIZING_TOKEN = 'INITIALIZING_TOKEN'

let initialState = {
    token: "",
    isTokenSet: false //Инициализация токена
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case INITIALIZING_TOKEN:
            return {
                ...state,
                isTokenSet: true
            }
        default:
            return state;
    }
}

export const setToken = (token) => ({type: SET_TOKEN, token})
export const initializingToken = () => ({type: INITIALIZING_TOKEN})

//Пользователь
export const getUserArtifactData = (artifact_id) => { //Получение информации о зале по id локации и зала
    return (dispatch, getState) => {
        const token = getState().user.token
        userApi.getUserArtifactData(token, artifact_id)
            .then(response => response.json()
                .then(result => {
                    console.log('getUserArtifactData', result)
                    dispatch(setArtifactData(result))
                }))
    }
}

export default userReducer
