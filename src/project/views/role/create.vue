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
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="comment">
                            <el-input type="textarea" v-model="form.comment" placeholder="请输入" style="width: 95%"></el-input>
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
    import {saveRole} from "../../service/role";

    export default {
        name: "create",
        data() {
            return {
                form: {
                },
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    comment: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
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
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
            },
            handleConfirm(name) {
                this.$refs[name].validate((valid) => {
                    if(!valid) return false
                    let params = {
                        role: this.form
                    }
                    saveRole(params, res => {
                        if (res) {
                            this.$message.success("新增成功")
                            this.$emit('on-dialog-close')
                            this.$emit("onRefreshData")
                        }
                    })
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>