import axios from '@/framework/http/axios'

const model = 'catalog';
const saveCatalogUrl = `api/${model}/save`;
const findCatalogByParentIdUrl = `api/${model}/findByParentId`;
const findAllCatalogUrl = `api/${model}/findAll`;
const updateCatalogUrl = `api/${model}/update`;
const findCatalogByParentIsNullUrl = `api/${model}/findByParentIsNull`;
const deleteCatalogUrl = `api/${model}/delete`;

//  新增目录
export function saveCatalog(param, callback) {
    axios.post(saveCatalogUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}

//  根据目录Id查询子目录
export function findCatalogByParentId(param, callback) {
    axios.post(findCatalogByParentIdUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}

//  编辑目录
export function updateCatalog(param, callback) {
    axios.post(updateCatalogUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}


//  查询顶级目录
export function findCatalogByParentIsNull(param,callback) {
    axios.post(findCatalogByParentIsNullUrl,param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}

//  查询所有目录
export function findAllCatalog(param,callback) {
    axios.post(findAllCatalogUrl,param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}

//  删除目录
export function deleteCatalog(param, callback) {
    axios.post(deleteCatalogUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}