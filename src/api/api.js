import * as axios from "axios";

const debug = true
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

const getOptions = (mass, auth, method) => { //Если нужен Bearer token, то auth = true
    let formdata = new FormData();

    mass.map(m => {
        return formdata.append(m.name, m.value);
    })

    let requestOptions = {
        method: method,
        body: formdata,
        redirect: 'follow',
    }
    let requestAuthOptions = {
        method: method,
        body: formdata,
        headers: getHeaders(),
        redirect: 'follow',
    }
    if(!auth) return requestOptions;
    else return requestAuthOptions;
}

const getHeaders = () => {
    const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    return myHeaders
}

export const artifactApi = {
    getArtifactData(id) { //Получение информации об экспонате по id
        return axios.get(baseUrl + `api/artifacts/${id}`)
            .then(response => response)
    },
    getArtifactsList() { //Получение списка экспонатов
        return axios.get(baseUrl + `api/artifacts`)
            .then(response => response)
    },
    getArtifactsQr(id) { //Получение qr экспоната по id
        return axios.get(baseUrl + `api/artifacts/${id}/qr-code`)
            .then(response => response)
    }
}

export const museumApi = {
    getMuseumData() { //Получение информации об музее по пользователю
        return axios.get(baseUrl + `api/museum`)
    },

}

export const authApi = {
    account() {//Проверка пользователя
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/account`, requestOptions)
    },
    accountChange(last_name, first_name, middle_name, phone_number) {//Изменение данных пользователя
        let options = getOptions([{name: 'last_name', value: last_name}, {name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name}, {name: 'phone_number', value: phone_number}], true,  'PUT')
        return fetch(baseUrl + `api/account`, options)
    },
    login(username, password) {//Логин
        let options = getOptions([{name: 'username', value: username}, {name: 'password', value: password}], false,  'POST')
        return fetch(baseUrl + `auth/jwt/create/`, options)
    },
    register(username, password, email, last_name, first_name, middle_name, phone_number) { //Регистрация
        let options = getOptions([{name: 'username', value: username}, {name: 'password', value: password}, {name: 'email', value: email},
            {name: 'last_name', value: last_name}, {name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name}, {name: 'phone_number', value: phone_number}], false,  'POST')
        return fetch(baseUrl + `auth/users/`, options)
    },
    activation(uid, token) { //Активация аккаунта
        let options = getOptions([{name: 'uid', value: uid}, {name: 'token', value: token}], false,  'POST')
        return fetch(baseUrl + `auth/users/activation/`, options)
    },
    setPassword(current_password, new_password, re_new_password) { //Смена пароля
        let options = getOptions([{name: 'new_password', value: new_password}, {name: 're_new_password', value: re_new_password}, {name: 'current_password', value: current_password}], true,  'POST')
        return fetch(baseUrl + `auth/users/set_password/`, options)
    },
    resetPassword(email) { //Смена пароля
        let options = getOptions([{name: 'email', value: email}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password/`, options)
    },
    accountRecovery(email) { //Проверка email пользователя
        let options = getOptions([{name: 'email', value: email}], false,  'POST')
        return fetch(baseUrl + `api/account_recovery`, options)
    },
    resetPasswordConfirm(uid, token, new_password, re_new_password) { //Смена пароля
        let options = getOptions([{name: 'uid', value: uid}, {name: 'token', value: token}, {name: 'new_password', value: new_password}, {name: 're_new_password', value: re_new_password}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password_confirm/`, options)
    },
}
