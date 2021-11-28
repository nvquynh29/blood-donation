import {FILL_VOLUNTEER, REMOVE_VOLUNTEER } from '../../actions/volunteerAction/volunteerTypes'

const volunteerReducer = (state = null, action) => {
    switch (action.type) {
        case FILL_VOLUNTEER:
            return action.payload
        case REMOVE_VOLUNTEER:
            return null
    }
    return state
} 

export default volunteerReducer