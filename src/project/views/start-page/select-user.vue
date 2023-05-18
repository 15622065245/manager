<template>
    <el-dialog
            title="新建广告"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="50%"
            :before-close="handleClose"
            v-dialogDrag
            :close-on-click-modal="false"
    >
        <el-row class="searchContent">
            <el-col :span="22" class="search-wrapper">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column width="55">
                        <template slot-scope="scope"><el-radio v-model="userId" :label="scope.row.id" @change="handleSelectionChange(scope.row)">{{""}}</el-radio></template>
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
            </el-col>
            <el-col :span="24">
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
            <el-col style="display: flex;justify-content: center">
                <el-button size="small" style="margin-top: 20px;" @click="handleClose">取消</el-button>
                <el-button type="primary" size="small" style="margin-top: 20px;" @click="handleConfirm">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import {count, getUserList, batchEnable} from "../../service/user";
    import Search from '@/framework/components/search'

    export default {
        name: "user",
        props: {
            dialogVisible: {
                type: Boolean,
                defalut: false
            }
        },
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
                userId: ""

            }
        },
        components: {
            Search
        },
        mounted() {
            this.find()
        },
        methods: {
            //选择的数据
            handleSelectionChange(row) {
                this.userId = row.id
                console.log("this.userId", this.userId)
            },
            handleConfirm() {
                if (this.userId) {
                    this.$emit("selectUser", this.userId)
                    this.handleClose()
                }
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
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
                    loginTime: {},
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
            //分页
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.find()
            },
            handleCurrentChange(page) {
                this.page = page
                this.find()
            },
        }
    }
</script>


<style lang="less" scoped>

</style>