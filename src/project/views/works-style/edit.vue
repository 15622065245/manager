<template>
    <div>
        <el-dialog
                title="编辑风格"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="formValidate" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="风格名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入风格昵称" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="所属模特" prop="type">
                    <el-radio v-model="form.type" label="通用">通用</el-radio>
                    <el-radio v-model="form.type" label="男模">男模</el-radio>
                    <el-radio v-model="form.type" label="女模">女模</el-radio>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <el-button class="theme" size="small" @click="handleConfirm('formValidate')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { get, update } from "../../service/works-style";

    export default {
        name: "edit",
        data() {
            return {
                form: {},
                rules:{
                    name: [
                        { required: true, message: "请输入", trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: "请输入", trigger: 'change' }
                    ]
                },
            }
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
        watch:{
          dialogVisible(val) {
              if (val) {
                  this.getData()
              }
          }
        },
        methods: {
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
                        style: this.form
                    }
                    update(param, res => {
                        if (res) {
                            this.$message.success("修改成功!")
                            this.handleClose()
                            this.$emit('onRefreshData')
                        }
                    })
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>