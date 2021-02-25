const debug = false
//backend
//true for localhost
//false for prod.

let baseUrl = ''

if (debug) {
    baseUrl = process.env.REACT_APP_BASE_URL
}
else {
    baseUrl = process.env.REACT_APP_PRODUCTION_URL
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

export const museumApi = {
//Музей
    getMuseumData() { //Получение информации об музее по пользователю
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin`, requestOptions)
    },

    updateMuseumData(museum_id, name, img, description, ticket_lifetime) { //Изменение информации о музее
        let options = getOptions([{name: 'museum_id', value: museum_id}, {name: 'name', value: name},{name: 'img', value: img}, {name: 'description', value: description}, {name: 'ticket_lifetime', value: ticket_lifetime}], true,  'PUT')
        return fetch(baseUrl + `api/m_admin`, options)
    },

    getUserLocationsList(token) { //Получения списка локаций музея по токену пользователя
        let options = getOptions([{name: 'token', value: token}], false,  'POST')
        return fetch(baseUrl + `api/locations_map`, options)
    },

//Локации
    getLocationData(location_id) { //Получение информации о локации по id
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin/${location_id}`, requestOptions)
    },

    updateLocationData(location_id, name) { //Изменение информации о локации по id
        let options = getOptions([{name: 'name', value: name}], true,  'PUT')
        return fetch(baseUrl + `api/m_admin/${location_id}`, options)
    },

    createLocation(name) { //Создание локации по музею пользователя
        let options = getOptions([{name: 'name', value: name}], true,  'POST')
        return fetch(baseUrl + `api/m_admin`, options)
    },

    deleteLocation(location_id) { //Удаление локации по id
        let options = getOptions([], true,  'DELETE')
        return fetch(baseUrl + `api/m_admin/${location_id}`, options)

    },
    swapLocations(swap_type, obj_id) { //Изменение позиций локации
        let options = getOptions([{name: 'swap_type', value: swap_type},{name: 'obj_id', value: obj_id}], true,  'POST')
        return fetch(baseUrl + `api/swap_locations`, options)
    },
    getUserHallsList(token, location_id) { //Получения списка залов музея по токену пользователя и id локации
        let options = getOptions([{name: 'token', value: token}, {name: 'location_pk', value: location_id}], false,  'POST')
        return fetch(baseUrl + `api/halls_map`, options)
    },

//Залы
    getHallData(location_id, hall_id) { //Получение информации о зале по id зала и его локации
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}`, requestOptions)
    },

    updateHallData(location_id, hall_id, name) { //Изменение информации о зале по id его локации и зала
        let options = getOptions([{name: 'name', value: name}], true,  'PUT')
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}`, options)
    },

    createHall(location_id, name) { //Создание зала по id локации
        let options = getOptions([{name: 'name', value: name}], true,  'POST')
        return fetch(baseUrl + `api/m_admin/${location_id}`, options)
    },

    deleteHall(location_id, hall_id) { //Удаление зала по id его локации и id зала
        let options = getOptions([], true,  'DELETE')
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}`, options)

    },
    swapHalls(swap_type, obj_id) { //Изменение позиций залов в локации
        let options = getOptions([{name: 'swap_type', value: swap_type},{name: 'obj_id', value: obj_id}], true,  'POST')
        return fetch(baseUrl + `api/swap_halls`, options)
    },
    getUserArtifactsList(token, hall_id) { //Получения списка артефактов музея по токену пользователя и id зала
        let options = getOptions([{name: 'token', value: token}, {name: 'hall_pk', value: hall_id}], false,  'POST')
        return fetch(baseUrl + `api/artifacts_map`, options)
    },

//Экспонаты
    getArtifactData(location_id, hall_id, artifact_id) { //Получение информации об артефакте по id локации, зала и артефакта
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}/${artifact_id}`, requestOptions)
    },

    updateArtifactData(location_id, hall_id, artifact_id, name, img_1, img_2, img_3, img_4, img_5, description, audio_1, audio_2, audio_3, audio_4, audio_5,
                       link_name_1, link_name_2, link_name_3, link_name_4, link_name_5,
                       link_value_1, link_value_2, link_value_3, link_value_4, link_value_5) { //Изменение информации об артефакте по id локации, зала и артефакта
        let options = getOptions([{name: 'name', value: name},{name: 'img_1', value: img_1},{name: 'img_2', value: img_2},{name: 'img_3', value: img_3},{name: 'img_4', value: img_4},{name: 'img_5', value: img_5}, {name: 'description', value: description},
            {name: 'audio_1', value: audio_1}, {name: 'audio_2', value: audio_2}, {name: 'audio_3', value: audio_3}, {name: 'audio_4', value: audio_4}, {name: 'audio_5', value: audio_5},
            {name: 'link_name_1', value: link_name_1}, {name: 'link_name_2', value: link_name_2}, {name: 'link_name_3', value: link_name_3}, {name: 'link_name_4', value: link_name_4}, {name: 'link_name_5', value: link_name_5},
            {name: 'link_value_1', value: link_value_1}, {name: 'link_value_2', value: link_value_2}, {name: 'link_value_3', value: link_value_3}, {name: 'link_value_4', value: link_value_4}, {name: 'link_value_5', value: link_value_5}
            ], true,  'PUT')
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}/${artifact_id}`, options)
    },

    createArtifact(location_id, hall_id, name, img_1, img_2, img_3, img_4, img_5, description,
                   audio_1, audio_2, audio_3, audio_4, audio_5,
                   link_name_1, link_name_2, link_name_3, link_name_4, link_name_5,
                   link_value_1, link_value_2, link_value_3, link_value_4, link_value_5
    ) { //Создание артефакта по id локации и зала
        let options = getOptions([{name: 'name', value: name},{name: 'img_1', value: img_1},{name: 'img_2', value: img_2},{name: 'img_3', value: img_3},{name: 'img_4', value: img_4},{name: 'img_5', value: img_5}, {name: 'description', value: description},
            {name: 'audio_1', value: audio_1}, {name: 'audio_2', value: audio_2}, {name: 'audio_3', value: audio_3}, {name: 'audio_4', value: audio_4}, {name: 'audio_5', value: audio_5},
            {name: 'link_name_1', value: link_name_1}, {name: 'link_name_2', value: link_name_2}, {name: 'link_name_3', value: link_name_3}, {name: 'link_name_4', value: link_name_4}, {name: 'link_name_5', value: link_name_5},
            {name: 'link_value_1', value: link_value_1}, {name: 'link_value_2', value: link_value_2}, {name: 'link_value_3', value: link_value_3}, {name: 'link_value_4', value: link_value_4}, {name: 'link_value_5', value: link_value_5}
            ], true,  'POST')
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}`, options)
    },

    deleteArtifact(location_id, hall_id, artifact_id) { //Удаление артефакта по id локации, зала и артефакта
        let options = getOptions([], true,  'DELETE')
        return fetch(baseUrl + `api/m_admin/${location_id}/${hall_id}/${artifact_id}`, options)

    },

    swapArtifacts(swap_type, obj_id) { //Изменение позиций артефактов
        let options = getOptions([{name: 'swap_type', value: swap_type},{name: 'obj_id', value: obj_id}], true,  'POST')
        return fetch(baseUrl + `api/swap_artifacts`, options)
    },

    printArtifactsCards(artifacts, size) {
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();

        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({ "artifacts": artifacts, "print_type": size});
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin/print`, requestOptions)
    },
    relocateArtifact(hall_id, artifact_id) {
        let options = getOptions([{name: 'artifact_pk', value: artifact_id},{name: 'hall_pk', value: hall_id}], true,  'POST')
        return fetch(baseUrl + `api/relocate_artifact`, options)
    },

}

export const authApi = {
    getStatus() {//Проверка пользователя
        let localToken = localStorage.getItem('accessToken')
        let accessToken = ''
        if(localToken !== null) {
            accessToken = 'Bearer  ' + localToken
        }
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/user_statuses`, requestOptions)
    },

    login(username, password) {//Логин
        let options = getOptions([{name: 'username', value: username}, {name: 'password', value: password}], false,  'POST')
        return fetch(baseUrl + `auth/jwt/create/`, options)
    },
    resetPassword(email) { //Смена пароля
        let options = getOptions([{name: 'email', value: email}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password/`, options)
    },
    resetPasswordConfirm(uid, token, new_password, re_new_password) { //Смена пароля
        let options = getOptions([{name: 'uid', value: uid}, {name: 'token', value: token}, {name: 'new_password', value: new_password}, {name: 're_new_password', value: re_new_password}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password_confirm/`, options)
    },
}

//Администратор музея
export const adminApi = {
    getAdminData() {
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/m_admin/hr_management`, requestOptions)
    },
    updateWorkerProfile(last_name, first_name, middle_name, email, worker_id) {
        let options = getOptions([{name: 'last_name', value: last_name},{name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name},
            {name: 'email', value: email}, {name: 'username', value: email}], true,  'PUT')
        return fetch(baseUrl + `api/m_admin/hr_management/${worker_id}`, options)
    },
    createWorker(last_name, first_name, middle_name, email, password, role) {
        let options = getOptions([{name: 'last_name', value: last_name},{name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name},
            {name: 'email', value: email}, {name: 'username', value: email}, {name: 'password', value: password}, {name: 'role', value: role}], true,  'POST')
        return fetch(baseUrl + `api/m_admin/hr_management`, options)
    },
    deleteWorkerProfile(worker_id) {
        let options = getOptions([], true,  'DELETE')
        return fetch(baseUrl + `api/m_admin/hr_management/${worker_id}`, options)
    },
    checkIsUserExists(email) {
        let options = getOptions([{name: 'email', value: email}], true,  'POST')
        return fetch(baseUrl + `api/is_user_exists`, options)
    }
}

//Администратор всего сервиса
export const serviceAdminApi = {
    getMuseums() { //Получение списка музеев
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/s_admin`, requestOptions)
    },
    getMuseumAdminData(museum_id) { //Получение информации об админе конкретного музея
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/s_admin/${museum_id}`, requestOptions)
    },
    createMuseum(name, img, description) { //Создание музея по супер-пользователю
        let options = getOptions([{name: 'name', value: name},{name: 'img', value: img}, {name: 'description', value: description}], true,  'POST')
        return fetch(baseUrl + `api/s_admin`, options)
    },
    deleteMuseumSuperAdmin(museum_id) { //Удаление админа музея
        let options = getOptions([], true,  'DELETE')
        return fetch(baseUrl + `api/s_admin/${museum_id}`, options)
    },
    deleteMuseum(museum_id) { //Удаление админа музея
        let options = getOptions([{name: 'museum_pk', value: museum_id}], true,  'DELETE')
        return fetch(baseUrl + `api/s_admin`, options)
    },
    createMuseumSuperAdmin(last_name, first_name, middle_name, email, password, museum_id) {
        let options = getOptions([{name: 'last_name', value: last_name},{name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name},
            {name: 'email', value: email}, {name: 'username', value: email}, {name: 'password', value: password}], true,  'POST')
        return fetch(baseUrl + `api/s_admin/${museum_id}`, options)
    },
}

//Кассир
export const cashierApi = {
    getTickets() { //Получение всех активных билетов
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/cashier`, requestOptions)
    },
    createTicket() { //Создание билета по кассиру
        let options = getOptions([], true,  'POST')
        return fetch(baseUrl + `api/cashier`, options)
    },
}

//Покупатель
export const userApi = {
    getUserArtifactData(token, artifact_id) { //Получение артефакта по id
        let options = getOptions([{name: 'token', value: token}], false,  'POST')
        return fetch(baseUrl + `api/artifacts/${artifact_id}`, options)
    },
}
