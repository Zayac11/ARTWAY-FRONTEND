import {artifactApi} from "../api/api";

const SET_ARTIFACT_DATA = 'SET_ARTIFACT_DATA'

let initialState = {
    artifactData: {},

}

const artifactReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTIFACT_DATA:
            return {
                ...state,
                artifactData: action.artifactData
            }
        default:
            return state;
    }
}

export const setArtifactData = (artifactData) => ({type: SET_ARTIFACT_DATA, artifactData})

export const getArtifactData = (artifactId) => { //Получение информации об экспонате по id
    return async (dispatch) => {
        let response = await artifactApi.getArtifactData(artifactId)
        console.log('artifactData', response.data)
        if(response.status === 200) {
            dispatch(setArtifactData(response.data))
        }

    }
}

export default artifactReducer
