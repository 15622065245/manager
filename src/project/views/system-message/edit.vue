<template>
  <el-dialog
    title="指定用户"
    append-to-body
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    width="60%"
    :before-close="handleClose"
    v-dialogDrag
    :close-on-click-modal="false">
    <el-col :span="24">
      <search
        style="width: 95%;margin: 10px auto"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <el-table
            stripe
            :data="tableData"
            @row-key="getRowKey"
            :header-cell-style="{background:'#f2f2f2'}"
            @selection-change="handleSelectionChange"
            style="width: 100%">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column
              prop="id"
              label="ID"
              align="center">
      </el-table-column>
      <el-table-column
              prop="phone"
              label="手机号"
              align="center">
      </el-table-column>
      <el-table-column
              prop="nickname"
              align="center"
              label="用户昵称">
      </el-table-column>
      <el-table-column
              prop="identity"
              align="center"
              label="身份">
      </el-table-column>
      <el-table-column
              prop="datetime"
              align="center"
              label="主页名称">
      </el-table-column>
      <el-table-column
              prop="creationTime"
              align="center"
              label="注册时间">
      </el-table-column>
      <el-table-column
              prop="name"
              align="center"
              label="最近登录时间">
      </el-table-column>
    </el-table>
    <div class="pager-group">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[ 10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, jumper, prev, next"
        :total="total"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Search from '@/framework/components/search'
import {count, getUserList} from "../../service/user";

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    editId: {
      type: [String, Number],
      default: 0
    },
    editList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    Search
  },

  data() {
    return {
      tableData: [],
      model: 'user',
      extraParam: {},
      searchVal: {},  //条件搜索
      searchItems: [
        {
          name: '用户昵称',
          key: 'nickname',
          type: 'string'
        },
        {
          name: '身份',
          key: 'identity',
          type: 'select',
          displayValue: ['未认证', '摄影师', '模特', '场地'],
          value: ['pending', 'photographer', 'model', 'place']
        },
        {
          name: '手机号',
          key: 'phone',
          type: 'string'
        },
        {
          name: '状态',
          key: 'enabled',
          type: 'select',
          displayValue: ['禁用', '启用'],
          value: [false, true]
        },
        {
          name: '登录时间',
          key: 'loginTime',
          type: 'datetimerange',
        }],
      page: 1,
      pageSize: 10,
      total: 0,
      searchData: []
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        // this.search(1, {})
        this.find()
      }
    }
  },
  methods: {
    //多选
    handleSelectionChange(val) {
      this.selectList = val
    },
    handleClose() {
      this.page = 1
      this.pageSize = 10
      this.$emit('on-dialog-close-user')
    },
    //条件搜索
    searchBySearchItem(item) {
      if (item.post && !item.post.id) {
        item.post = {id: item.post}
      }
      if (item.userGroup && !item.userGroup.id) {
        item.userGroup = {id: item.userGroup}
      }
      this.searchVal = item
      this.find()
    },
    //修改分页条目数
    handleSizeChange(val) {
      this.pageSize = val
      this.find()
    },
    //修改当前页
    handleCurrentChange(val) {
      this.page = val
      this.find()
    },
    //获取用户
    //获取数据
    find() {
      let param = {
        user: {},
        loginTime:{
        },
        pageable: {
          page: this.page,
          size: this.pageSize,
          sort: "id",
          desc: true
        }
      }
      if (this.searchData.nickname) {
        param.user.nickname = this.searchData.nickname
      }
      if (this.searchData.identity) {
        param.user.identity = this.searchData.identity
      }
      if (this.searchData.enabled !== undefined && this.searchData.enabled !== '' && this.searchData.enabled !== -1) {
        param.user.enabled = this.searchData.enabled
      }
      if (this.searchData.phone) {
        param.user.phone = this.searchData.phone
      }
      if (this.searchData.loginTime) {
        param.loginTime = {
          start: this.searchData.loginTime[0],
          end: this.searchData.loginTime[1]
        }
      }
      getUserList(param, res => {
        res.forEach(item => {
          item.id = item.id.toString()
        })
        this.tableData = res
        console.log("table", this.tableData)
      })
      count(param, res => {
        this.total = res
      })
    },
    // row-key唯一标识
    getRowKey(row) {
      return Number(row.id)
    },
    handleConfirm(name) {
      this.handleClose()
      this.$emit('onRefreshData', this.selectList)
    }
  }
}
</script>

<style scoped lang="less">
.pager-group {
  margin-top: 20px;
}
</style>
