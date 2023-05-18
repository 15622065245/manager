<template>
    <el-row>
        <el-col :span="24" style="margin-top: 20px">
            <search :search-items="searchItems" @on-search="searchBySearchItem"></search>
        </el-col>
        <el-col :span="24" style="margin: 20px 0">
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
                        prop="styleList"
                        align="center"
                        label="风格">
                    <template slot-scope="scope">
                        <span v-for="(item, index) in scope.row.styleList">
                            {{item.name}}
                            <span v-if="index !== scope.row.styleList.length - 1">、</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="garmentProductsList"
                        align="center"
                        label="衣品">
                    <template slot-scope="scope">
                        <span v-for="(item, index) in scope.row.garmentProductsList">
                            {{item.name}}
                            <span v-if="index !== scope.row.garmentProductsList.length - 1">、</span>
                        </span>
                    </template>
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
                        <el-button type="text" v-if="scope.row.status === 'pending'" size="small" @click="handlePass(scope.row.id)">通过</el-button>
                        <el-button type="text" style="color: red" v-if="scope.row.status === 'pending'" size="small" @click="handleReject(scope.row.id)">拒绝</el-button>
                        <el-button type="text" size="small" @click="handleShow(scope.row.id)">查看</el-button>
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
        <!-- 审核拒绝弹框-->
        <el-dialog
                title="提示"
                :modal-append-to-body="false"
                :before-close="handleClose"
                :visible.sync="rejectVisible"
                width="30%">
            <div style="display: flex;align-items: center">
                <span style="margin: 0 20px">请输入拒绝理由:</span>
                <el-input v-model="reject" placeholder="拒绝理由"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rejectVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmReject">确 定</el-button>
      </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import Search from '@/framework/components/search'
    import {getList, total, pass} from "../../service/model";
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
                rejectVisible: false,
                tableData: [],
                reject: "",
                rejectId: "",
                searchData:[],
                total: 0,
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
                        type: "photographer",
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
            handlePass(id) {
                // this.passVisible = true
                this.$confirm(`确定要删除吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    pass({id: id, passed: true}, res => {
                        if (res === 204) {
                            this.$message.success(`审核通过成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            handleReject(id) {
                this.rejectId = id
                this.rejectVisible = true
            },
            confirmReject() {
                let param = {
                    id: this.rejectId,
                    passed: false,
                    reason: this.reject
                }
                pass(param, res => {
                    if (res === 204) {
                        this.$message.success(`审核拒绝成功！`)
                        this.handleClose()
                        this.find()
                    }
                })
            },
            handleClose() {
                this.rejectVisible = false
                this.reject = ""
            },
            handleShow(id) {
                console.log(id)
                // this.createVisible = true
                this.$router.push({name: 'cameramanAuditShow', params:{id: id}})
            },
        }
    }
</script>

<style lang="less" scoped>

</style>