<template>
    <el-row>
        <el-col :span="22" style="margin-top: 20px">
            <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
        </el-col>
        <el-col :span="24" style="margin: 20px 0">
            <el-table
                    stripe
                    :data="tableData"
                    :header-cell-style="{background:'#f2f2f2'}"
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
                        prop="user.phone"
                        label="手机号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="user.nickname"
                        align="center"
                        label="用户昵称">
                </el-table-column>
                <el-table-column
                        prop="identity"
                        align="center"
                        label="申请身份">
                </el-table-column>
                <el-table-column
                        prop="homeName"
                        align="center"
                        label="主页名称">
                </el-table-column>
                <el-table-column
                        prop="iDCard"
                        align="center"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="applicationTime"
                        align="center"
                        label="申请认证时间">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="option"
                        align="center"
                        width="240"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === 'pending'" size="small" class="optionButton" @click="handleAudit(scope.row.id)">通过</el-button>
                        <el-button v-if="scope.row.status === 'pending'" size="small" class="optionButton" @click="handleReject(scope.row.id)">拒绝</el-button>
                        <el-button type="text" size="small" class="optionButton" @click="handleShow(scope.row.id)">查看</el-button>
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
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-col>
        <!-- 审核通过弹框-->
        <el-dialog
                title="通过"
                :visible.sync="auditVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin-left: 20px">确定审核通过吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="auditVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="auditVisible = false">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 审核拒绝弹框-->
        <el-dialog
                title="提示"
                :visible.sync="rejectVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin: 0 20px">请输入拒绝理由:</span>
                <el-input v-model="reject" placeholder="拒绝理由"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rejectVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="rejectVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import Search from '@/framework/components/search'
    import {passIdentification, getIdentificationList, count} from "../../service/identity";
    import {pass} from "../../service/model";

    export default {
        name: "user",
        components:{
            Search
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
                        key: 'type',
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
                        key: 'status',
                        type: 'select',
                        displayValue: ['待认证', '已通过', '已拒绝'],
                        value: ['pending', 'passed', 'rejected']
                    },
                    {
                        name: '申请认证时间',
                        key: 'applicationTime',
                        type: 'datetimerange',
                    }],
                input: "",
                page: 1,
                pageSize: 10,
                auditVisible: false,
                rejectVisible: false,
                reject: "",
                searchData: [],
                total: 0,
                rejectId: ""
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
            //获取数据
            find() {
                let param = {
                    user: {},
                    identification:{},
                    applicationTime:{},
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
                if (this.searchData.phone) {
                    param.user.phone = this.searchData.phone
                }
                if (this.searchData.type) {
                    param.identification.type = this.searchData.type
                }
                if (this.searchData.status) {
                    param.identification.status = this.searchData.status
                }
                if (this.searchData.applicationTime) {
                    param.applicationTime = {
                        start: this.searchData.applicationTime[0],
                        end: this.searchData.applicationTime[1]
                    }
                }
                getIdentificationList(param, res => {
                    res.forEach(item => {
                        item.id = item.id.toString()
                    })
                    this.tableData = res
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
            handleAudit(id) {
                this.$confirm(`确定要审核通过吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    passIdentification({id: id, passed: true}, res => {
                        if (res === 204) {
                            this.$message.success(`审核通过成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            handleReject(id) {
                this.rejectId = id
                this.rejectVisible = true
            },
            confirmReject() {
                let param = {
                    id: this.rejectId,
                    passed: false,
                    reason: this.reject
                }
                pass(param, res => {
                    if (res === 204) {
                        this.$message.success(`审核拒绝成功！`)
                        this.rejectVisible = false
                        this.find()
                    }
                })
            },
            handleShow(id) {
                this.$router.push({name: 'identityShow', params: {id: id}})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>