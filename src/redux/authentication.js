import {authApi as authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const SET_AUTH = 'SET_AUTH';
const SET_LOGIN_WRONG = 'SET_LOGIN_WRONG';
const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_PASSWORD_CONDITIONS = 'SET_PASSWORD_CONDITIONS';
const SET_IS_CURRENT_PASSWORD_WRONG = 'SET_IS_CURRENT_PASSWORD_WRONG';
const SET_IS_PASSWORD_RIGHT = 'SET_IS_PASSWORD_RIGHT';
const SET_IS_PASSWORD_SIMPLE = 'SET_IS_PASSWORD_SIMPLE';
const SET_IS_EMAIL_EXISTS = 'SET_IS_EMAIL_EXISTS';
const SET_IS_EMAIL_TAKEN = 'SET_IS_EMAIL_TAKEN';
const IS_FETCH = 'IS_FETCH';


let initialState = {
    userData: {}, //Данные пользователя

    isLogin: true, //Залогинен ли пользователь

    isInitialized: false, //Инициализация приложения
    isFetch: true,
    isLoginWrong: false, //Если ошибка при логине
    isSetPasswordRight: false, //Если успешно сменил пароль
    isCurrentPasswordWrong: false, //Если текущий пароль неправильный
    isEmailExists: true, //Существует ли пользователь с таким email
    isEmailTaken: false, //Занят ли такой email
    isPasswordSimple: false, //Распространен ли пароль
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: //Установка пользовательских данных
            return {
                ...state,
                userData: action.userData,
            }
        case UPDATE_USER_DATA: //Обновление данных пользователя
            return {
                ...state,
                userData: {
                    ...state.userData,
                    first_name: action.first_name,
                    last_name: action.last_name,
                    middle_name: action.middle_name,
                    phone_number: action.phone_number,
                },
            }
        case DELETE_USER_DATA: //Удаление данных пользователя
            return {
                ...state,
                userData: {},
            }
        case SET_AUTH: //Залогинен ли пользователь
            return {
                ...state,
                isLogin: action.isLogin,
            }
        case SET_LOGIN_WRONG: //Неверный логин или пароль
            return {
                ...state,
                isLoginWrong: action.isLoginWrong,
            }
        case SET_INITIALIZED: //Инициализировалось ли приложение
            return {
                ...state,
                isInitialized: true,
            }
        case IS_FETCH: //Загрузка
            return {
                ...state,
                isFetch: action.isFetch,
            }
        case SET_IS_CURRENT_PASSWORD_WRONG: //Если ввели неправильный текущий пароль
            return {
                ...state,
                isCurrentPasswordWrong: true,
            }
        case SET_IS_PASSWORD_RIGHT: //Если пароль сменен успешно
            return {
                ...state,
                isSetPasswordRight: true,
            }
        case SET_IS_PASSWORD_SIMPLE: //Простой ли пароль
            return {
                ...state,
                isPasswordSimple: action.isPasswordSimple,
            }
        case SET_IS_EMAIL_EXISTS: //Существует ли email
            return {
                ...state,
                isEmailExists: action.isEmailExists,
            }
        case SET_IS_EMAIL_TAKEN: //Зарегистрирован ли такой email
            return {
                ...state,
                isEmailTaken: action.isEmailTaken,
            }
        case SET_PASSWORD_CONDITIONS: //Обнуление условий смены пароля при закрытии страницы изменения пароля
            return {
                ...state,
                isSetPasswordRight: false,
                isCurrentPasswordWrong: false,
            }
        default:
            return state;
    }
}

export const setUserData = (userData) => ({type: SET_USER_DATA, userData}) //Данные пользователя
export const updateUserData = (last_name, first_name, middle_name, phone_number) => ({type: UPDATE_USER_DATA, last_name, first_name, middle_name, phone_number}) //Обновление данные пользователя
export const deleteUserData = () => ({type: DELETE_USER_DATA}) //Удаление данных пользователя
export const setAuth = (isLogin) => ({type: SET_AUTH, isLogin}) //Авторизован ли пользователь
export const setLoginWrong = (isLoginWrong) => ({type: SET_LOGIN_WRONG, isLoginWrong}) //Ошибка при логине
export const setInitialized = () => ({type: SET_INITIALIZED})
export const setFetch = (isFetch) => ({type: IS_FETCH, isFetch})
export const setIsPasswordSimple = (isPasswordSimple) => ({type: SET_IS_PASSWORD_SIMPLE, isPasswordSimple})
export const setPasswordConditions = () => ({type: SET_PASSWORD_CONDITIONS}) //Обнуление условий смены пароля при закрытии страницы изменения пароля
export const setIsCurrentPasswordWrong = () => ({type: SET_IS_CURRENT_PASSWORD_WRONG}) //Текущий пароль неправильный
export const setIsPasswordRight = () => ({type: SET_IS_PASSWORD_RIGHT}) //Пароль сменен успешно
export const setIsEmailExists = (isEmailExists) => ({type: SET_IS_EMAIL_EXISTS, isEmailExists}) //Email существует или нет
export const setIsEmailTaken = (isEmailTaken) => ({type: SET_IS_EMAIL_TAKEN, isEmailTaken}) //Email занят или нет


export const account = () => { //Проверка пользователя
    return (dispatch) => {
        authAPI.account()
            .then(response => response.json()
                .then(result => {
                    console.log('account', result)
                    dispatch(setInitialized())
                    if(result.id) {
                        dispatch(setUserData(result))
                        dispatch(setAuth(true))
                    }
                }))
    }
}

export const accountChange = (last_name, first_name, middle_name, phone_number) => { //Изменение данных пользователя
    return (dispatch) => {
        authAPI.accountChange(last_name, first_name, middle_name, phone_number)
            .then(response => response.json()
                .then(result => {
                    console.log('account Change', result)
                    if(result) {
                        dispatch(updateUserData(last_name, first_name, middle_name, phone_number))
                    }
                }))
    }
}

export const login = (username, password) => { //Логин
    return (dispatch) => {
        authAPI.login(username, password)
            .then(response => response.json()
                .then(result => {
                    if(result.detail !== "No active account found with the given credentials") {
                        console.log('login', result)
                        localStorage.setItem('accessToken', result.access)

                        // dispatch(account()) //Получение данных пользователя после логина

                        dispatch(setAuth(true)) //Авторизован ли пользователь
                        dispatch(setLoginWrong(false)) //Если до этого вводили неправильные данные
                    }
                    else if(result.detail === "No active account found with the given credentials") {
                        dispatch(setLoginWrong(true)) //Если ввели неправильные данные или аккаунт не активный
                    }
                }))
    }
}
export const logout = () => { //Выход
    return (dispatch) => {
        localStorage.removeItem('accessToken');
        dispatch(setAuth(false))
        dispatch(deleteUserData()) //Удаление данных пользователя при выходе
    }
}

export const registration = (username, password, email, last_name, first_name, middle_name, phone_number) => { //Регистрация
    return (dispatch) => {
        dispatch(setFetch(true))
        authAPI.register(username, password, email, last_name, first_name, middle_name, phone_number)
            .then(response => response.json()
                .then(result => {
                    console.log('register', result)
                    if (result.id) {
                        dispatch(setIsEmailTaken(false))
                        dispatch(setIsPasswordSimple(false))
                    }
                    else if(result.username) {
                        dispatch(setIsEmailTaken(true))
                        dispatch(setIsPasswordSimple(false))
                    }
                    else if(result.password) {
                        dispatch(setIsPasswordSimple(true))
                        dispatch(setIsEmailTaken(false))
                    }

                }))
    }
}
export const activation = (uid, token) => { //Активация аккаунта
    return (dispatch) => {
        authAPI.activation(uid, token)
            .then(response => response.text()
                .then(result => {
                    console.log('activation', result)
                    dispatch(setFetch(false))
                }))
    }
}

export const setPassword = (current_password, new_password, re_new_password) => { //Смена пароля
    return (dispatch) => {
        authAPI.setPassword(current_password, new_password, re_new_password)
            .then(response => response.text()
                .then(result => {
                    console.log('set_password', result)
                    if(result === '{"new_password":["Введённый пароль слишком широко распространён."]}') {
                        dispatch(setIsPasswordSimple(true))
                    }
                    else if(result === '{"current_password":["Invalid password."]}') { //Пароль неверный
                        dispatch(setIsCurrentPasswordWrong())
                        dispatch(setIsPasswordSimple(false))
                    }
                    else {
                        dispatch(setIsPasswordRight())
                        dispatch(setIsPasswordSimple(false))
                        dispatch(logout())
                    }
                }))
    }
}

export const resetPassword = (email) => { //Ввод почты для смены пароля и отправка письма
    return (dispatch) => {
        authAPI.accountRecovery(email) //Проверка почты
            .then(response => response.json()
                .then(result => {
                    console.log('email_recovery')
                    if(result) {
                        dispatch(setIsEmailExists(true))
                        authAPI.resetPassword(email) //Отправка письма на почту
                            .then(response => response.text()
                                .then(result => {
                                    console.log('reset_password', result)
                                }))
                    }
                    else {
                        dispatch(setIsEmailExists(false))
                    }
                }))

    }
}

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => { //Смена пароля и токены
    return (dispatch) => {
        authAPI.resetPasswordConfirm(uid, token, new_password, re_new_password)
            .then(response => response.text()
                .then(result => {
                    console.log('reset_password_confirm', result)
                    if(result === '{"new_password":["Введённый пароль слишком широко распространён."]}') {
                        dispatch(setIsPasswordSimple(true))
                    }
                    else {
                        dispatch(setIsPasswordSimple(false))
                        dispatch(logout())
                    }
                }))
    }
}

export const initialized = () => {
    return async (dispatch) => {

    }
}

export default authReducer
