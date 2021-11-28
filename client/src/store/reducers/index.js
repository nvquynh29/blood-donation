import { combineReducers } from 'redux'
import volunteerReducer from './volunteerReducer'

const rootReducer = combineReducers({
    volunteer: volunteerReducer,
})

export default rootReducer