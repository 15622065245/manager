<template>
  <el-header style="z-index:999;position:fixed;top: 0;width:calc(100% - 200px);display: flex;height: 48px">
    <div class="head-setting">
      <!--      头部左侧标题-->
      <div class="head-setting-left" style="margin-left: 10px;min-width: 250px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :to="{ path: item.path }" :key="index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="min-width: 100px;display: flex; justify-content: space-around;color: #333333;font-size: 14px">

        <div style="line-height: 25px;cursor: pointer;display: flex;align-items: center;margin-right: 40px">
          <el-dropdown trigger="click" @command="handleClick" placement="top">
          <div class="el-dropdown-link" style="display: flex;align-items: center">
            <el-avatar
                    shape="circle"
                    :size="30"
                    :fit="'fill'"
                    :src="`${$store.state.prefix}${store.user.avatar}`"
                    class="head-setting-right-avatar"
            ></el-avatar>
            <span style="margin-left: 15px">{{store.user.realname}}</span>
<!--            <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="information">基本资料</el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" command="editPsd">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>

      <!--      头部右侧用户头像-->
<!--      <div class="head-setting-right">-->
<!--        <el-avatar-->
<!--          shape="circle"-->
<!--          :size="30"-->
<!--          :fit="'fill'"-->
<!--          :src="`${$store.state.prefix}${store.user.avatar}`"-->
<!--          class="head-setting-right-avatar"-->
<!--        ></el-avatar>-->
<!--        <el-dropdown @command="handleClick" v-if="$route.path !== '/login'">-->
<!--          <span class="el-dropdown-link" style="font-size: 12px">{{ store.user.username }}</span>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item icon="el-icon-user" command="information">基本资料</el-dropdown-item>-->
<!--            <el-dropdown-item icon="el-icon-edit" command="editPsd">修改密码</el-dropdown-item>-->
<!--            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->

<!--        &lt;!&ndash; 修改密码弹框 &ndash;&gt;-->
        <el-dialog
          v-if="dialogVisible"
          title="修改密码"
          :visible.sync="dialogVisible"
          :append-to-body="true"
          width="40%"
          :before-close="handleClose"
        >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="当前密码" prop="currentPassword">
              <el-input type="password" v-model="ruleForm.currentPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="ruleForm.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleClose">取消</el-button>
            <el-button size="small" type="primary" @click="handleConfirm('ruleForm')">确定</el-button>
          </div>
        </el-dialog>

      <!-- 基本资料弹窗 -->
      <i-edit :dialog-visible="editVisible" :edit-id="editId" @on-dialog-close="handleEditClose"/>

    </div>
  </el-header>
</template>

<script>

import {mapActions} from "vuex"
import {changeLanguage} from "@/framework/utils/util"
import Upload from '@/framework/components/upload'
import store from "../store";
// import { updateWithMe} from "@/project/service/employee";
import {findWithMe, updateWithMe} from "@/project/service/account"
import IEdit from './edit'

export default {
  name: 'layout-header',
  components: {
    Upload,
    IEdit
  },
  data() {
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback('不能为空')
      } else if (!/^\w{6,16}$/.test(value)) {
        callback('请输入6到16位字母、数字、下划线或其组合')
      } else {
        callback()
      }
    }
    const validateNewPassConfirm = (rule, value, callback) => {
      if (this.ruleForm.newPassword !== this.ruleForm.confirmPassword) {
        callback('密码不一致，请重新输入')
      } else if (this.ruleForm.confirmPassword === '') {
        callback('不能为空')
      } else {
        callback()
      }
    }
    const avatarValidate = (rule, value, callback) => {
      if (this.formValidate.avatar === '' || !this.formValidate.avatar) {
        callback('请上传头像')
      } else {
        callback()
      }
    }
    const phoneValidate = (rule, value, callback) => {
      if (value == '') {
        callback(this.$t('project.请输入手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(this.$t('project.请输入正确手机号格式'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      editVisible: false,
      isFinished: false,
      // name: this.$store.state.name,
      rules: {
        currentPassword: [{trigger: 'blur', required: 'true', message: '不能为空'}],
        newPassword: [{validator: validateNewPass, trigger: 'blur', required: 'true'}],
        confirmPassword: [{validator: validateNewPassConfirm, trigger: 'blur', required: 'true'}]
      },
      ruleForm: {
        originPass: '',
        newPass: '',
        newPassConfirm: ''
      },
      formValidate: {
        username: '',
        realname: '',
        phone: '',
        comment: '',
        avatar: '',
      },
      ruleValidate: {
        username: [{required: true, message: '不能为空', trigger: 'blur'}],
        realname: [{required: true, message: '不能为空', trigger: 'blur'}],
        avatar: [{required: true, validator: avatarValidate}],
        phone: [{required: true, validator: phoneValidate, trigger: 'blur'}],
      },
      model: 'employee',
      user: {},
      editId: 0, //编辑id
    }
  },
  computed: {
    breadcrumbList() {

      // return ['一级菜单', '二级菜单', '三级菜单']
       return this.$route.meta.breadcrumb
    },
    store() {
      return this.$store.state
    },
    name: {
      get() {
        return this.$store.state.name
      },
      set(val) {
      }
    }
  },
  watch: {
    // 监听editId的变化，如果发生变化则获取对应id的数据
    editVisible(val) {
      if (val) {
        this.get()
      }
    },
    // 'formValidate.avatar'() {
    //   this.$nextTick(() => {
    //     this.$refs.formValidate.validateField('avatar')
    //   })
    // }
  },
  methods: {
    ...mapActions(['getUser']),
    handleEditClose() {
      this.editVisible = false
    },
    //上传图片
    handleTransportFileList(fileList) {
      // console.log(fileList, 111111111)
      if (fileList.length > 0) {
        this.formValidate.avatar = fileList[0].response.data
      } else {
        this.formValidate.avatar = ''
      }
    },
    handleSuccess(fileList) {
      if (fileList.length > 0) {
        this.formValidate.avatar = fileList[0].response
      } else {
        this.formValidate.avatar = ''
      }
      // console.log(this.formValidate.avatar)
    },
    avatarHandleRemove(file, fileList) {
      if (file.length == 0) {
        this.formValidate.avatar = ''
      }
    },
    handleClick(val) {
      switch (val) {
        case 'information':
          this.editVisible = true
          break
        case 'editPsd':
          this.dialogVisible = true
          break
        case 'logout':
          this.$post('api/manager/logout', {}, (res) => {
            this.$message.success('退出成功')
            // 清除缓存
            sessionStorage.removeItem('console_cache')
            localStorage.removeItem('menuList')
            sessionStorage.removeItem('store_token')
            // localStorage.removeItem('currentChatId')
            sessionStorage.clear()
            // 退出环信
            // this.$imconn.close()
            this.$router.push({path: '/login'})
          })
          break
      }
    },

    handleClose() {
      this.isFinished = false
      this.dialogVisible = false
      this.$refs.ruleForm.resetFields()
      this.editVisible = false
    },
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        this.$axios({
          method: 'post',
          url: '/api/manager/updatePassword',
          data: {
            currentPassword: this.ruleForm.currentPassword,
            newPassword: this.ruleForm.newPassword,
            confirmPassword: this.ruleForm.confirmPassword,
          },
          headers: {
            'Access-Token': sessionStorage.getItem('store_token')
          }
        }).then(res => {
          if (res.status === 204) {
            this.dialogVisible = false
            this.$message.success('修改成功，请重新登录')
              sessionStorage.clear()
            this.$refs.ruleForm.resetFields()
            setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 1000)
          } else {
            this.$notify.warning('原密码错误')
            this.$message.warning('原密码错误')
          }
          // if (res.data.code !== 200) {
          //   this.$notify.warning('原密码错误')
          //   this.ruleForm.originPass = ''
          // } else {
          //   this.$message.success('修改成功，请重新登录')
          //   sessionStorage.clear()
          //   this.$router.push({path: '/login'})
          // }
        })
      })
    },
    get() {
      findWithMe({}, res => {
        console.log("用户", res)
        this.formValidate = res
        this.formValidate.avatar = res.avatar
        this.isFinished = true
        // 重新把编辑完整的user存到缓存上
        this.getUser();
        sessionStorage.setItem('console_cache', JSON.stringify(res))
      })
    },
    handleConfirmInfo(name) {
      this.$nextTick(() => {
        this.$refs[name].validate((valid) => {
          if (!valid) return false
          // let params = JSON.parse(JSON.stringify(this.formValidate))
          let params={
            avatar:this.formValidate.avatar,
            username:this.formValidate.username,
            realname:this.formValidate.realname
          }
          // console.log(params,'编辑基本资料参数')
          updateWithMe({[this.model]: params}, () => {
            this.$message.success('修改成功,请重新登录')
            this.handleClose()
            sessionStorage.clear()
            this.$router.push({path: '/login'})
          })
        })
      })
    },
  },
  mounted() {
    if (localStorage.getItem('name_language') == 'ja') {
      this.language = this.$t('project.日文')
    } else {
      this.language = this.$t('project.中文')
    }
  }
}
</script>

<style lang="less" scoped>

.head-setting {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(9, 18, 26, 0.06), 0 4px 8px 0 rgba(39, 56, 73, 0.08);
  background: #fff;

  > span {
    font-size: 12px;
  }

  /deep/ .el-input__inner {
    /*border: none;*/
    /*text-align: right;*/
  }

  /deep/ .el-input {
    width: 100px;
  }

  .head-setting-right {
    height: 100%;
    .head-setting-right-avatar {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
/deep/ .el-header {
  padding: 0 0;
}
.el-dropdown-menu {
  background: #ffffff;
  width: 123px;
  padding: 6px 0;
  font-size: 14px;
  margin: 0;
  border-radius: 0;

  &.en {
    width: 180px;
  }

  .el-dropdown-menu__item {
    color: #606266;

    &:hover {
      background: #f5f7fa;
      color: #606266;
    }
  }

  .popper__arrow {
    opacity: 1;
  }
}

.head-setting /deep/ .el-select__caret {
  opacity: 0 !important;
}
/deep/ .el-badge__content {
  background-color: #d9001b;
}
</style>
