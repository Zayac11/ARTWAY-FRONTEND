import * as axios from "axios";

const debug = false
//backend
//true for localhost
//false for prod.

let baseUrl = ""

if (debug) {
    baseUrl = 'http://127.0.0.1:8000/'
}
else {
    baseUrl = 'https://devgang.ru/'
}

export const artifactApi = {
    getArtifactData(id) { //Получение информации об экспонате по id
        return axios.get(baseUrl + `api/artifacts/${id}`)
            .then(response => response)
    },
    getArtifactsList() { //Получение информации об экспонате по id
        return axios.get(baseUrl + `api/artifacts`)
            .then(response => response)
    }
}
