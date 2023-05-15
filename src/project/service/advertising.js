import axios from '@/framework/http/axios'
const model = 'slide';

let saveUrl = `api/${model}/save`
let deleteUrl = `api/${model}/delete`
let findUrl = `api/${model}/find`
let updateUrl = `api/${model}/update`
let getUrl = `api/${model}/get`
let countUrl = `api/${model}/count`
let enableUrl = `api/${model}/enable`

export function saveSlide(param, callback) {
    axios.post(saveUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function deleteSlide(param, callback) {
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
export function updateSlide(param, callback) {
    axios.post(updateUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function getSlide(param, callback) {
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
export function enableSlide(param, callback) {
    axios.post(enableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
