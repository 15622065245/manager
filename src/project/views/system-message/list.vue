<template>
    <div class="account">
        <el-row class="searchContent">
            <el-col :span="24" style="margin: 30px 0 20px 0">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
            <el-col :span="24">
                <el-button class="btn addButton" size="small" @click="createHandle">新建</el-button>
            </el-col>
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="消息ID"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="消息标题"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="userList"
                            label="推送对象"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="creationTime"
                            align="center"
                            label="推送时间">
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="showHandle(scope.row.userList)">查看</el-button>
                            <el-button size="small" class="optionButton" @click="deleteHandle(scope.row.id)">删除</el-button>
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
            <el-button size="small" type="primary" @click="deleteVisible = false">确 定</el-button>
          </span>
            </el-dialog>
        </el-row>

    </div>
</template>

<script>
    import Search from '@/framework/components/search'
    import {findByTable, count, deleteMessage} from "../../service/system-message";

    export default {
        name: "sensitive-title",
        components: {
            Search
        },
        data() {

            return {
                tableData: [],
                searchItems: [
                    {
                        name: '消息标题',
                        key: 'title',
                        type: 'string'
                    },
                    {
                        name: '推送时间',
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
                roleVisible: false,
                searchData: []
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            searchBySearchItem(val) {
                console.log("val", val)
                this.searchData = val
                this.page = 1
                this.find()
            },
            find() {
                let param = {
                    notificationPacket:{},
                    creationTime:{},
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
                        sort: "id",
                        desc: true
                    }
                }
                if (this.searchData.title) {
                    param.notificationPacket.title = this.searchData.title
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
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            addHandle() {
                this.createVisible = true

            },
            editHandle() {
                this.editVisible = true

            },
            deleteHandle(id) {
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    deleteMessage({id: id}, res => {
                        if (res === 204) {
                            this.$message.success(`删除成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            roleHandle() {
              this.roleVisible = true
            },
            createHandle() {
                this.$router.push({name: 'systemMessageCreate'})
            },
            showHandle(data) {
                console.log("data", data)
                this.$router.push({name: 'systemMessageShow', params: {userList: data}})
            },
            handleClose() {
                this.createVisible = false
                this.editVisible = false
                this.roleVisible = false
            },
            handleConfirm() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .labelManage {

        .addButton {
            margin-top: 20px;
        }

    }
    /deep/ .el-dialog {
        border-radius: 10px;

        .el-dialog__header {
            font-weight: 600;
            border-bottom: 1px solid #e4e4e4;
        }
        .el-form-item {
            margin-top: 15px;
        }
        .el-form-item:first-child {
            margin-top: 0px;
        }
        .el-dialog__footer {
            margin-top: 40px;
        }
    }
    /deep/ .optionButton {
        border: none;
    }

</style>