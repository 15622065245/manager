<template>
        <el-row>
            <el-col :span="24" style="margin-top: 20px">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
            <el-col :span="24" style="margin: 20px 0">
                <el-button type="primary" size="small" @click="addHandle">新建</el-button>
            </el-col>
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column
                            prop="username"
                            label="账号"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="realname"
                            label="姓名"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            align="center"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="roleList"
                            align="center"
                            label="角色">
                        <template slot-scope="scope">
                            <span>
                                <span v-for="(item, index) in scope.row.roleList">{{item.name}}
                                    <span v-if="index !== scope.row.roleList.length -1">;</span>
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="creationTime"
                            align="center"
                            label="创建时间">
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
                                    @change="enabledChange(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作"
                            width="280">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class="optionButton" @click="editHandle(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" class="optionButton" @click="roleHandle(scope.row.id)">角色设置</el-button>
                            <el-button type="text" style="color: red" size="small" class="optionButton" @click="deleteHandle(scope.row.id)">删除</el-button>
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
            <!-- 新增目录弹框-->
            <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
            <!-- 修改目录弹框-->
            <Iedit :dialog-visible="editVisible" :editData="rowData" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
            <RoleSetting :dialog-visible="roleVisible" :roleId="roleId" @on-dialog-close="handleClose" @onRefreshData="find"></RoleSetting>
        </el-row>

</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import RoleSetting from "./role-setting";
    import Search from '@/framework/components/search'
    import { findByTable, count, deleteAccount, enableAccount } from "../../service/account";
    import { getRoleList} from "../../service/role";


    export default {
        name: "account",
        components:{
            Icreate,
            Iedit,
            RoleSetting,
            Search
        },
        data() {
            // 搜索下拉框callback函数

            const cb = _Func => {
                return new Promise((resolve, reject) => {
                    _Func({role:{
                            accountType:"Manager",
                            enabled:true
                        },
                        pageable:{
                            moduleList: [
                                {id: 1},
                                {id: 2},
                                {id: 3},
                                {id: 4}
                            ],
                            page: 1,
                            size: 20,
                            sort:"id",
                            desc:true
                        }}, res => {
                        let value = [],
                            displayValue = []
                        res.forEach(item => {
                            displayValue.push(item.name)
                            value.push(item.id.toString())
                        })
                        resolve({displayValue, value})
                    })
                })
            }
            return {
                tableData: [],
                searchItems: [{
                    name: '账号',
                    key: 'username',
                    type: 'string'
                },
                {
                    name: '角色',
                    key: 'id',
                    type: 'select',
                    callback: () => cb(getRoleList)
                },
                {
                    name: '状态',
                    key: 'enabled',
                    type: 'select',
                    displayValue: ['禁用', '启用'],
                    value: [false, true]
                },
                {
                    name: '创建时间',
                    key: 'creationTime',
                    type: 'datetimerange',
                }],
                createVisible: false,
                editVisible: false,
                roleVisible: false,
                total: 0,
                searchParams: {},
                page: 1,
                pageSize: 10,
                rowData: {},
                searchData: [],// 搜索
                roleId: 0
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            // 搜索
            searchBySearchItem(val) {
                console.log("val", val)
                this.searchData = val
                this.page = 1
                this.find()
            },
            find() {
                let param = {
                    manager:{
                    },
                    role:{
                    },
                    creationTime:{
                    },
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
                        sort:"id",
                        desc:true
                    }
                }
                if (this.searchData.username) {
                    param.manager.username = this.searchData.username
                }
                if (this.searchData.enabled !== undefined && this.searchData.enabled !== '' && this.searchData.enabled !== -1) {
                    param.manager.enabled = this.searchData.enabled
                }
                if (this.searchData.id) {
                    param.role.id = this.searchData.id
                }
                if (this.searchData.creationTime) {
                    param.creationTime = {
                        start: this.searchData.creationTime[0],
                        end: this.searchData.creationTime[1]
                    }
                }
                findByTable(param, res => {
                    res.forEach(item => {
                        item.id = item.id.toString()
                    })
                    this.tableData = res
                })
                count(param, res => {
                    this.total = res
                })
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.find()
            },
            handleCurrentChange(page) {
                this.page = page
                this.find()
            },
            addHandle() {
                this.createVisible = true
            },
            enabledChange(row) {
                let params = {
                    id: row.id,
                    enabled: !row.enabled
                }
                this.$confirm(`确定${!row.enabled ? '启用' : '禁用'}吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    enableAccount(params, res => {
                        this.$message.success(`${!row.enabled ? '启用' : '禁用'}成功！`)
                        this.find()
                    })
                }).catch(() => {
                })
            },
            editHandle(row) {
                this.rowData = row
                this.editVisible = true
            },
            deleteHandle(id) {
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    deleteAccount({id: id}, res => {
                        if (res === 204) {
                            this.$message.success(`删除成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            roleHandle(id) {
                this.roleId = id
              this.roleVisible = true
            },
            handleClose() {
                this.createVisible = false
                this.editVisible = false
                this.roleVisible = false
            },

        }
    }
</script>

<style lang="less" scoped>

</style>