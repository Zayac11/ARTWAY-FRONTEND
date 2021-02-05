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
const SET_USER_STATUS = 'SET_USER_STATUS';


let initialState = {
    userData: {}, //Данные пользователя

    isLogin: false, //Залогинен ли пользователь

    isUserServiceAdmin: true, //Является ли пользователь админом сервиса
    isUserMuseumSuperAdmin: false, //Является ли пользователь главным админом музея
    isUserMuseumAdmin: false, //Является ли пользователь админом музея
    isUserCashier: false, //Является ли пользователь кассиром

    isInitialized: false, //Инициализация приложения
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
        case SET_USER_STATUS: //Установка статуса пользователя
            return {
                ...state,
                isUserServiceAdmin: action.result.is_service_super_admin,
                isUserMuseumSuperAdmin: action.result.is_museum_super_admin,
                isUserMuseumAdmin: action.result.is_museum_admin,
                isUserCashier: action.result.is_museum_cashier,
            }
        case SET_IS_CURRENT_PASSWORD_WRONG: //Если ввели неправильный текущий пароль
            return {
                ...state,
                isCurrentPasswordWrong: true,
            }
        case SET_IS_PASSWORD_RIGHT: //Если пароль сменен успешно

            return {
                ...state,
                isSetPasswordRight: action.isPasswordRight,
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
                isCurrentPasswordWrong: false,
            }
        default:
            return state;
    }
}

export const setAuth = (isLogin) => ({type: SET_AUTH, isLogin}) //Авторизован ли пользователь
export const setLoginWrong = (isLoginWrong) => ({type: SET_LOGIN_WRONG, isLoginWrong}) //Ошибка при логине
export const setInitialized = () => ({type: SET_INITIALIZED})
export const setUserStatus = (result) => ({type: SET_USER_STATUS, result}) //статусы пользователя
export const setIsPasswordSimple = (isPasswordSimple) => ({type: SET_IS_PASSWORD_SIMPLE, isPasswordSimple})
export const setPasswordConditions = () => ({type: SET_PASSWORD_CONDITIONS}) //Обнуление условий смены пароля при закрытии страницы изменения пароля
export const setIsCurrentPasswordWrong = () => ({type: SET_IS_CURRENT_PASSWORD_WRONG}) //Текущий пароль неправильный
export const setIsPasswordRight = (isPasswordRight) => ({type: SET_IS_PASSWORD_RIGHT, isPasswordRight}) //Пароль сменен успешно
export const setIsEmailExists = (isEmailExists) => ({type: SET_IS_EMAIL_EXISTS, isEmailExists}) //Email существует или нет
export const setIsEmailTaken = (isEmailTaken) => ({type: SET_IS_EMAIL_TAKEN, isEmailTaken}) //Email занят или нет


export const getStatus = () => { //Проверка пользователя
    return (dispatch) => {
        authAPI.getStatus()
            .then(response => response.json()
                .then(result => {
                    console.log('getStatus', result)
                    dispatch(setUserStatus(result))
                    if(result.is_service_super_admin || result.is_museum_super_admin || result.is_museum_admin || result.is_museum_cashier) {
                        dispatch(setAuth(true))
                    }
                    else {
                        dispatch(setAuth(false))
                    }
                    dispatch(setInitialized())
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
                        dispatch(setIsPasswordRight(false))
                        dispatch(getStatus())
                        dispatch(setLoginWrong(false)) //Если до этого вводили неправильные данные
                    }
                    else if(result.detail === "No active account found with the given credentials") {
                        dispatch(setLoginWrong(true)) //Если ввели неправильные данные
                        dispatch(setIsPasswordRight(false))
                    }
                }))
    }
}
export const logout = () => { //Выход
    return (dispatch) => {
        localStorage.removeItem('accessToken');
        dispatch(setAuth(false))
        dispatch(setUserStatus({
            isUserServiceAdmin: false,
            isUserMuseumSuperAdmin: false,
            isUserMuseumAdmin: false,
            isUserCashier: false,
        }))
        // dispatch(deleteUserData()) //Удаление данных пользователя при выходе
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
                    else if(result === '{"current_password":["Неправильный пароль."]}') { //Пароль неверный
                        dispatch(setIsCurrentPasswordWrong())
                        dispatch(setIsPasswordSimple(false))
                    }
                    else if (result === ''){
                        dispatch(setIsPasswordRight(true))
                        dispatch(setIsPasswordSimple(false))
                        dispatch(logout())
                    }
                }))

    }
}

export const resetPassword = (email) => { //Ввод почты для смены пароля и отправка письма
    return (dispatch) => {
        // authAPI.accountRecovery(email) //Проверка почты
        //     .then(response => response.json()
        //         .then(result => {
        //             console.log('email_recovery')
        //             if(result) {
        //                 dispatch(setIsEmailExists(true))
        //                 authAPI.resetPassword(email) //Отправка письма на почту
        //                     .then(response => response.text()
        //                         .then(result => {
        //                             console.log('reset_password', result)
        //                         }))
        //             }
        //             else {
        //                 dispatch(setIsEmailExists(false))
        //             }
        //         }))
        authAPI.resetPassword(email) //Отправка письма на почту
            .then(response => response.text()
                .then(result => {
                    console.log('reset_password', result)
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

export default authReducer
