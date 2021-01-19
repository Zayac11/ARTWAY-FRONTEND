import {cashierApi} from "../api/api";

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
        cashierApi.getTickets()
            .then(response => response.json()
                .then(result => {
                    console.log('getTickets', result)
                    dispatch(setTickets(result))
                }))
    }
}

export const createTicket = () => { //Создание билета
    return (dispatch) => {
        cashierApi.createTicket()
            .then(response => response.json()
                .then(result => {
                    console.log('createTicket', result)
                    dispatch(setTickets(result))
                }))
    }
}


export default cashierReducer
