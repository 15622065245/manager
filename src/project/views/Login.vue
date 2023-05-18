<template>
  <div class="page">
    <div class="login-wrapper">
      <div class="login" :key="'login'" style="display: flex">
<!--        <div class="login-right other-info">-->
<!--          <h1 class="login-right-item" style="margin-bottom: 20px;">欢迎使用华润数据资产目录平台后台</h1>-->
<!--          <div><i class="el-icon-phone-outline"></i>&nbsp客服电话：13025486318</div>-->
<!--        </div>-->
        <div class="login-info">
          <div>
            <div class="login-wrapper-title">
              <h6 style="color: black;font-size: 36px;font-weight: 500">登录</h6>
            </div>
            <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
              <el-form-item prop="username">
                <el-input class="has-prefix" :maxlength="50" v-model="formValidate.username" placeholder="请输入账号">
                  <i class="el-icon-user-solid" slot="prefix"/>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin: 20px 0">
                <el-input
                  class="has-prefix"
                  type="password"
                  :minlength="6"
                  :maxlength="20"
                  v-model="formValidate.password"
                  placeholder="请输入密码"
                >
                  <i class="el-icon-lock" slot="prefix"/>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="handleSubmit('formValidate')" style="letter-spacing: 8px;background-color: #009688">登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, findWithMe } from "../service/account";
import {findMyModule} from "../service/module";
import {mapActions} from "vuex"
// import {authenticateByUsernameAndPassword, findWithMe} from "../service/employee";
import {findWithMe as moduleFindWithMe} from '@/project/service/module'

import {post} from '@/framework/http/request'


export default {
  name: 'Login',
  data() {
    return {
      formValidate: {
        username: '',
        password: '',
        client: 'EMPLOYEE_WEB'
      },
      ruleValidate: {
        username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
      }
    }
  },
  watch: {
    '$store.state.lang'(language) {
      if (language) {
        this.init()
      }
    }
  },
  methods: {
    ...mapActions(['onLogin']),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 如果校验成功则发送登录请求
          let param = {
            username: this.formValidate.username,
            password: this.formValidate.password,
          }
          login(param, res => {
            if(res) {
              sessionStorage.setItem('store_token', res)
            }
            findMyModule({},res => {
              localStorage.setItem("menuList", JSON.stringify(res))

              findWithMe({}, res =>{
                sessionStorage.setItem('console_cache', JSON.stringify(res))
                this.$store.dispatch("getUser", res)
                this.$router.push("/account/list")
              })
            })
          })
          // authenticateByUsernameAndPassword(param, res => {
          //   sessionStorage.setItem('console_token', res)
          //   // this.onLogin({
          //   //   username: this.formValidate.username,
          //   //   password: this.formValidate.password,
          //   // })
          //   findWithMe({}, res => {
          //     sessionStorage.setItem('console_cache', JSON.stringify(res))
          //     if (!localStorage.getItem('name_language')) {
          //       localStorage.setItem('name_language', 'zh')
          //     }
          //     sessionStorage.setItem('console_cache', JSON.stringify(res))
          //     this.$store.commit('SAVE_USER', res)
          //     // console.log(444,sessionStorage.getItem('console_cache'))
          //     // this.$store.dispatch('SAVE_USER_CACHE', res)
          //     //固定跳转
          //     // this.$router.push('/organizationHomePage/list')
          //     //动态跳转
          //     moduleFindWithMe({client: 'EMPLOYEE_WEB'}, menuData => {
          //       // console.log(menuData)
          //       this.$root.$emit('MENULIST', menuData)
          //       // localStorage.setItem('menuList', menuData)
          //       sessionStorage.menuList = JSON.stringify(menuData)
          //       //根据得到的菜单进行跳转 如系统管理员权限没有首页 跳进自己权限列表中的第一个路径
          //       var myMenu = JSON.parse(sessionStorage.getItem("menuList"))
          //       // console.log(myMenu,11111)
          //       if (myMenu.length > 0) {
          //         var gotoPath = myMenu[0].children[0].path
          //         // console.log(gotoPath)
          //         //  this.$router.push(`${gotoPath}`)
          //         this.$router.push("/account/list")
          //         sessionStorage.activePath = '0-0'
          //       } else {
          //         this.$message.warning("登陆成功,无法进行页面跳转,请联系管理员为此账号添加权限")
          //       }
          //     })
          //   })
          // })
        }
      })
    },
    init() {
      this.ruleValidate = {
        username: [{required: true, message: "账号不能为空", trigger: 'blur'}],
        password: [{required: true, message: "密码不能为空", trigger: 'blur'}],
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    sessionStorage.clear()
  },
}
</script>
<style lang="less" scoped>
.page {
  background-color: #f1f2f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -100px;

  .login-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    .login-wrapper-title {
      width: 100%;
      text-align: center;
      color: #ccc;
      padding-bottom: 50px;
    }

    .login {
      width:400px;
      height: 350px;
      padding: 20px;
      margin: 0 auto;

      .other-info {
        text-align: center;
        padding:40px;
        background-color: #009688;
        border-radius: 4px;
        box-shadow:0 0px 10px #8c939d;
        color: #FFFFFF;
      }

      .login-info {
        padding: 20px;
        border-radius: 4px;
        display: inline;flex: 1;
        background-color: #ffffff;
        box-shadow:0 0px 10px #8c939d;
      }

      .el-button--success {
        background: #19be6b;
        width: 100%;

        &.hover {
          background: #19be6f;
        }
      }
    }
  }
}

.el-input {
  width: 100%;
}
</style>
