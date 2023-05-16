<template>
    <el-row class="searchContent">
        <el-col :span="24" class="search-wrapper">
            <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
        </el-col>
        <el-col :span="24">
            <el-button class="btn addButton" size="small" @click="handleBatchDispose">标记已处理</el-button>
            <el-button class="btn addButton" size="small" @click="deleteHandle">删除</el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                    stripe
                    :data="tableData"
                    :header-cell-style="{background:'#f2f2f2'}"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">>
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="user.id"
                        label="用户ID"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="contractPhone"
                        label="手机号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="user.nickname"
                        label="昵称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="留言内容"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="creationTime"
                        align="center"
                        label="留言时间">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="manager.username"
                        label="处理人账号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="processTime"
                        align="center"
                        label="处理时间">
                </el-table-column>
                <el-table-column
                        prop="option"
                        align="center"
                        label="操作"
                        width="280">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showHandle(scope.row.id)">查看</el-button>
                        <el-button v-if="!scope.row.processTime" size="small" @click="handledispose(scope.row.id)">标记已处理</el-button>
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
    import Search from "@/framework/components/search/"
    import {count, findByTable, processFeedback, deleteFeedback} from "../../service/feedback";
    export default {
        name: "customer",
        data() {

            return {
                tableData: [],
                searchItems: [
                    {
                        name: '手机号',
                        key: 'contractPhone',
                        type: 'string'
                    },
                    {
                        name: '反馈时间',
                        key: 'creationTime',
                        type: 'datetimerange',
                    }],
                input: "",
                page: 1,
                pageSize: 10,
                total: 0,
                createVisible: false,
                editVisible: false,
                deleteVisible: false,
                searchData: [],
                selectID: []

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
                console.log("val", val)
                this.searchData = val
                this.page = 1
                this.find()
            },
            find() {
                let param = {
                    feedback:{},
                    creationTime:{},
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
                        sort: "id",
                        desc: true
                    }
                }
                if (this.searchData.contractPhone) {
                    param.feedback.contractPhone = this.searchData.contractPhone
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
                        item.user.id = item.user.id.toString()
                    })
                    this.tableData = res
                })
                count(param, res => {
                    this.total = res
                })
            },
            //单个禁用
            handledispose(id) {
                this.selectID = [id]
                this.handleBatchDispose(1)
            },
            //批量禁用
            handleBatchDispose() {
                let params = {
                    idList: this.selectID,
                }
                this.$confirm(`确定要标记已处理吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    if (this.selectID.length > 0) {
                        processFeedback(params, res => {
                            if (res === 204) {
                                this.$message.success(`标记已处理成功！`)
                                this.find()
                            }
                        })
                    }
                }).catch(() => {
                })
            },
            handleSelectionChange(val) {
                let arr = []
                val.forEach(item => {
                    arr.push(item.id)
                })
                this.selectID = arr
                console.log("this.selectID", this.selectID)
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            showHandle(id) {
                this.$router.push({name: "feedbackShow", params:{id: id}})
            },
            deleteHandle(id) {
                this.selectID = [id]
                this.deleteConfirm()
            },
            deleteConfirm() {
                let params = {
                    idList: this.selectID,
                }
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    if (this.selectID.length > 0) {
                        deleteFeedback(params, res => {
                            if (res === 204) {
                                this.$message.success(`删除成功！`)
                                this.find()
                            }
                        })
                    }
                }).catch(() => {
                })
            },
            disposeHandle() {
                this.$message({
                    showClose: true,
                    message: '标记成功',
                    type: 'success'
                });
            },

            handleClose() {
                this.createVisible = false
                this.editVisible = false
                this.bulkEncryptionDialogVisible = false
                this.roleVisible = false
            },
            handleConfirm() {

            },
        }
    }
</script>

<style lang="less" scoped>

</style>