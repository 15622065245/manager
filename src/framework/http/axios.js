/*
 * @Author: your name
 * @Date: 2020-09-15 09:15:12
 * @LastEditTime: 2020-11-25 16:40:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \亮健云总后台\src\framework\http\axios.js
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
import {Notification} from 'element-ui'
import router from '@/project/router'
// create axios instance
let instance = null


if (process.env.NODE_ENV === 'development') {
  instance = axios.create({
    baseURL: '/',// api context
    transformResponse: [function (data) {
      // console.log("============data=================",data)
      if (typeof data === 'string') {
        try {
          data = JSONBig.parse(data);
        } catch (e) { /* Ignore */
        }
      }
      return data;
    }]
  })
} else {
  // 生产环境下
  instance = axios.create({
    baseURL: '/', // api context
    transformResponse: [function (data) {
      // console.log("============data=================",data)
      if (typeof data === 'string') {
        try {
          data = JSONBig.parse(data);
        } catch (e) { /* Ignore */
        }
      }
      return data;
    }]
  })
}

instance.defaults.timeout = 300000 // timeout

// request interceptors
instance.interceptors.request.use(
    // request => {
    //   return request;
    // },
    config => {
      if (sessionStorage.getItem('store_token')) {
        config.headers['Access-Token'] = sessionStorage.getItem('store_token')
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    },
    error => {
      // Do something with request error
      // console.log('request', error)
      Notification({
        title: '错误',
        message: '这是一条错误的提示消息',
        type: 'error'
      })
      Promise.reject(error)
    }
)

// response interceptors response data format {code: 200, data: {}} or {code: 400, message: "error"}
instance.interceptors.response.use(response => {
      // console.log(response,"=========response===========")
      if (response.status == 200) {
        return response.data
      }
      else if (response.status == 204) {
        return response.status
      }
      else if (response.status == 401) {
        Notification({
          title: '警告',
          message: `已在别处登录或者token失效，请重新登录`,
          type: 'warning'
        })
        sessionStorage.removeItem('store_token')
        router.push({name:'login'})
      }
      else {
        Notification({
          title: '警告',
          message: response.data,
          type: 'warning'
        })
      }
    }, error => {
      // console.log(error.response.data.code, "===========error============")
      if (error.response.data.code === '500000'||error.response.data.code === 500000) {
        Notification({
          title: '警告',
          message: error.response.data.message,
          type: 'warning'
        })
      } else {
        // console.log(error.response.data,error.response.data.message)
        if (error.response.data.code === 401000) {
          Notification({
            title:'警告',
            message:'token失效或者在别处登录，请重新登录',
            type:'warning'
          })
          sessionStorage.removeItem('store_token')
          router.push({name:'login'})
        }
        else if (error.response.data.code === 403000) {
          Notification({
            title:'警告',
            message:'暂无接口权限，请配置接口权限',
            type:'warning'
          })
        }
        else{
          let errorObject = error.response
          Notification({
            title: '警告',
            //   message: JSON.parse(error.response.data).message,
            // message: errorObject.data.message,//显示后端返回的文本
            message:'系统内部错误',
            type: 'warning'
          })
        }
      }
      // Notification({
      //   title: '警告',
      //   message: JSON.parse(error.response.data).message,
      //   type: 'warning'
      // })
    }
)

export default instance
