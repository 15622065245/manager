<template>
    <div class="work-style">
        <el-row class="searchContent">
            <el-col :span="24" class="search-wrapper">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button class="btn addButton" size="small" @click="addHandle">新建</el-button>
            </el-col>
        </el-row>
        <el-row style="margin: 10px 40px 0 0">
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="风格名称"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="creationTime"
                            align="center"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="editHandle(scope.row.id)">编辑</el-button>
                            <el-button size="small" class="optionButton" @click="deleteHandle(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="page">
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
        </el-row>
        <!-- 新增目录弹框-->
        <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
        <!-- 修改目录弹框-->
        <Iedit :dialog-visible="editVisible" :editId="editId" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
        <!-- 删除弹框-->
        <el-dialog
                title="删除"
                :visible.sync="deleteVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin-left: 20px">删除后不可恢复，是否确定删除?</span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="deleteConfirm">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import Search from '@/framework/components/search'
    import {getList, count, deleteClothing } from "../../service/works-clothing";

    export default {
        name: "sensitive-title",
        components:{
            Icreate,
            Iedit,
            Search
        },
        data() {
            return {
                tableData: [],
                searchItems: [
                    {
                        name: '分类',
                        key: 'name',
                        type: 'string'
                    },
                    {
                        name: '创建时间',
                        key: 'creationTime',
                        type: 'datetimerange',
                    }],
                input: "",
                page: 1,
                pageSize: 10,
                createVisible: false,
                editVisible: false,
                deleteVisible: false,
                roleVisible: false,
                searchData: {},
                total: 0,
                deleteId: 0,
                editId: ""

            }
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
                    garmentProducts: {},
                    pageable: {
                        page: this.page,
                        size: this.pageSize,
                        sort: "id",
                        desc: true
                    }
                }
                if (this.searchData.name) {
                    param.style.name = this.searchData.name
                }
                if (this.searchData.creationTime) {
                    param.creationTime = {
                        start: this.searchData.creationTime[0],
                        end: this.searchData.creationTime[1]
                    }
                }
                getList(param, res => {
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
            editHandle(id) {
                console.log(id)
                this.editId = id
                this.editVisible = true
            },
            deleteHandle(id) {
                console.log(id)
                this.deleteId = id
                this.deleteVisible = true
            },
            deleteConfirm() {
                deleteClothing({id: this.deleteId}, res => {
                    if (res === 204) {
                        this.$message.success("删除成功")
                        this.deleteVisible = false
                        this.find()
                    }
                })
            },
            roleHandle() {
                this.roleVisible = true
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