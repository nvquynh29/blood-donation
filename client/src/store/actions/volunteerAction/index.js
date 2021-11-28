import { FILL_VOLUNTEER, REMOVE_VOLUNTEER } from './volunteerTypes'
export const fillVolunteer =  (value) => {
    return {
        type: FILL_VOLUNTEER,
        payload: value,
    }
}

export const removeVolunteer =  () => {

    return {
        type: REMOVE_VOLUNTEER,
    }
}