import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import {findWithMe} from "../../project/service/account"
// import { findAllCatalog } from '@/project/service/catalogue'
import it from "element-ui/src/locale/lang/it";

Vue.use(Vuex)
const myPrefix=()=>{
  //保存当前域名
  var myHost=location.protocol+'//' + location.host
  if (myHost.indexOf("localhost")>0){
    //本地时 图片前缀为
    myHost="http://dev17.paoding.team"
  }
  return myHost+"/attachment/"
}
const initPageState = () => {
  return {
    user: {
      username: '' || JSON.parse(sessionStorage.getItem('console_cache')) ? JSON.parse(sessionStorage.getItem('console_cache')).username : '',
      realname: '' || JSON.parse(sessionStorage.getItem('console_cache')) ? JSON.parse(sessionStorage.getItem('console_cache')).realname : '',
      avatar: '' || JSON.parse(sessionStorage.getItem('console_cache')) ? JSON.parse(sessionStorage.getItem('console_cache')).avatar : '',
      id: '' || JSON.parse(sessionStorage.getItem('console_cache')) ? JSON.parse(sessionStorage.getItem('console_cache')).id : ''
    },
    prefix: myPrefix(),
    language: localStorage.getItem('name_language') || 'zh',
    title: '华润资产目录平台',
    name: localStorage.getItem('name_language')
      ? (localStorage.getItem('name_language') === 'zh' ? '中文' : '日本語') : '中文',
    IM: {
      username: (localStorage.IMinfo && JSON.parse(localStorage.IMinfo).username) || "",
      password: (localStorage.IMinfo && JSON.parse(localStorage.IMinfo).password) || "",
    },
    msgList: (localStorage.msgList && JSON.parse(localStorage.msgList)) || {},
    currentChatId: localStorage.currentChatId || '',
    catalogueList:[],
  }
}
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initPageState(),
  getters: {},
  mutations: {
    requestGetUser(state,res) {
      for( const prop in res){
        state.user[prop] = res[prop]
      }
    },
    [types.SAVE_USER](state, pageState) {
      for (const prop in pageState) {
        if (!pageState.avatar) {
          state.user.avatar = ''
        }
        state.user[prop] = pageState[prop]
      }
    },
    SAVE_LANG(state, lang) {
      state.language = lang
    },
    SAVE_TITLE(state, title) {
      state.title = title
    },
    SAVE_NAME(state, name) {
      state.name = name
    },
    SET_IM(state, value) {
      for (const prop in value) {
        state.IM[prop] = value[prop]
      }
    },
    updateMsgList(state, msgList) {
      let signId = msgList.bySelf ? msgList.to : msgList.from
      if (!state.msgList[signId]) {
        state.msgList[signId] = []
        state.msgList[signId].push(msgList)
      } else {
        state.msgList[signId].push(msgList)
      }
      state.msgList = JSON.parse(JSON.stringify(state.msgList))
    },
    SAVE_CURRENT_CHAT_ID(state, id) {
      state.currentChatId = id
    },
    CHANGE_SLOT(state, id) {
      const key = id + ''
      if (state.msgList[key] && state.msgList[key].length > 0) {
        state.msgList[key].forEach(item => {
          item.unread = false
        })
      }
    },
    CLEAR_CURRENTCHAT_ID(state) {
      state.currentChatId = ''
    },
    GET_CATALOGUE_LIST(state,catalogueList) {
      state.catalogueList = catalogueList
    }
  },
  actions: {
    [types.SAVE_USER_CACHE]() {
      let user = this.state.user
      if (user.id !== '') {
        if (window.sessionStorage) {
          let ls = window.sessionStorage
          let storeCache = ls.getItem('console_cache')
          if (storeCache) {
            ls.removeItem('console_cache')
          }
          ls.setItem('console_cache', JSON.stringify(user))
        }
      }
    },
    [types.CLEAR_USER_CACHE]() {
      if (window.sessionStorage) {
        let ls = window.sessionStorage
        ls.removeItem('console_cache')
      }
    },
    [types.GET_USER_CACHE]() {
      if (window.sessionStorage) {
        let ls = window.sessionStorage
        let userStr = ls.getItem('console_cache')
        let user = JSON.parse(userStr)
        this.commit(types.SAVE_USER, {
          user: user
        })
      }
    },
    [types.GET_USER_EXIST]() {
      if (window.sessionStorage) {
        let ls = window.sessionStorage
        let userStr = ls.getItem('console_cache')
        return !!userStr
      }
    },
    onLogin: function(context, payload) {
      context.commit("SET_IM", payload)
      var options = {
        user: payload.username,
        pwd: payload.password,
        appKey: WebIM.config.appkey,
      }
      WebIM.conn.open(options) //登录
      localStorage.setItem("IMinfo", JSON.stringify({ username: payload.username, password: payload.password }))
    },
    // 获取用户信息
    getUser: context => {
      findWithMe({},res=>{
        context.commit('requestGetUser',res)
      })
    },
    SAVE_MSGLIST_CACHE(context, payload) {
      let signId = payload.bySelf ? payload.to : payload.from
      let msgList = JSON.parse(localStorage.msgList)
      if (!msgList[signId]) {
        msgList[signId] = []
        msgList[signId].push(payload)
        localStorage.setItem("msgList", JSON.stringify(msgList))
      } else {
        msgList[signId].push(payload)
        localStorage.setItem("msgList", JSON.stringify(msgList))
      }
    },
    // 切换小红点的显示与隐藏（即修改）
    CHANGE_SLOT(context, payload) {
      // 同步vuex
      context.commit('CHANGE_SLOT', payload)
      // 修改缓存
      const key = payload + ''
      let msgList = JSON.parse(localStorage.msgList)
      if (msgList[key] && msgList[key].length > 0) {
        msgList[key].forEach(item => {
          if (item.unread) item.unread = false
        })
        localStorage.setItem('msgList', JSON.stringify(msgList))
      }
    },
    // getCatalogueList({commit}){
    //   findAllCatalog(undefined,data=>{
    //     const formatId = (arr)=>{
    //       arr.forEach(item=>{
    //         item.id = item.id.toString()
    //         if (item.children.length!==0){
    //           formatId(item.children)
    //         }
    //       });
    //     }
    //     formatId(data);
    //     // console.log(data)
    //     commit('GET_CATALOGUE_LIST',data)
    //   })
    // }
  }
})

export default store
