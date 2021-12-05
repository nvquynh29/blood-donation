import { combineReducers } from 'redux'
import volunteerReducer from './volunteerReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    volunteer: volunteerReducer,
    user: userReducer,
})

export default rootReducer