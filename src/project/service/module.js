import axios from '@/framework/http/axios'

const model = 'module'
const findByAccountTypeAndClientUrl = `api/${model}/findByAccountTypeAndClient`
const findByRoleAndClientUrl = `api/${model}/findByRoleAndClient`
const findByTypeAndClientUrl = `api/${model}/findByTypeAndClient`
const findWithMeUrl = `api/${model}/findWithMe`
const findMyModuleUrl = `api/${model}/findMy`

export function findMyModule(param, callback) {
  axios.post(findMyModuleUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      callback(data)
    }
  })
}

// 查询指定角色在指定终端能访问的模块
export function findByRoleAndClient(param, callback) {
  axios.post(findByRoleAndClientUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

// 查询指定类型的顶级菜单节点
export function findByAccountTypeAndClient(param, callback) {
  axios.post(findByAccountTypeAndClientUrl, param).then(data => {
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
