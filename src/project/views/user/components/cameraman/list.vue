<template>
    <div class="model">
        <el-row class="searchContent">
            <el-col :span="24" style="margin: 30px 0 20px 0">
                <span class="labelText" style="margin-right: 10px">作品标题</span>
                <el-input v-model="input" placeholder="请输入" style="margin-right: 50px"></el-input>
                <span class="labelText" style="margin-right: 10px">风格</span>
                <el-input v-model="input" placeholder="请输入" style="margin-right: 50px"></el-input>
                <span class="labelText" style="margin-right: 10px">衣品</span>
                <el-input v-model="input" placeholder="请输入" style="margin-right: 50px"></el-input>
                <span class="labelText" style="margin-right: 10px">主页名称</span>
                <el-input v-model="input" placeholder="请输入" style="margin-right: 50px"></el-input>

            </el-col>
            <el-col :span="24" style="margin-bottom:20px">
                <span class="labelText" style="margin-right: 10px">状态</span>
                <el-select v-model="form.desensitization" placeholder="请选择" style="margin-right: 50px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span class="labelText" style="margin-right: 10px">上架时间</span>
                <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button class="find btn" icon="el-icon-search" size="small">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button class="btn addButton" size="small">批量上架</el-button>
                <el-button class="btn addButton" size="small">批量下架</el-button>
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
                            prop="clothing"
                            align="center"
                            label="衣品">
                    </el-table-column>
                    <el-table-column
                            prop="photoPrice"
                            align="center"
                            label="摄影价格">
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
                            prop="datetime"
                            align="center"
                            label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作"
                            width="160px">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="handleDelete(scope.row.id)">删除</el-button>
                            <el-button size="small" class="optionButton" @click="handleShow(scope.row.id)">查看</el-button>
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
                            :total="800">
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
    export default {
        name: "user",
        data() {
            return {
                searchItems: [{
                    // name: '名称',
                    key: 'name',
                    type: 'string'
                },],
                input: "",
                page: 10,
                // 扫描标记
                form: {
                    name: "",
                    level:"",
                    encryption:"",
                    desensitization:"",
                    desc: "",
                    testCode:""
                },
                options: [{
                    value: '上架',
                    label: '上架'
                }, {
                    value: '下架',
                    label: '下架'
                }],
                value: '',
                value1: '',
                deleteVisible: false,
                tableData: [{
                    id: "001",
                    title: '实拍韩风2023新款韩版吊带内穿',
                    user: "小徐",
                    homeName: "我是摄影师",
                    style: "小清新",
                    clothing: "御姐",
                    photoPrice: 48,
                    price: "783",
                    time: '2016-05-02 12:00:00',
                    status: "",
                },{
                    id: "002",
                    title: '实拍韩风2023新款韩版',
                    user: "小徐",
                    homeName: "我是摄影师",
                    style: "小清新",
                    clothing: "御姐",
                    photoPrice: 48,
                    price: "783",
                    time: '2016-05-02 12:00:00',
                    status: "",
                },{
                    id: "003",
                    title: '实拍韩风2023新款韩版',
                    user: "小徐",
                    homeName: "我是摄影师",
                    style: "小清新",
                    clothing: "御姐",
                    photoPrice: 48,
                    price: "783",
                    time: '2016-05-02 12:00:00',
                    status: "",
                },{
                    id: "004",
                    title: '实拍韩风2023新款韩版吊带内穿',
                    user: "小徐1",
                    homeName: "我是摄影师",
                    style: "小清新",
                    clothing: "御姐",
                    photoPrice: 70,
                    price: "783",
                    time: '2016-05-02 12:00:00',
                    status: "",
                },{
                    id: "005",
                    title: '实拍韩风2023新款韩版吊带内穿',
                    user: "小徐",
                    homeName: "我是摄影师",
                    style: "小清新",
                    clothing: "御姐",
                    photoPrice: 90,
                    price: "783",
                    time: '2016-05-02 12:00:00',
                    status: "",
                }]
            }
        },
        methods: {
            handleSelectionChange(val) {
                let arr = []
                val.forEach(item => {
                    arr.push(item.id)
                })
                console.log(arr)
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            handleDelete() {
              this.deleteVisible = true
            },
            handleShow(id) {
                console.log(id)
                // this.createVisible = true
                this.$router.push({name: 'userCameramanShow'})
            },
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