import {userApi} from "../api/api";
import {setArtifactData} from "./artifact-reducer";
import {toggleIsFetching} from "./authentication";

const SET_TOKEN = 'SET_TOKEN'
const SET_ARTIFACT_ERROR = 'SET_ARTIFACT_ERROR'
const INITIALIZING_TOKEN = 'INITIALIZING_TOKEN'
const SET_IS_TOKEN_DELETED = 'SET_IS_TOKEN_DELETED'

let initialState = {
    token: "",
    isTokenSet: false, //Инициализация токена
    isArtifactError: false, //Если нет экспоната с таким id
    isTokenDeleted: false, //Если был неверный токен и он удалился
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
        case SET_IS_TOKEN_DELETED:
            return {
                ...state,
                isTokenDeleted: true
            }
        default:
            return state;
    }
}

export const setToken = (token) => ({type: SET_TOKEN, token})
export const setArtifactError = (isError) => ({type: SET_ARTIFACT_ERROR, isError})
export const initializingToken = () => ({type: INITIALIZING_TOKEN})
export const setIsDeletedToken = () => ({type: SET_IS_TOKEN_DELETED})

//Пользователь
export const getUserArtifactData = (artifact_id) => { //Получение информации о зале по id локации и зала
    return (dispatch, getState) => {
        const token = getState().user.token
        dispatch(toggleIsFetching(true))
        userApi.getUserArtifactData(token, artifact_id)
            .then(response => response.json()
                .then(result => {
                    // console.log('getUserArtifactData', result)
                    if (result.status === 200) {
                        dispatch(setArtifactError(false)) //Зануляем ошибку, если пришла норм дата
                        dispatch(setArtifactData(result.data))
                    }
                    else if (result.status === 404) {
                        dispatch(setArtifactError(true))
                    }
                    else if (result.status === 403) {
                        dispatch(deleteToken())
                    }
                    dispatch(toggleIsFetching(false))
                }))
    }
}
export const deleteToken = () => { //Удаление токена, если он просроченный или неверный
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(setIsDeletedToken())
        dispatch(setToken(""))
    }
}

export default userReducer
