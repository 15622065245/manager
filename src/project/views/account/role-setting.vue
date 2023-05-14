<template>
    <div>
        <el-dialog
                title="角色设置"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="formValidate" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="账号" prop="username">
                    <el-input disabled v-model="form.username" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input disabled v-model="form.password" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="value">
                    <el-transfer v-model="transferData" :data="data"
                                 :titles="['备选角色', '已选角色']"
                                 :button-texts="['', '']">
                    </el-transfer>
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
    import { updateRole, get } from "../../service/account";
    import { getRoleList } from "../../service/role";

    export default {
        name: "role-setting",
        data() {
                return {
                    data: [],
                    form: {},
                    rules: {
                        username: [
                            { required: true, message: '请输入账号', trigger: 'blur' },
                        ],
                        password: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                        ],
                        value: [
                            { required: true, message: '请输入状态', trigger: 'blur' },
                        ],
                    },
                    rolePageForm: {
                        role:{
                            accountType:"Manager",
                            enabled:true
                        },
                        pageable:{
                            page:1,
                            size:20,
                            sort:"id",
                            desc:true
                        }
                    },
                    transferData: []
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            roleId: {
                type: [String, Number]
            }
        },
        watch:{
            dialogVisible(val) {
                if (val) {
                    console.log(this.roleId)
                    this.findRoleList()
                }
            }
        },
        methods: {
            findRoleList() {
                getRoleList(this.rolePageForm, res => {
                    let data = []
                    res.forEach(item =>{
                        data.push({
                            key: item.id.toString(),
                            label: item.name
                        })
                    })
                    this.data = data
                })
                //回显角色
                get({id: this.roleId}, res =>{
                    let arr = []
                    res.roleList.forEach(item => {
                        arr.push(item.id.toString())
                    })
                    this.transferData = arr
                })
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
            },
            handleConfirm() {
                let param = {
                    id: this.roleId,
                    roleIdList: this.transferData
                }
                updateRole(param, res =>{
                    if (res === 204) {
                        this.$message.success("更新角色成功！")
                        this.handleClose()
                        this.$emit("onRefreshData")
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>