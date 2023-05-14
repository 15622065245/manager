import axios from '@/framework/http/axios'

const model = 'employee'
const authenticateByUsernameAndPasswordUrl = `api/${model}/authenticateByUsernameAndPassword`
const findWithMeUrl = `api/${model}/findWithMe`
const updateUrl = `api/${model}/update`
const logoutUrl = `api/${model}/logout`
const searchUrl = `api/${model}/find`
const countUrl = `api/${model}/count`
const saveUrl = `api/${model}/save`
const batchDeleteUrl = `api/${model}/batchDelete`
const addModuleUrl = `api/${model}/addModule`
const findModulesByIdUrl = `api/${model}/findModulesById`
const updateWithMeUrl = `api/${model}/updateWithMe`
// 获取圈子成员名单导入模板
const getTemplateUrl = `api/${model}/getTemplate`

export function authenticateByUsernameAndPassword(param, callback) {
  axios.post(authenticateByUsernameAndPasswordUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function findWithMe(param, callback) {
  axios.post(findWithMeUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function logout(param, callback) {
  axios.post(logoutUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function search(param, callback) {
  axios.post(searchUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function batchDelete(param, callback) {
  axios.post(batchDeleteUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function addModule(param, callback) {
  axios.post(addModuleUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function findModulesById(param, callback) {
  axios.post(findModulesByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function updateWithMe(param, callback) {
  axios.post(updateWithMeUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function getTemplate(param, callback) {
  axios.post(getTemplateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
