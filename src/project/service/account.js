import axios from '@/framework/http/axios'
const model = 'manager';

let findByTableUrl = `api/${model}/find`;
let loginUrl = `api/${model}/login`;
let countUrl = `api/${model}/count`
let saveUrl = `api/${model}/save`
let updateUrl = `api/${model}/update`
let getUrl = `api/${model}/get`
let deleteUrl = `api/${model}/delete`
let enableUrl = `api/${model}/enable`
let updateRoleUrl = `api/${model}/updateRole`
let getWithMeUrl = `api/${model}/getWithMe`
let updateWithMeUrl = `api/${model}/updateWithMe`

export function findByTable(param, callback) {
    axios.post(findByTableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function login(param, callback) {
    axios.post(loginUrl, param).then(data => {
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
export function saveAccount(param, callback) {
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
export function deleteAccount(param, callback) {
    axios.post(deleteUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function enableAccount(param, callback) {
    axios.post(enableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function updateRole(param, callback) {
    axios.post(updateRoleUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function findWithMe(param, callback) {
    axios.post(getWithMeUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
export function updateWithMe(param, callback) {
    axios.post(updateWithMeUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}