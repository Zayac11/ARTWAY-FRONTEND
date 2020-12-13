import * as axios from "axios";

const debug = false

let baseUrl = ""
let instance = axios.create({
    baseURL: '',
})

if (debug) {
    instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
    })

    baseUrl = 'http://127.0.0.1:8000/'
}

else {
    instance = axios.create({
        baseURL: 'https://devgang.ru/',
    })

    baseUrl = 'https://devgang.ru/'
}

export const artifactApi = {

}
