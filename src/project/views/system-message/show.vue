<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>APP推送</span>
            </div>
            <div style="margin: 5px 50px 0 50px;">
                <div style="line-height: 30px">
                    <span style="display: flex;justify-content: center;margin-bottom: 20px">{{notificationPacket.title}}</span>
                    <p v-html="notificationPacket.content"></p>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>推送用户</span>
            </div>
            <div style="margin: 5px 0 0 50px;">
                <div>
                    <span class="labelText" style="margin-right: 10px">手机号</span>
                    <el-input placeholder="请输入" clearable v-model="phoneValue" style="margin-right: 20px"></el-input>
                    <el-button class="find btn" size="small" @click="find">查询</el-button>
                </div>
                <div style="margin-top: 30px">
                    <el-button type="primary" size="small" @click="addHandle">添加推送用户</el-button>
                    <el-button class="btn addButton" size="small" @click="handleBatchCanceled">取消</el-button>
                </div>
                <div style="margin-top: 30px">
                    <el-table
                            stripe
                            :data="tableData"
                            :header-cell-style="{background:'#f2f2f2'}"
                            style="width: 70%"
                            @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column
                                prop="user.nickname"
                                label="昵称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="user.phone"
                                label="手机号"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="sendTime"
                                align="center"
                                label="推送时间">
                        </el-table-column>
                        <el-table-column
                                prop="option"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" class="optionButton" @click="cancelHandle(scope.row.id)">取消
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
                    <div>
                        <el-button @click="goBack" size="small" style="float: right;margin: 40px 0">返回上一页</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {findNotification, count, batchCancel,} from "../../service/notification";
    import { getMessage } from "../../service/system-message";

    export default {
        name: "show",
        data() {
            return {
                tableData: [],
                phoneValue: "",
                idList: [],
                page: 1,
                pageSize: 10,
                total: 0,
                notificationPacket: {}
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            handleSelectionChange(row) {
                let list = []
                row.forEach(item => {
                    list.push(item.id)
                })
                this.idList = list
            },
            find() {
                let param = {
                    notificationPacketId: this.$route.params.id,
                    phone: this.phoneValue,
                    pageable: {
                        page: this.page,
                        size: this.pageSize,
                        sort: "id",
                        desc: true
                    }
                }
                findNotification(param, res => {
                    this.tableData = res
                })
                count(param, res => {
                    this.total = res
                })
                getMessage({id: this.$route.params.id}, res => {
                    this.notificationPacket = res
                })
            },
            goBack() {
                this.$router.back()
            },
            addHandle() {
                this.$router.push({name: "systemMessageAdd", params:{id: this.$route.params.id}})
            },
            //批量取消
            handleBatchCanceled() {
                this.$confirm('确定取消推送当前用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    if (this.idList.length > 0) {
                        batchCancel({idList: this.idList}, res => {
                            this.$message.success('取消成功')
                            this.find()
                        })
                    } else {
                        this.$message.warning("请勾选数据再取消")
                    }
                }).catch(() => {
                })
            },
            cancelHandle(id) {
                let params = {
                    idList: [id],
                }
                this.$confirm(`确定要取消当前用户吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    batchCancel(params, res => {
                        if (res === 204) {
                            this.$message.success(`取消推送成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
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
        }
    }
</script>

<style lang="less" scoped>
    .box-describe {
        margin-bottom: 50px;
    }

    /deep/ .el-descriptions-item__container {
        display: -webkit-box;
        height: 40px;
        font-size: 14px;
    }
</style>