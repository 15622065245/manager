<template>
    <div>
        <el-dialog
                title="基本信息"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="formValidate" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="文章名称" prop="title">
                    <el-input v-model="form.title" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="图文详情" prop="content">
                    <i-editor :defaultContent="form.content" @on-change-content="onChangeEditor" style="width: 95%"/>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleConfirm('formValidate')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import IEditor from '@/framework/components/editor/editor'
    import { save } from "../../service/system-article";

    export default {
        name: "create",
        data() {

            return {
                form: {
                    title: "",
                    content: ""
                },
                rules: {
                    title: [
                        { required: true, message: "请输入", trigger: 'blur' }
                    ],
                    content: [
                        { required:true, validator: this.validateContent, trigger: 'blur'}
                    ]
                }
            }
        },
        components:{
            IEditor
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            validateContent(rule, value, callback) {
                if (!value || value === '') {
                    callback(new Error('请输入图文详情'))
                } else {
                    callback()
                }
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
                this.form.content = ""
            },
            handleConfirm(name) {
                console.log("this.form", this.form)
                this.$refs[name].validate((valid) => {
                    if (!valid) return false
                    let param = {
                        page:{
                            title: this.form.title,
                            content: this.form.content
                        }
                    }
                    save(param, res => {
                        if (res === 204) {
                            this.$message.success("新增成功！")
                            this.handleClose()
                            this.$emit("onRefreshData")
                        }
                    })
                })
            },
            onChangeEditor(val) {
                this.form.content = val.html
            },
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