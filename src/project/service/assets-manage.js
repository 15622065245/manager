import axios from '@/framework/http/axios'

const model = 'asset';

const findAssetUrl = `api/${model}/find`;
const getAttributeOfAssetUrl = `api/${model}/getAttribute`;
const unReleaseAssetUrl = `api/${model}/unRelease`;
const getAssetDetailUrl = `api/${model}/get`;
const deleteAssetUrl = `api/${model}/delete`;
const saveAssetAssetUrl = `api/${model}/save`;
const releaseAssetUrl = `api/${model}/release`;
const findByTypeOfAssetUrl = `api/${model}/findByType`;

// 查询资产
export function findAsset(param, callback) {
    axios.post(findAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 查询动态属性
export function getAttributeOfAsset(param, callback) {
    axios.post(getAttributeOfAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 下架
export function unReleaseAsset(param, callback) {
    axios.post(unReleaseAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 资产详情
export function getAssetDetail(param, callback) {
    axios.post(getAssetDetailUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 删除资产
export function deleteAsset(param, callback) {
    axios.post(deleteAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 新增资产
export function saveAsset(param, callback) {
    axios.post(saveAssetAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 上架
export function releaseAsset(param, callback) {
    axios.post(releaseAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}
// 根据类型查询资产
export function findByTypeOfAsset(param, callback) {
    axios.post(findByTypeOfAssetUrl, param).then(data => {
        if (data !== undefined && data !== '' && data !== null) {
            // callback when data is exist
            callback(data)
        }
    })
}