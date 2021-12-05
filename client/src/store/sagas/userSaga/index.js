import { receiveUserApi } from "../../actions/userAction"
import { REQUEST_USER_API } from "../../actions/userAction/userTypes"
import { takeLatest, call, put } from "redux-saga/effects"
import { getUser } from '../../../api/user'
import axios from "axios"
import { env } from '../../../../next.config'

//worker
function* getUserData(action) {
    try {
        const data = yield call(async() => {

            const instance = axios.create({
                baseURL: env.API_URL,
                headers: {
                    "Content-Type": "application/json",
                    "X-ACCESS-TOKEN": action.payload,
                },
            })          
            const res = await instance.get('/user')
            return res.data
        })
        yield put(receiveUserApi(data))
    } catch (e) {
        console.log(e)
    }
}

// saga
export default function* userSaga() {
    yield takeLatest(REQUEST_USER_API, getUserData)
}