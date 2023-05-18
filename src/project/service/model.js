import axios from '@/framework/http/axios'
const model = 'works';

let getListUrl = `api/${model}/search`
let totalUrl = `api/${model}/total`
let passUrl = `api/${model}/pass`
let deleteUrl = `api/${model}/delete`
let sellUrl = `api/${model}/sell`
let getUrl = `api/${model}/get`

export function getList(param, callback) {
    axios.post(getListUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function total(param, callback) {
    axios.post(totalUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function pass(param, callback) {
    axios.post(passUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function delelteWorks(param, callback) {
    axios.post(deleteUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function sellWorks(param, callback) {
    axios.post(sellUrl, param).then(data => {
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