import axios from '@/framework/http/axios'
const model = 'dictionary';

let findListUrl = `api/${model}/find`
let getUrl = `api/${model}/get`
let setValueUrl = `api/${model}/setValue`

export function find(param, callback) {
    axios.post(findListUrl, param).then(data => {
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
export function update(param, callback) {
    axios.post(setValueUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
