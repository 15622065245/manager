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
                    <el-form ref="formValidate"  :rules="rules" :model="form" label-width="100px">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="form.username" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="realname">
                            <el-input v-model="form.realname" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" prop="enabled">
                            <el-radio v-model="form.enabled" label="1">启用</el-radio>
                            <el-radio v-model="form.enabled" label="2">禁用</el-radio>
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
    import { saveAccount } from "../../service/account";

    export default {
        name: "create",
        data() {
            return {
                activeName: 'first',
                form: {
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    enabled: [
                        { required: true, message: '请输入状态', trigger: 'blur' },
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
                    if (!valid) return false
                    let form = {
                        manager: this.form
                    }
                    console.log(form)
                    saveAccount(form, res => {
                        if (res) {
                            this.$message.success('新增成功')
                            this.handleClose()
                            this.$emit('onRefreshData')
                        }
                        console.log("新增", res)
                    })
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>