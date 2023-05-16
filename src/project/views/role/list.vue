<template>
    <el-row>
        <el-col :span="24">
            <el-button size="small" @click="addHandle">新建</el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                    stripe
                    :data="tableData"
                    :header-cell-style="{background:'#f2f2f2'}"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="角色名称"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="备注"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        width="250"
                        prop="option"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="editHandle(scope.row)">编辑</el-button>
                        <el-button size="small" @click="roleHandle(scope.row.id)">权限设置</el-button>
                        <el-button size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                    </template>
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
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-col>
        <!-- 新增目录弹框-->
        <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
        <!-- 修改目录弹框-->
        <Iedit :dialog-visible="editVisible" :editData="editData" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
        <PermissionSetting :dialog-visible="roleVisible" :roleId="roleId" @on-dialog-close="handleClose"></PermissionSetting>
        <!-- 删除弹框-->
        <el-dialog
                title="删除"
                :visible.sync="deleteVisible"
                :modal-append-to-body="false"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin-left: 20px">删除后不可恢复，是否确定删除?</span>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="deleteConfirm">确 定</el-button>

      </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import PermissionSetting from "./permission-setting";
    import { getRoleList, count, deleteRole } from "../../service/role";
    import {deleteAccount} from "../../service/account";

    export default {
        name: "list",
        components:{
            Icreate,
            Iedit,
            PermissionSetting
        },
        data() {
            return {
                tableData: [],
                page: 1,
                pageSize: 10,
                createVisible: false,
                editVisible: false,
                deleteVisible: false,
                roleVisible: false,
                rolePageForm: {
                },
                total: 0,
                editData: null,
                deleteId: 0,
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
                console.log(id)
                this.deleteId = id
                this.deleteVisible = true
            },
            deleteConfirm() {
                deleteRole({id: this.deleteId}, res => {
                    if (res === 204) {
                        this.$message.success("删除成功")
                        this.deleteVisible = false
                        this.find()
                    }
                })
            },
            roleHandle(id) {
              //   this.roleId = id
              // this.roleVisible = true
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