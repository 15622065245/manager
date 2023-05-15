<template>
        <el-row class="searchContent">
            <el-col :span="24" style="margin: 30px 0 20px 0">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>            </el-col>
            <el-col :span="24">
                <el-button class="btn addButton" size="small" @click="addHandle">新建</el-button>

            </el-col>
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="广告标题"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="location"
                            label="广告位"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="position"
                            align="center"
                            label="排序数值">
                    </el-table-column>
                    <el-table-column
                            prop="effectiveTime"
                            align="center"
                            label="开始时间">
                    </el-table-column>
                    <el-table-column
                            prop="expirationTime"
                            align="center"
                            label="结束时间">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            align="center"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="enabled"
                            align="center"
                            label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.enabled">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="editHandle">编辑</el-button>
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
            <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
            <Iedit :dialog-visible="editVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
            <el-dialog
                    title="删除"
                    :visible.sync="deleteVisible"
                    width="30%">
                <div style="display: flex;align-items: center">
                    <span style="margin-left: 20px">删除后不可恢复，是否确定删除?</span>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
          </span>
            </el-dialog>
        </el-row>

</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import Search from '@/framework/components/search'
    import {findByTable, count, deleteSlide} from "../../service/advertising";

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
                    name: '广告标题',
                    key: 'title',
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
                        name: '更新时间',
                        key: 'updateTime',
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
                searchData: [],
                deleteId: ""

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
                    slide:{
                        location: "banner"
                    },
                    updateTime:{},
                    pageable:{
                        page:this.page,
                        size:this.pageSize,
                        sort:"id",
                        desc:true
                    }
                }
                if (this.searchData.title) {
                    param.slide.title = this.searchData.title
                }
                if (this.searchData.enabled !== undefined && this.searchData.enabled !== '' && this.searchData.enabled !== -1) {
                    param.slide.enabled = this.searchData.enabled
                }
                if (this.searchData.updateTime) {
                    param.updateTime = {
                        start: this.searchData.updateTime[0],
                        end: this.searchData.updateTime[1]
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
                this.deleteId = id
                this.deleteVisible = true
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
                deleteSlide({id: this.deleteId}, res => {
                    if (res) {
                        this.$message.success("删除成功！")
                        this.deleteVisible = false
                        this.find()
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>