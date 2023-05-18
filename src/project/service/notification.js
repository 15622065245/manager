import axios from '@/framework/http/axios'
const model = 'notification';

let findUrl = `api/${model}/find`
let batchCancelUrl = `api/${model}/batchCancel`
let countUrl = `api/${model}/count`
let batchSaveUrl = `api/${model}/batchSave`


export function findNotification(param, callback) {
    axios.post(findUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function batchCancel(param, callback) {
    axios.post(batchCancelUrl, param).then(data => {
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
export function batchSave(param, callback) {
    axios.post(batchSaveUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}