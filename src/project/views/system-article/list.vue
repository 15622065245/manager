<template>
        <el-row class="searchContent">
            <el-col :span="24">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
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
                            prop="title"
                            label="文章名称"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="location"
                            align="center"
                            label="文章位置">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            align="center"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="editHandle(scope.row.id)">编辑</el-button>
                            <el-button size="small" class="optionButton" @click="showHandle(scope.row.id)">查看</el-button>
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
            <el-button size="small" type="primary" @click="deleteVisible = false">确 定</el-button>
          </span>
            </el-dialog>
        </el-row>

</template>

<script>
    import Iedit from "./edit";
    import Search from '@/framework/components/search'
    import { getList, count } from "../../service/system-article";


    export default {
        name: "sensitive-title",
        components:{
            Iedit,
            Search
        },
        data() {
            return {
                tableData: [],
                searchItems: [
                    {
                    name: '文章名称',
                    key: 'title',
                    type: 'string'
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
                editId: null

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
                    page:{
                        type: "system"
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
                    param.page.title = this.searchData.title
                }
                if (this.searchData.updateTime) {
                    param.updateTime = {
                        start: this.searchData.updateTime[0],
                        end: this.searchData.updateTime[1]
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
            showHandle(id) {
                this.$router.push({name: 'systemArticleShow', params: { id: id}})
            },
            editHandle(id) {
                console.log(id)
                this.editId = id
                this.editVisible = true
            },
            handleClose() {
                this.editVisible = false
                this.roleVisible = false
            },
            handleConfirm() {

            }
        }
    }
</script>

<style lang="less" scoped>

</style>