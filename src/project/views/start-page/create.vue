<template>
    <div>
        <el-dialog
                title="新建广告"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="广告位">
                            <el-input v-model="form.name" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="广告标题">
                            <el-input v-model="form.name" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="广告图片">
                            <upload
                                    @on-transport-file-list="handleTransportFileList"
                                    @handleRemove="handleRemove"
                                    :file-list="form.avatarSmall ? form.avatarSmall.split(';') : []"
                                    @handleSuccess="handleSuccess"
                                    :max-size="5120"
                                    :limit="1"
                            ></upload>
                            <span>建议尺寸： 750*300</span>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <el-date-picker
                                    v-model="form.value1"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker
                                    v-model="form.value2"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="排序数值">
                            <el-input v-model="form.name" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转类型">
                            <el-radio v-model="form.status" label="1">作品详情</el-radio>
                            <el-radio v-model="form.status" label="2">图文详情</el-radio>
                            <el-radio v-model="form.status" label="3">用户主页</el-radio>
                        </el-form-item>
                    </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button class="theme" size="small" @click="handleConfirm('formValidate')">提交</el-button>
                <el-button size="small" @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Upload from '@/framework/components/upload'
    export default {
        name: "create",
        components: {
            Upload,
        },
        data() {
            return {
                activeName: 'first',
                form: {
                    name: "",
                    superior: "",
                    desc: "",
                },
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                },
                tableData: [{
                    name: '财务系统',
                    desc: '-'
                }, {
                    name: '采购系统',
                    desc: '-'
                },],
                addDialogVisible: false,
                addForm:{
                    name: "",
                    desc:""
                }
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            handleTransportFileList(fileList) {
                if (fileList.length > 0) {
                    this.form.avatar = fileList[0].response.data
                } else {
                    this.form.avatar = ''
                }
            },
            handleRemove() {
                this.form.avatar = ''
            },
            handleSuccess(res) {
                this.form.avatar = res.path
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {

            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            addLabelHandleClose() {
                this.addDialogVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .dialog-footer {
        .theme {
            margin-left: 30px;
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

    /deep/ .el-select > .el-input {
        width: 90%;
    }

    /deep/ .el-textarea .el-input__count {
        position: absolute;
        bottom: -40px;
        right: 0px;
    }
</style>