import axios from '@/framework/http/axios'
const model = 'column';

let findByTableUrl = `api/${model}/findByTable`;

export function findByTable(param, callback) {
    axios.post(findByTableUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
