import axios from '@/framework/http/axios'
const model = 'module';
let getUrl = `api/${model}/get`;
let findWithMeUrl = `api/${model}/findWithMe`;
let searchUrl = `api/${model}/search`;
let countUrl = `api/${model}/count`;
let deleteUrl = `api/${model}/delete`;
let batchDeleteUrl = `api/${model}/delete`;
let enableUrl = `api/${model}/enable`;
let disableUrl = `api/${model}/disable`;
let saveUrl = `api/${model}/save`;
let findByTypeAndClientUrl = `api/${model}/findByTypeAndClient`;
let findMixedScopeByRoleAndClientUrl = `api/${model}/findByRoleAndClient`;
let deleteByIdUrl = `api/${model}/deleteById`;
let updateUrl = `api/${model}/update`;
let removePermissionUrl = `api/${model}/removePermission`;
let addPermissionUrl = `api/${model}/addPermission`;

export function findWithMe(param, callback) {
  axios.post(findWithMeUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function removePermission(param, callback) {
  axios.post(removePermissionUrl, param).then(data => {
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

export function deleteById(param, callback) {
  axios.post(deleteUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function findMixedScopeByRoleAndClient(param, callback) {
  axios.post(findMixedScopeByRoleAndClientUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}


export function findByTypeAndClient(param, callback) {
  axios.post(findByTypeAndClientUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
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

export function del(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function enable(param, callback) {
  axios.post(enableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function disable(param, callback) {
  axios.post(disableUrl, param).then(data => {
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

export function findByRoleId(param, callback) {
  axios.post(`${model}/findByRoleId`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function addPermission(param, callback) {
  axios.post(addPermissionUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function removeModule(param, callback) {
  axios.post(`${model}/removeModule`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
