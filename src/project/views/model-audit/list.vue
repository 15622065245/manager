<template>
    <div class="model">
        <el-row class="searchContent">
            <el-col :span="24" class="search-wrapper">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
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
                            prop="user.nickname"
                            align="center"
                            label="所属用户">
                    </el-table-column>
                    <el-table-column
                            prop="user.homepageName"
                            align="center"
                            label="主页名称">
                    </el-table-column>
                    <el-table-column
                            prop="styleList.name"
                            align="center"
                            label="风格">
                    </el-table-column>
                    <el-table-column
                            prop="garmentProductsList.name"
                            align="center"
                            label="衣品">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            align="center"
                            label="模特价格">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
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
                            prop="status"
                            align="center"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作"
                            width="250px">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status === 'pending'" size="small" @click="handlePass(scope.row.id)">通过</el-button>
                            <el-button v-if="scope.row.status === 'pending'" size="small" @click="handleReject(scope.row.id)">拒绝</el-button>
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
        <!-- 审核通过弹框-->
        <el-dialog
                title="提示"
                :visible.sync="passVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin-left: 20px">确定审核通过吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="passVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="passVisible = false">确 定</el-button>
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
    </div>
</template>

<script>
    import Search from '@/framework/components/search'
    import {getList, total} from "../../service/model";
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
                        name: '衣品',
                        key: 'name',
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
                        displayValue: ['待审核', '已通过', '已拒绝'],
                        value: ['pending', 'passed', 'reject']
                    },
                    {
                        name: '提交时间',
                        key: 'creationTime',
                        type: 'datetimerange',
                    }],
                input: "",
                page: 1,
                pageSize: 10,
                passVisible: false,
                rejectVisible: false,
                tableData: [],
                reject: "",
                searchData:[],
                total: 0
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
                        type: "model",
                    },
                    style:{},
                    garmentProducts:{},
                    user:{},
                    creationTime:{},
                    sellTime:{},
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
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
                if (this.searchData.creationTime) {
                    param.creationTime = {
                        start: this.searchData.creationTime[0],
                        end: this.searchData.creationTime[1]
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
                console.log(arr)
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.find()
            },
            handleCurrentChange(page) {
                this.page = page
                this.find()
            },
            handlePass() {
                this.passVisible = true
            },
            handleReject() {
              this.rejectVisible = true
            },
            handleShow(id) {
                console.log(id)
                // this.createVisible = true
                this.$router.push({name: 'modelAuditShow'})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>