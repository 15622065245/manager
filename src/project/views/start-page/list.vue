<template>
    <div class="account">
        <el-row class="searchContent">
            <el-col :span="24" style="margin: 30px 0 20px 0">
                <span class="labelText" style="margin-right: 10px">广告标题</span>
                <el-input v-model="input" placeholder="请输入" style="margin-right: 20px"></el-input>
                <span class="labelText" style="margin-right: 10px">状态</span>
                <el-select v-model="form.desensitization" placeholder="请选择" style="margin-right: 20px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <span class="labelText" style="margin-right: 10px">更新时间</span>
                <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button class="find btn" size="small">查询</el-button>
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
                            prop="code"
                            label="ID"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="广告标题"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="广告位"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            align="center"
                            label="排序数值">
                    </el-table-column>
                    <el-table-column
                            prop="datetime"
                            align="center"
                            label="开始时间">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            align="center"
                            label="结束时间">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            align="center"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="datetime"
                            align="center"
                            label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="value1">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" class="optionButton" @click="editHandle">编辑</el-button>
                            <el-button size="small" class="optionButton" @click="deleteHandle">删除</el-button>
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
        <!-- 新增目录弹框-->
        <Icreate :dialog-visible="createVisible" @on-dialog-close="handleClose"></Icreate>
        <!-- 修改目录弹框-->
        <Iedit :dialog-visible="editVisible" @on-dialog-close="handleClose"></Iedit>
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

    </div>
</template>

<script>
    import Icreate from "./create";
    import Iedit from "./edit";
    export default {
        name: "sensitive-title",
        components:{
            Icreate,
            Iedit,
        },
        data() {
            const item = {
                code: "001",
                datetime: '2016-05-02 12:00:00',
                title: '王小虎',
                name: '交易板块'
            }
            return {
                tableData: new Array(5).fill(item),
                searchItems: [{
                    // name: '名称',
                    key: 'name',
                    type: 'string'
                },],
                input: "",
                page: 10,
                createVisible: false,
                editVisible: false,
                deleteVisible: false,
                roleVisible: false,
                // 扫描标记
                form: {
                    name: "",
                    level:"",
                    encryption:"",
                    desensitization:"",
                    desc: "",
                    testCode:""
                },
                bulkEncryptionDialogVisible:false,
                options: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '启用',
                    label: '启用'
                }, {
                    value: '禁用',
                    label: '禁用'
                }],
                value: '',
                value1: ''

            }
        },
        methods: {
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
            deleteHandle() {
                this.deleteVisible = true
            },
            roleHandle() {
              this.roleVisible = true
            },

            handleClose() {
                this.createVisible = false
                this.editVisible = false
                this.bulkEncryptionDialogVisible = false
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