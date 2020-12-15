import {artifactApi} from "../api/api";

const SET_ARTIFACT_DATA = 'SET_ARTIFACT_DATA'
const SET_ARTIFACTS_LIST = 'SET_ARTIFACTS_LIST'
const SET_ARTIFACTS_QR = 'SET_ARTIFACTS_QR'

let initialState = {
    artifactData: {},
    artifactsList: [],
    artifactQr: "",
}

const artifactReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTIFACT_DATA:
            return {
                ...state,
                artifactData: action.artifactData
            }
        case SET_ARTIFACTS_LIST:
            return {
                ...state,
                artifactsList: action.artifactsList
            }
        case SET_ARTIFACTS_QR:
            return {
                ...state,
                artifactQr: action.artifactQr.qr_code
            }
        default:
            return state;
    }
}

export const setArtifactData = (artifactData) => ({type: SET_ARTIFACT_DATA, artifactData})
export const setArtifactsList = (artifactsList) => ({type: SET_ARTIFACTS_LIST, artifactsList})
export const setArtifactQr = (artifactQr) => ({type: SET_ARTIFACTS_QR, artifactQr})

export const getArtifactData = (artifactId) => { //Получение информации об экспонате по id
    return async (dispatch) => {
        let response = await artifactApi.getArtifactData(artifactId)
        // console.log('artifactData', response.data)
        if(response.status === 200) {
            dispatch(setArtifactData(response.data))
        }

    }
}
export const getArtifactsList = () => { //Получение списка экспонатов
    return async (dispatch) => {
        let response = await artifactApi.getArtifactsList()
        // console.log('artifactsList', response.data)
        if(response.status === 200) {
            dispatch(setArtifactsList(response.data))
        }

    }
}
export const getArtifactsQrCode = (id) => { //Получение qr кода экспоната по id
    return async (dispatch) => {
        let response = await artifactApi.getArtifactsQr(id)
        // console.log('artifactQr', response.data)
        if(response.status === 200) {
            dispatch(setArtifactQr(response.data))
        }

    }
}

export default artifactReducer
