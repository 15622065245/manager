<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    width="40%"
    :before-close="handleClose"
    v-dialogDrag
    :close-on-click-modal="false"
  >
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
      <el-form-item label="账号" prop="username">
        <el-input v-model.trim="formValidate.username" placeholder="请输入" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="realname">
        <el-input v-model.trim="formValidate.realname" placeholder="请输入" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <transition name="opacity">
          <upload
            @on-transport-file-list="handleTransportFileList"
            @handleRemove="handleRemove"
            :file-list="formValidate.avatar ? formValidate.avatar.split(';') : []"
            @handleSuccess="handleSuccess"
            :max-size="5120"
            :limit="1"
            v-if="isFinished"
          ></upload>
        </transition>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm('formValidate')">确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Upload from '@/framework/components/upload'
import {post} from '@/framework/http/request'
import {updateWithMe} from '@/project/service/account'
import emitter from '@/framework/mixins/emitter'

export default {
  mixins: [emitter],
  components: {
    Upload,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    editId: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    const avatarValidate = (rule, value, callback) => {
      if (this.formValidate.avatar === '') {
        callback('请上传头像')
      } else {
        callback()
      }
    }
    return {
      model: 'manager',
      formValidate: {},
      ruleValidate: {
        username: [{required: true, message: '不能为空', trigger: 'blur'}],
        realname: [{required: true, message: '不能为空', trigger: 'blur'}],
        avatar: [{required: true, validator: avatarValidate}],
      },
      isFinished: false,
    }
  },
  watch: {
    // 监听editId的变化，如果发生变化则获取对应id的数据
    dialogVisible(val) {
      if (val) {
        this.findWithMe()
          console.log("this.w", this.editId)
      }
    },
    'formValidate.avatar'(val) {
      if (val) {
        this.$refs.formValidate.validateField('avatar')
      }
    },
  },
  methods: {
    handleClose() {
      // this.$refs.formValidate.resetFields()
      this.$emit('on-dialog-close')
      this.isFinished = false
    },
    handleConfirm(name) {
      //指向广播 this.broadcast为混入的方法
      // this.broadcast('SiUpload', 'on-form-submit', () => {})
      this.$nextTick(() => {
        this.$refs[name].validate((valid) => {
          if (!valid) return false
            console.log("this.form", this.formValidate)
            let param = {
              manager: {
                  id: this.formValidate.id,
                  username: this.formValidate.username,
                  realname: this.formValidate.realname,
                  avatar: this.formValidate.avatar
              }
            }
          updateWithMe(param, res => {
            this.$message.success('编辑成功')
            this.handleClose()
            // 清除缓存
            this.findWithMe()
          })
        })
      })
    },
    handleRemove() {
      this.formValidate.avatar = ''
    },
    handleTransportFileList(fileList) {
        console.log("22", fileList)
      if (fileList.length > 0) {
        this.formValidate.avatar = fileList[0].response
          console.log("fileList", fileList)
      } else {
        this.formValidate.avatar = ''
      }
    },
    handleSuccess(fileList) {
        // console.log("resss", res)
        if (fileList.length > 0) {
            this.formValidate.avatar = fileList[0].response
            console.log("fileList", fileList)
        } else {
            this.formValidate.avatar = ''
        }
        console.log("上传", this.formValidate)
    },
    findWithMe() {
      post('/api/manager/getWithMe', {}, res => {
          console.log("132132", res)
        this.isFinished = true
        this.formValidate = res
        this.$store.commit('SAVE_USER', res)
        this.$store.dispatch('SAVE_USER_CACHE', res)
      })
    },
  },
}
</script>

<style scoped>
</style>
