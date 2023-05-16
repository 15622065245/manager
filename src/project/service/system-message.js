import axios from '@/framework/http/axios'
const model = 'notificationPacket';

let deleteUrl = `api/${model}/delete`
let findUrl = `api/${model}/find`
let getUrl = `api/${model}/get`
let countUrl = `api/${model}/count`
let saveUrl = `api/${model}/save`


export function deleteMessage(param, callback) {
    axios.post(deleteUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function findByTable(param, callback) {
    axios.post(findUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function getMessage(param, callback) {
    axios.post(getUrl, param).then(data => {
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
export function saveMessage(param, callback) {
    axios.post(saveUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}