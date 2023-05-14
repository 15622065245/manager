import axios from '@/framework/http/axios'
const model = 'user';

let getUserListUrl = `api/${model}/find`
let countUrl = `api/${model}/count`
let enableUrl = `api/${model}/enable`
let getUrl = `api/${model}/get`

export function getUserList(param, callback) {
    axios.post(getUserListUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function count(param, callback) {
    axios.post(countUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function batchEnable(param, callback) {
    axios.post(enableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function get(param, callback) {
    axios.post(getUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}