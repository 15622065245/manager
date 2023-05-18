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
                    <el-radio v-model="form.enabled" :label="true">启用</el-radio>
                    <el-radio v-model="form.enabled" :label="false">禁用</el-radio>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleConfirm('formValidate')">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { update, get } from "../../service/account";

    export default {
        name: "edit",
        data() {
            return {
                activeName: 'first',
                form: {
                    password: null
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    // password: [
                    //     { required: true, message: '请输入密码', trigger: 'blur' },
                    // ],
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    enabled: [
                        { required: true, message: '请输入状态', trigger: 'blur' },
                    ],
                },
            }
        },
        created() {
          // this.form = JSON.parse(JSON.stringify(this.editData))
            console.log(this.editData)
            // this.getData()
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            editData: {
                type: Object,
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
            getData() {
                // this.form = this.editData
                this.form = JSON.parse(JSON.stringify(this.editData))
              // get({id: this.editData}, res => {
              //     this.form = res
              //     this.finshed = true
              //     console.log("数据", res)
              // })
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
            },
            handleConfirm(name) {
                this.$refs[name].validate((valid) => {
                    if(!valid) return false
                    let params = {
                        manager: this.form
                    }
                    params.id = this.editData
                    update(params, res => {
                        if (res === 204) {
                            this.$message.success("修改成功")
                            this.$emit('on-dialog-close')
                            this.$emit("onRefreshData")
                        }
                        console.log("修改结果", res)
                    })
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>