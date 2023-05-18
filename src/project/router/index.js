import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'


// 登录
import login from './login'
import account from "./account"
import role from "./role"
import basicParam from "./basic-param";
import user from "./user";
import identity from "./identity";
import model from "./model";
import cameraman from './cameraman'
import place from "./place";
import modelAudit from "./model-audit";
import cameramanAudit from "./cameraman-audit"
import placeAudit from "./place-audit";
import worksStyle from "./works-style";
import worksClothing from "./works-classify"
import systemArticle from "./system-article";
import helpArticle from "./help-article";
import feedback from "./feedback";
import customer from "./customer"
import report from "./report";
import banner from  "./banner"
import startPage from "./start-page";
import systemMessage from "./system-message";

Vue.use(Router)
Vue.use(ElementUI)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routeList = [
    // 登录
    login.routes,
    account.routes,
    role.routes,
    basicParam.routes,
    user.routes,
    identity.routes,
    model.routes,
    cameraman.routes,
    place.routes,
    modelAudit.routes,
    cameramanAudit.routes,
    placeAudit.routes,
    worksStyle.routes,
    worksClothing.routes,
    systemArticle.routes,
    helpArticle.routes,
    feedback.routes,
    customer.routes,
    report.routes,
    banner.routes,
    startPage.routes,
    systemMessage.routes

]

let routes = []

//拼接路由
routeList.map(s => {
  routes = routes.concat(s)
})

const router = new Router({
  routes: routes
})


router.afterEach(route => {
  //将滚动条恢复到最顶端
  window.scrollTo(0, 0)
})

export default router
