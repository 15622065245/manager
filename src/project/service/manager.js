import axios from '@/framework/http/axios'
const model = 'manager';
let authenticateByUsernameUrl = `api/${model}/authenticateByUsername`
let findWithMe = `api/${model}/findWithMe`
const saveUrl = `api/${model}/save`
const getUrl = `api/${model}/get`
const updateUrl = `api/${model}/update`
const deleteUrl = `api/${model}/delete`
const batchDeleteUrl = `api/${model}/batchDelete`

//通过账号和密码认证
export function authenticateByUsername(param, callback) {
  axios.post(authenticateByUsernameUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

//获取本人的数据
export function findWithMe(param, callback) {
  axios.post(findWithMe, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
// 获取管理员
export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

// 新建管理员
export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

// 批量删除管理员
export function batchDelete(param, callback) {
  axios.post(batchDeleteUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
// 删除管理员
export function deleteById(param, callback) {
  axios.post(deleteUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

// 编辑管理员
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
