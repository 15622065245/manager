<template>
    <div class="model">
        <el-row class="searchContent">
            <el-col :span="24" class="search-wrapper">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button @click="handleBatchSellable(true)"  size="small">批量上架</el-button>
                <el-button @click="handleBatchSellable(false)" size="small">批量下架</el-button>
            </el-col>
        </el-row>
        <el-row style="margin: 10px 40px 0 0">
            <el-col :span="24">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="作品标题"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="user"
                            align="center"
                            label="所属用户">
                    </el-table-column>
                    <el-table-column
                            prop="homeName"
                            align="center"
                            label="主页名称">
                    </el-table-column>
                    <el-table-column
                            prop="style"
                            align="center"
                            label="风格">
                    </el-table-column>
                    <el-table-column
                            prop="photoPrice"
                            align="center"
                            label="模特价格">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            align="center"
                            label="全包价格">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            align="center"
                            label="上架/下架时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="sellable"
                            align="center"
                            label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    :value="scope.row.sellable"
                                    active-text="上架"
                                    inactive-text="下架"
                                    @change="handleSellable(scope.row.sellable, scope.row.id)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作"
                            width="200px">
                        <template slot-scope="scope">
                            <el-button v-if="!scope.row.sellable" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                            <el-button size="small" @click="handleShow(scope.row.id)">查看</el-button>
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
        <!-- 删除弹框-->
        <el-dialog
                title="提示"
                :visible.sync="deleteVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin-left: 20px">是否确定删除该作品?</span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteVisible = false">否</el-button>
            <el-button size="small" type="primary" @click="deleteVisible = false">是</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import Search from '@/framework/components/search'
    import { getList, total, sellWorks } from "../../service/model";
    export default {
        name: "user",
        components:{
            Search
        },
        data() {
            return {
                searchItems: [
                    {
                        name: '作品标题',
                        key: 'title',
                        type: 'string'
                    },
                    {
                        name: '风格',
                        key: 'styleName',
                        type: 'string'
                    },
                    {
                        name: '主页名称',
                        key: 'homepageName',
                        type: 'string'
                    },
                    {
                        name: '所属用户',
                        key: 'username',
                        type: 'string'
                    },
                    {
                        name: '状态',
                        key: 'sellable',
                        type: 'select',
                        displayValue: ['上架', '下架'],
                        value: [true, false]
                    },
                    {
                        name: '上架时间',
                        key: 'sellTime',
                        type: 'datetimerange',
                    }],
                page: 1,
                pageSize: 10,
                form: {},
                deleteVisible: false,
                tableData: [],
                searchData: {},
                total: 0,
                selectID: []
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
                    works:{
                        type: "place",
                        status: "passed"
                    },
                    style:{},
                    garmentProducts:{},
                    user:{},
                    creationTime:{},
                    sellTime:{},
                    pageable:{
                        page:1,
                        size:20,
                        sort:"id",
                        desc:true
                    }
                }
                if (this.searchData.title) {
                    param.works.title = this.searchData.title
                }
                if (this.searchData.sellable !== undefined && this.searchData.sellable !== '' && this.searchData.sellable !== -1) {
                    param.works.sellable = this.searchData.sellable
                }
                if (this.searchData.type) {
                    param.works.type = this.garmentProducts.type
                }
                if (this.searchData.styleName) {
                    param.style.name = this.searchData.styleName
                }
                if (this.searchData.name) {
                    param.garmentProducts.name = this.searchData.name
                }

                if (this.searchData.homepageName) {
                    param.user.homepageName = this.searchData.homepageName
                }
                if (this.searchData.sellTime) {
                    param.sellTime = {
                        start: this.searchData.sellTime[0],
                        end: this.searchData.sellTime[1]
                    }
                }
                console.log(param)
                getList(param, res => {
                    res.forEach(item => {
                        item.id = item.id.toString()
                    })
                    this.tableData = res
                    console.log("table", this.tableData)
                })
                total(param, res => {
                    this.total = res
                })
            },
            handleSelectionChange(val) {
                let arr = []
                val.forEach(item => {
                    arr.push(item.id)
                })
                this.selectID = arr
            },
            //单个禁用
            handleSellable(sellable, id) {
                this.selectID = [id]
                this.handleBatchSellable(!sellable, 1)
            },
            //批量禁用
            handleBatchSellable(sellable, one) {
                let params = {
                    idList: this.selectID,
                    sellable: sellable
                }
                this.$confirm(`确定${sellable ? '启用' : '禁用'}吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    if (this.selectID.length > 0) {
                        sellWorks(params, res => {
                            if (res === 204) {
                                this.$message.success(`${one? '': '批量'}${sellable ? '启用' : '禁用'}成功！`)
                                this.find()
                            }
                        })
                    }
                }).catch(() => {
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
            handleDelete() {
                this.deleteVisible = true
            },
            handleShow(id) {
                console.log(id)
                this.$router.push({name: 'placeShow'})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>