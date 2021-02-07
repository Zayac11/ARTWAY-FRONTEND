import {cashierApi} from "../api/api";
import {toggleIsFetching} from "./authentication";

const SET_TICKETS = 'SET_TICKETS'

let initialState = {
    tickets: [], //Все активные билеты
}

const cashierReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets
            }
        default:
            return state;
    }
}

export const setTickets = (tickets) => ({type: SET_TICKETS, tickets})

export const getTickets = () => { //Получение списка активных билетов
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        cashierApi.getTickets()
            .then(response => response.json()
                .then(result => {
                    console.log('getTickets', result)
                    dispatch(setTickets(result))
                    dispatch(toggleIsFetching(false))
                }))
    }
}

export const createTicket = () => { //Создание билета
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        cashierApi.createTicket()
            .then(response => response.json()
                .then(result => {
                    console.log('createTicket', result)
                    dispatch(setTickets(result))
                    dispatch(toggleIsFetching(false))
                }))
    }
}


export default cashierReducer
