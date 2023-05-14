<template>
  <div>
    <div class="upload" v-if="type === 'img'">
      <el-upload
        ref="upload"
        :action="action"
        list-type="picture-card"
        :file-list="defaultList"
        :limit="limit"
        :multiple="multiple"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :http-request="handleHttp"
        :beforeUpload="onBeforeUpload"
        :headers="headers"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog title="查看图片" :visible.sync="dialogVisible" :modal-append-to-body="false">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>

    <div class="upload-file" v-if="type === 'file'">
      <el-upload
        class="upload-demo"
        drag
        :limit="limit"
        :file-list="defaultList"
        :action="action"
        :multiple="multiple"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :beforeUpload="onBeforeUpload"
        :headers="headers"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <el-upload
      v-if="type === 'video'"
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      accept=".apk"
      :limit="limit"
      :on-exceed="handleExceed"
      :beforeUpload="onBeforeUpload"
      :on-success="handleSuccess"
      :http-request="handleHttp"
      :file-list="defaultList"
      :headers="headers"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-upload
      v-if="type === 'audio'"
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :beforeUpload="onBeforeUpload"
      :file-list="defaultList"
      :headers="headers"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'SiUpload',
  props: {
    //组件类型
    type: {
      type: String,
      default: 'img'
    },
    //文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    //限制数量
    limit: {
      type: Number,
      default: 1
    },
    //上传大小,单位为kb
    maxSize: {
      type: Number,
      default: 51200000
    },
    //接收类型
    accept: {
      type: String,
      // default: 'jpg/png/gif/jpeg/mp4/mp3'
    },
    //拼接前缀
    prefix: {
      type: String,
      default: function () {
        return this.$store.state.prefix
      }
    },
    //多选
    multiple: {
      type: Boolean,
      default: false
    },
    //上传接口路径
    action: {
      type: String,
      // default: '/api/uploadFile/uploadFile'
      default: '/api/attachment/upload'
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      defaultList: [],
      part: '',
      imageUrl: '',
      headers: {
        'Access-Token': sessionStorage.console_token
      }
    }
  },
  created() {
    if (this.fileList.length > 0) {
      this.defaultList = this.fileList.map((s, i) => {
        if (s) {
          let obj = {
            name: s,
            url: this.prefix + s,
            response: {
              data: s
            }
          }
          return obj
        }
      })
    }
    // this.$refs.upload.clearFiles();
    this.$on('on-form-submit', () => {
      this.$emit('on-transport-file-list', this.defaultList)
    })
    // 关闭弹框时删除图片预览
    this.$on('on-close', () => {
      this.defaultList = []
    })
  },
  methods: {
    handleRemove(file, fileList) {
      this.defaultList = JSON.parse(JSON.stringify(fileList))
      this.$emit('handleRemove', this.defaultList)
    },
    handlePreview(file) {

    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      // this.defaultList.push(file);
      console.log(res,fileList)
      if (res.code===401){
        this.$notify({
          title: '警告',
          message: 'token失效，请重新登录',
          type: 'warning'
        });
        this.$router.push('/login')
        return false
      }else if (res.code===403){
        this.$notify({
          title: '警告',
          message: `暂无上传接口权限`,
          type: 'warning'
        });
      } else if (res.code===500){
        if (res.message){
          this.$message.warning(res.message)
        }else{
          this.$message.warning('请求出错，上传失败')
        }
      }else{
        this.defaultList = JSON.parse(JSON.stringify(fileList))
        // this.defaultList[0].response.data = this.prefix + this.defaultList[0].response.data
        this.$emit('handleSuccess', this.defaultList)
      }
      // // 深拷贝
      // this.defaultList = JSON.parse(JSON.stringify(fileList))
      // // this.defaultList[0].response.data = this.prefix + this.defaultList[0].response.data
      // this.$emit('handleSuccess', this.defaultList)
    },

    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleExceed(file, fileList) {
      this.$notify({
        title: '警告',
        message: `最多只能上传${this.limit}个文件`,
        type: 'warning'
      })
    },

    onBeforeUpload(file) {
      // 获取后缀名
      const suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      // 判断是否符合文件大小的限制需求
      const isLt2M = file.size / 1024 < this.maxSize
      // 判断是否符合文件类型需求
      // const isLtType = this.accept.indexOf(suffix) >= 0
      // if (!isLtType) {
      //   this.$message({
      //     message: `上传文件格式必须为${this.accept}`,
      //     type: 'warning'
      //   })
      // }
      // if (!isLt2M) {
      //   this.$message({
      //     message: `上传文件大小不能超过${this.maxSize}KB!`,
      //     type: 'warning'
      //   })
      // }
      // return isLt2M && isLtType
      return isLt2M
    },
    handleHttp(param) {
      const formData = new FormData()
      formData.append('part', param.file)
      param.onProgress(param.file)
      this.$post(param.action, formData, res => {
        param.onSuccess(res)
      })
    }
  }
}
</script>

<style scoped>
.upload /deep/ .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.upload /deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 106px;
}
</style>
