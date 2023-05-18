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
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class="optionButton" @click="editHandle(scope.row.id)">编辑</el-button>
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
            <el-col :span="24">
            </el-col>
            <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
            <Iedit :dialog-visible="editVisible" :editId="editId" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
        </el-row>

</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import Search from '@/framework/components/search'
    import {findByTable, count, deleteSlide,enableSlide} from "../../service/advertising";
    import {deleteReport} from "../../service/report";

    export default {
        name: "list",
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
                roleVisible: false,
                searchData: [],
                editId: ""

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
                    enableSlide(params, res => {
                        this.$message.success(`${!row.enabled ? '启用' : '禁用'}成功！`)
                        this.find()
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
            addHandle() {
                this.createVisible = true

            },
            editHandle(id) {
                console.log(id)
                this.editId = id
                this.editVisible = true
            },
            deleteHandle(id) {
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    deleteSlide({id: id}, res => {
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