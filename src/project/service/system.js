import axios from '@/framework/http/axios'
const model = 'system';

let findUrl = `api/${model}/find`;

export function find(param, callback) {
    axios.post(findUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
