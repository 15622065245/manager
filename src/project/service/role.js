import axios from '@/framework/http/axios'
const model = 'role';

let getRoleListUrl = `api/${model}/find`
let countUrl = `api/${model}/count`
let saveRoleUrl = `api/${model}/save`
let updateRoleUrl = `api/${model}/update`
let deleteRoleUrl = `api/${model}/delete`
export function getRoleList(param, callback) {
    axios.post(getRoleListUrl, param).then(data => {
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
export function saveRole(param, callback) {
    axios.post(saveRoleUrl, param).then(data => {
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
export function deleteRole(param, callback) {
    axios.post(deleteRoleUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}