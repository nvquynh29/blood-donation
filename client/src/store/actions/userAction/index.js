import { REQUEST_USER_API, RECEIVE_USER_API, REMOVE_USER } from './userTypes'

// value: access-token
export const requestUserApi =  (value) => {
    return {
        type: REQUEST_USER_API,
        payload: value
    }
}

export const receiveUserApi =  (value) => {
    return {
        type: RECEIVE_USER_API,
        payload: value,
    }
}

export const removeUser =  () => {

    return {
        type: REMOVE_USER,
    }
}