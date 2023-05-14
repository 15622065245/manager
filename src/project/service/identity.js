import axios from '@/framework/http/axios'
const model = 'identification';

let getIdentificationListUrl = `api/${model}/find`
let countUrl = `api/${model}/count`
let passIdentificationUrl = `api/${model}/pass`
let getIdentificationUrl = `api/${model}/get`

export function getIdentificationList(param, callback) {
    axios.post(getIdentificationListUrl, param).then(data => {
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
export function passIdentification(param, callback) {
    axios.post(passIdentificationUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function getIdentification(param, callback) {
    axios.post(getIdentificationUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
