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
        <!-- 新增目录弹框-->
        <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose" @onRefreshData="find"></Icreate>
        <!-- 修改目录弹框-->
        <Iedit :dialog-visible="editVisible" :editId="editId" @on-dialog-close="handleClose" @onRefreshData="find"></Iedit>
    </el-row>
</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    import Search from '@/framework/components/search'
    import {getList, count, deleteStyle } from "../../service/works-style";
    import {deleteClothing} from "../../service/works-classify";

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
                roleVisible: false,
                searchData: {},
                total: 0,
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
                    style: {},
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
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    deleteStyle({id: id}, res => {
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