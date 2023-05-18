<template>
    <el-row>
        <el-col :span="22" style="margin-top: 20px">
            <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
        </el-col>
        <el-col :span="24" style="margin: 20px 0">
            <el-button type="primary" size="small" @click="handleBatchEnable(true)">批量启用</el-button>
            <el-button type="primary" size="small" @click="handleBatchEnable(false)">批量禁用</el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                    stripe
                    :data="tableData"
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
                <el-table-column
                        prop="enabled"
                        align="center"
                        label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                :value="scope.row.enabled"
                                active-text="启用"
                                inactive-text="禁用"
                                @change="handleEnable(scope.row.enabled, scope.row.id)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="option"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleShow(scope.row.id)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
            <div class="pager-group" style="float: left">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {count, getUserList, batchEnable} from "../../service/user";
    import Search from '@/framework/components/search'

    export default {
        name: "user",
        data() {
            return {
                tableData: [],
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
                selectID: [],
                searchData: [],// 搜索

            }
        },
        components: {
            Search
        },
        mounted() {
            this.find()
        },
        methods: {
            // 搜索
            searchBySearchItem(val) {
                this.searchData = val
                this.page = 1
                this.find()
            },
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
                })
                count(param, res => {
                    this.total = res
                })
            },
            //多选
            handleSelectionChange(val) {
                let arr = []
                val.forEach(item => {
                    arr.push(item.id.toString())
                })
                this.selectID = arr
            },
            //单个禁用
            handleEnable(enable, id) {
                this.selectID = [id]
                this.handleBatchEnable(!enable, 1)
            },
            //批量禁用
            handleBatchEnable(enable, one) {
                let params = {
                    idList: this.selectID,
                    enabled: enable
                }
                this.$confirm(`确定${enable ? '启用' : '禁用'}吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    if (this.selectID.length > 0) {
                        batchEnable(params, res => {
                            if (res === 204) {
                                this.$message.success(`${one? '': '批量'}${enable ? '启用' : '禁用'}成功！`)
                                this.find()
                            }
                        })
                    }
                }).catch(() => {
                })

            },
            //分页
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.find()
            },
            handleCurrentChange(page) {
                this.page = page
                this.find()
            },
            handleShow(id) {
                this.$router.push({name: 'userShow', params: {id: id}})
            },
        }
    }
</script>

<style lang="less" scoped>
</style>