import axios from '@/framework/http/axios'
const model = 'metaDataTable';

let findBySystemUrl = `api/${model}/findBySystem`;

export function findBySystem(param, callback) {
    axios.post(findBySystemUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            callback(data)
        }
    })
}
