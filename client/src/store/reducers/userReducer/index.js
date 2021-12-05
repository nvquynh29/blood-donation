import { RECEIVE_USER_API, REMOVE_USER } from "../../actions/userAction/userTypes"

export default function userReducer(state = null, action) {
    switch (action.type) {
        case RECEIVE_USER_API:
            return action.payload 
        case REMOVE_USER:
            return null
    }
    return state
}