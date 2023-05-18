<template>
    <el-row>
        <el-col :span="24" style="margin-top: 20px">
            <el-button type="primary" size="small" @click="addHandle">新建</el-button>
        </el-col>
        <el-col :span="24" style="margin: 20px 0">
            <el-table
                    stripe
                    :data="tableData"
                    :header-cell-style="{background:'#f2f2f2'}"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="角色名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="备注"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="option"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editHandle(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="roleHandle(scope.row.id)">权限设置</el-button>
                        <el-button type="text" style="color: red" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
        <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
        <Iedit :dialog-visible="editVisible" :editData="editData" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
    </el-row>
</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import { getRoleList, count, deleteRole } from "../../service/role";

    export default {
        name: "list",
        components:{
            Icreate,
            Iedit,
        },
        data() {
            return {
                tableData: [],
                page: 1,
                pageSize: 10,
                createVisible: false,
                editVisible: false,
                roleVisible: false,
                rolePageForm: {
                },
                total: 0,
                editData: null,
                roleId: null

            }
        },
        created() {
            this.find()
        },
        methods: {
            find() {
                this.rolePageForm = {
                    role:{
                        accountType:"Manager",
                            enabled:true
                    },
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
                        sort:"id",
                        desc:true
                    }
                },
                getRoleList(this.rolePageForm, res => {
                    res.forEach(item => {
                        item.id = item.id.toString()
                    })
                    this.tableData = res
                })
                count(this.rolePageForm, res => {
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
            editHandle(row) {
                this.editVisible = true
                this.editData = row
            },
            deleteHandle(id) {
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    deleteRole({id: id}, res => {
                        if (res === 204) {
                            this.$message.success(`删除成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            roleHandle(id) {
                this.$router.push({name: "roleShow", params:{id: id}})
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