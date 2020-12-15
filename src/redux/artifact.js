import {artifactApi} from "../api/api";

const SET_ARTIFACT_DATA = 'SET_ARTIFACT_DATA'
const SET_ARTIFACTS_LIST = 'SET_ARTIFACTS_LIST'

let initialState = {
    artifactData: {},
    artifactsList: [],
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
        default:
            return state;
    }
}

export const setArtifactData = (artifactData) => ({type: SET_ARTIFACT_DATA, artifactData})
export const setArtifactsList = (artifactList) => ({type: SET_ARTIFACTS_LIST, artifactList})

export const getArtifactData = (artifactId) => { //Получение информации об экспонате по id
    return async (dispatch) => {
        let response = await artifactApi.getArtifactData(artifactId)
        // console.log('artifactData', response.data)
        if(response.status === 200) {
            dispatch(setArtifactData(response.data))
        }

    }
}
export const getArtifactsList = () => { //Получение информации об экспонате по id
    return async (dispatch) => {
        let response = await artifactApi.getArtifactsList()
        // console.log('artifactsList', response.data)
        if(response.status === 200) {
            dispatch(setArtifactsList(response.data))
        }

    }
}

export default artifactReducer
