<template>
  <div class="page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>添加推送用户</span>
      </div>
      <el-row>
        <el-col :span="24" style="margin: 15px;">
          <span>推送时间：</span>
          <el-radio v-model="radio" label="1">立即推送</el-radio>
          <el-radio v-model="radio" label="2">指定时间</el-radio>
          <el-date-picker
            v-model="formValidate.sendTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            v-if="radio == 2"
          ></el-date-picker>
        </el-col>
        <el-col :span="24" style="margin-left: 15px;margin-top: 10px;">
          <span>推送用户范围：</span>
          <el-radio v-model="formValidate.scope" label="all">全部用户</el-radio>
          <el-radio v-model="formValidate.scope" label="many">指定用户</el-radio>
          <el-button v-if="formValidate.scope==='many'" type="primary" size="small" @click="handleEditUser">编辑</el-button>
        </el-col>
        <el-col :span="20" style="margin-left: 100px;margin-top: 30px;" v-if="userData.length>0">
          <el-button @click="handleBatchRemove">移除</el-button>
          <el-table
            :data="data"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleRemove(scope.row.id)" style="color: red;">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40, 100]"
              :page-size="pageSize"
              layout="total, sizes, jumper, prev, next"
              :total="total"
            ></el-pagination>
          </div>
        </el-col>
        <el-col :span="20" style="margin-left: 100px;margin-top: 30px;">
          <el-button size="small" @click="handleClose">取 消</el-button>
          <el-button type="primary" size="small" @click="handleConfirm">确 定</el-button>
        </el-col>
      </el-row>
      <!--    编辑-->
      <edit :dialog-visible="editVisible"
                 :edit-list="userData"
                 @on-dialog-close-user="handleCloseEditUser"
                 @onRefreshData="getSelection($event)"/>
    </el-card>
  </div>
</template>

<script>
import {batchSave} from "../../service/notification";
import edit from "./edit"

export default {
  props: {
    userVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {edit},
  data() {
    return {
      model: 'user',
      pageSize: 10,
      page: 1,
      total: 0,
      extraParam: {},
      editVisible: false,
      data: [],
      radio: '1',
      formValidate: {
        scope: 'all',
        sendTime: '',
      },
      selection: [],
      userData: [], // 推送回来的初始数组
    }
  },
  methods: {
    // 编辑
    handleEditUser() {
      this.editVisible = true
    },
    handleCloseEditUser() {
      this.editVisible = false
    },
    // 获取选择用户的信息
    getSelection(list) {
      console.log("list", list)
      this.userData = list
      this.data = list.slice(0, this.pageSize)
      this.total = list.length
    },
    getFormatDate() {
      let date = new Date()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      let currentDate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + minutes + ':' + seconds
      return currentDate
    },
    handleClose() {
      this.$emit('on-dialog-close')
      this.$router.back()
    },
    handleConfirm() {
      let idList = []
      if (this.formValidate.scope === 'many') {
        idList = this.userData.map((s) => {
          return s.id
        })
      } else {
        idList = null
      }
      if (this.radio == 1) {
        // 如果是立即推送，则传当前时间
        this.formValidate.sendTime = this.getFormatDate()
      }
      if (this.formValidate.sendTime === '') {
        this.$message.info('请选择指定时间')
        return false;
      }
      let params = {
        notificationPacketId: this.$route.params.id,
        sendTime: this.formValidate.sendTime,
        userIdList: idList,
      }
      if(this.formValidate.scope === 'many' && idList.length === 0) {
        this.$message.warning('请先选择推送的用户')
        return false
      }
      batchSave(params, res => {
        this.$message.success('添加成功')
        this.handleClose()
        this.radio = '1'
        this.formValidate.sendTime = ''
        this.formValidate.scope = 'all'
        this.data = []
        this.userData = []
        this.total = 0
        this.$root.$emit(`on-notification-refresh`)
        this.$router.push({name: 'miniprogramShow', id: this.$route.params.id})
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.data = this.userData.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      )
      if (this.data.length === 0) {
        this.page = --this.page
        this.data = this.userData.slice(
          this.pageSize * (this.page - 1),
          this.pageSize * this.page
        )
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.data = this.userData.slice(
        pageSize * (this.page - 1),
        pageSize * this.page
      );
    },
    handleSelectionChange(selection) {
      this.selection = selection
    },
    handleRemove(id) {
      this.data = this.data.filter(item => item.id !== id);
      this.userData = this.userData.filter(item => item.id !== id);
      this.total = --this.total
      this.handleCurrentChange(this.page)
      this.$message.success('移除成功')
    },
    handleBatchRemove() {
      this.$confirm('确定移除选中内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(() => {
        this.selection.forEach(item => {
          this.data = this.data.filter(v => v.id !== item.id);
          this.userData = this.userData.filter(v => v.id !== item.id);
        })
        this.total -= this.selection.length
        this.handleCurrentChange(this.page)
        this.$message.success('移除成功')
      }).catch(() => {
      })
    }
  },
}
</script>

<style lang="less" scoped>
.pager-group {
  margin-top: 20px;
}
</style>
