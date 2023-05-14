import axios from '@/framework/http/axios'
const model = 'page';

let getListUrl = `api/${model}/find`
let countUrl = `api/${model}/count`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`
let getUrl = `api/${model}/get`

export function getList(param, callback) {
    axios.post(getListUrl, param).then(data => {
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
export function save(param, callback) {
    axios.post(saveUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function update(param, callback) {
    axios.post(updateUrl, param).then(data => {
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