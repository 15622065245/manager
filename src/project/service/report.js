import axios from '@/framework/http/axios'
const model = 'prosecution';

let deleteUrl = `api/${model}/delete`
let findUrl = `api/${model}/find`
let getUrl = `api/${model}/get`
let countUrl = `api/${model}/count`
let processUrl = `api/${model}/process`


export function deleteReport(param, callback) {
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
export function getReport(param, callback) {
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
export function processReport(param, callback) {
    axios.post(processUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}