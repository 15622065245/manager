<template>
    <el-dialog
            title="新建广告"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="50%"
            :before-close="handleClose"
            v-dialogDrag
            :close-on-click-modal="false"
    >
        <el-row>
            <el-col :span="24">
                <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
            </el-col>
            <el-col :span="24" style="margin: 25px 0">
                <el-table
                        stripe
                        :data="tableData"
                        :header-cell-style="{background:'#f2f2f2'}"
                        style="width: 100%">
                    <el-table-column width="55">
                        <template slot-scope="scope"><el-radio v-model="workId" :label="scope.row.id" @change="handleSelectionChange(scope.row)">{{""}}</el-radio></template>
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
                            prop="user.name"
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
                </el-table>
            </el-col>
            <el-col :span="24">
                <div style="float: left">
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
            <el-col style="display: flex;justify-content: center">
                <el-button size="small" style="margin-top: 20px;" @click="handleClose">取消</el-button>
                <el-button type="primary" size="small" style="margin-top: 20px;" @click="handleConfirm">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import Search from '@/framework/components/search'
    import { getList, total, sellWorks } from "../../service/model";
    export default {
        name: "select-works",
        components:{
            Search
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            }
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
                        name: '主页名称',
                        key: 'homepageName',
                        type: 'string'
                    },
                    {
                        name: '所属用户',
                        key: 'username',
                        type: 'string'
                    },],
                page: 1,
                pageSize: 10,
                form: {},
                deleteVisible: false,
                tableData: [],
                searchData: {},
                total: 0,
                selectID: [],
                workId: ""
            }
        },
        mounted() {
            this.find()
        },
        methods: {
            //选择的数据
            handleSelectionChange(row) {
                this.workId = row.id
                console.log("this.workId", this.workId)
                // this.agent = {
                //     id: row.id,
                //     username: row.username
                // }
            },
            handleConfirm() {
                if (this.workId) {
                    this.$emit("selectWork", this.workId)
                    this.handleClose()
                }
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
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
                        status: "passed"
                    },
                    style:{},
                    garmentProducts:{},
                    user:{},
                    creationTime:{},
                    sellTime:{},
                    pageable:{
                        page: this.page,
                        size: this.pageSize,
                        sort: "id",
                        desc: true
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
            //分页
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

</style>