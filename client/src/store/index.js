import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import moment from 'moment'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { env } from '../../next.config'
import { composeWithDevTools } from "redux-devtools-extension"

// redux devtool
const sagaMiddleware = createSagaMiddleware()
const bindMiddleware = (middleware) => {
    if (env.MODE !== "PRODUCTION") {
     // I require this only in dev environment
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

// persist the state with local storage
const ISSERVER = typeof window === "undefined";
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) {
            return {
                volunteer: null,
                user: null,
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
            volunteer: null,
            user: null,
        }
    }
}
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
const peristedState = (ISSERVER) ? { volunteer: null, user: null}:   loadState()

const store = createStore(rootReducer, peristedState,
    bindMiddleware([sagaMiddleware]))
sagaMiddleware.run(rootSaga)
store.subscribe(() => {
    saveState(store.getState())
});

export default store