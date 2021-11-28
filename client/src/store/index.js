import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import moment from 'moment'

const enhancers =  compose(
    (typeof window !== 'undefined' && window.devToolsExtension) ? 
    window.devToolsExtension() : f => f
)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) {
            return {
                volunteer: null
            };
        }
        const state = JSON.parse(serializedState)
        if (state.volunteer?.birthday) {
            state.volunteer.birthday = moment(state.volunteer.birthday)
        } 
        return state
    } catch (e) {
        console.log(e)
        return {
            volunteer: null
        }
    }
};

const saveState = (state) => {
    try {
        const newState = {...state}
        if (newState.volunteer?.birthday) {
            newState.volunteer.birthday = moment(newState.volunteer.birthday).format('YYYY-MM-DD')
        }
        
        const serializedState = JSON.stringify(newState)
        localStorage.setItem('state', serializedState)
        state.volunteer.birthday = moment(newState.volunteer.birthday)
    } catch (e) {
        // Ignore write errors;
        console.log(e)
    }
}

const peristedState = loadState();

const store = createStore(rootReducer, peristedState, 
enhancers)
store.subscribe(() => {
    saveState(store.getState())
});

export default store