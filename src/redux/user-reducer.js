import {userApi} from "../api/api";
import {setArtifactData} from "./artifact-reducer";

const SET_TOKEN = 'SET_TOKEN'
const SET_ARTIFACT_ERROR = 'SET_ARTIFACT_ERROR'
const INITIALIZING_TOKEN = 'INITIALIZING_TOKEN'

let initialState = {
    token: "",
    isTokenSet: false, //Инициализация токена
    isArtifactError: false, //Если нет экспоната с таким id
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
        case SET_ARTIFACT_ERROR:

            return {
                ...state,
                isArtifactError: action.isError
            }
        default:
            return state;
    }
}

export const setToken = (token) => ({type: SET_TOKEN, token})
export const setArtifactError = (isError) => ({type: SET_ARTIFACT_ERROR, isError})
export const initializingToken = () => ({type: INITIALIZING_TOKEN})

//Пользователь
export const getUserArtifactData = (artifact_id) => { //Получение информации о зале по id локации и зала
    return (dispatch, getState) => {
        const token = getState().user.token
        userApi.getUserArtifactData(token, artifact_id)
            .then(response => response.json()
                .then(result => {

                    console.log('getUserArtifactData', result)
                    if (result.status === 200) {
                        dispatch(setArtifactError(false)) //Зануляем ошибку, если пришла норм дата
                        dispatch(setArtifactData(result.data))
                    }
                    else if (result.status === 404) {
                        dispatch(setArtifactError(true))
                    }

                }))
    }
}

export default userReducer
