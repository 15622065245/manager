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
    import { get, update } from "../../service/system-article";
    import IEditor from '@/framework/components/editor/editor'
    export default {
        name: "create",
        data() {
            return {
                form: {},
                data: null,
                rules: {
                    title: [
                        { required: true, message: "请输入", trigger: "blur" }
                    ],
                    content: [
                        { required: true, validator: this.validateContent, trigger: "blur" }
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
            editId: {
                type: String
            }
        },
        watch: {
            dialogVisible(val) {
              if (val) {
                  this.getData()
              }
          }
        },
        methods: {
            validateContent(rule, value, callback) {
                if (!value || value === '') {
                    callback(new Error('请输入图文详情'))
                } else {
                    callback()
                }
            },
            getData() {
                get({id: this.editId}, res => {
                    this.form = res
                })
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
            },
            handleConfirm(name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) return false
                    let param = {
                        page:{
                            id: this.editId,
                            title: this.form.title,
                            content: this.form.content,
                            location: this.form.location
                        }
                    }
                    update(param, res => {
                        if (res === 204) {
                            this.$message.success("修改成功！")
                            this.handleClose()
                            this.$emit('onRefreshData')
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

</style>