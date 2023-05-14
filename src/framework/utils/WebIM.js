/*
 * @Author: your name
 * @Date: 2020-12-16 10:14:51
 * @LastEditTime: 2020-12-17 10:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鸣舞总后台\wang_shu_ming_wu_console\src\framework\utils\WebIM.js
 */
import config from './WebIMConfig'
import websdk from 'easemob-websdk'
import { renderText } from './IMutils'
import store from '../../framework/store'
import Vue from 'vue'

// 初始化IM SDK
var WebIM = {}
WebIM = window.WebIM = websdk
Vue.prototype.$WebIM = WebIM
WebIM.config = config
var conn = (WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery,

  //公有云 isHttpDNS 默认配置为true
  isHttpDNS: WebIM.config.isHttpDNS

  // 私有云设置，详细文档：http://docs-im.easemob.com/im/web/other/privatedeploy
  // isHttpDNS: false,
  // url: 'xxx', // 设置为私有云的websocket server url
  // apiUrl: 'xxx' // 设置为私有云的rest server url
}))
Vue.prototype.$imconn = conn

WebIM.conn.listen({
  onOpened: function(message) {
  },
  onTextMessage: function(message) {
    let date = +new Date()
    // 普通文本信息
    let value = {
      type: 'text',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      content: renderText(message.data), // 解析表情，不知道为什么，配置了emoji表情映射，返回不走收到表情方法，而是走收到文本？？
      to: message.to,
      from: message.from,
      time: date,
      bySelf: false,
      unread: store.state.currentChatId != message.from
    }
    store.commit('updateMsgList', value)
    store.dispatch('SAVE_MSGLIST_CACHE', value)
  },
  //   收到图片消息
  onPictureMessage: function(message) {
    let date = +new Date()
    let value = {
      type: 'image',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      content: message.url,
      to: message.to,
      from: message.from,
      time: date,
      bySelf: false,
      unread: store.state.currentChatId != message.from
    }
    store.commit('updateMsgList', value)
    store.dispatch('SAVE_MSGLIST_CACHE', value)
  },
  // 收到emoji表情
  onEmojiMessage: function(message) {
    let emojiPathArr = []
    let data = message.data
    let date = +new Date()
    data.forEach(item => {
      // 当为 WebIM 添加了 Emoji 属性后，若发送的消息含 WebIM.Emoji 里特定的字符串，
      // connection 就会自动将这些字符串和其它文字按顺序组合成一个数组，
      // 每一个数组元素的结构为 {type:'emoji(或者txt)',data:'msg(或者src)'}
      emojiPathArr.push(item)
    })
    let value = {
      type: 'emoji',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      content: emojiPathArr,
      to: message.to,
      from: message.from,
      time: date,
      unread: store.state.currentChatId != message.from
    }
    _this.chatContent.push(value)
    // 实时滚动聊天屏幕
    _this.scrollChatWrapper()
    // 将聊天记录添加到缓存中
    // setChatMessage(_this.$route.query.id, value)
  }
})

export default WebIM
