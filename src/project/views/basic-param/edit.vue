<template>
    <div>
        <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="30%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item v-if="editType==='PlatformPhone'" label="平台联系电话">
                    <el-input v-model="form.PlatformPhone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='WorkLimit'" label="作品上架上限数量">
                    <el-input v-model="form.WorkLimit" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='WorkDisableDay'" label="作品自动下架时间">
                    <el-input v-model="form.WorkDisableDay" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='PlatformWechat'" label="平台客服微信">
                    <el-input v-model="form.PlatformWechat" placeholder="请输入"></el-input>
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
    import { find, update } from "../../service/dictionary";
    export default {
        name: "create",
        data() {
            return {
                form: {
                    name: "",
                    superior: "",
                    desc: "",
                },
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            editType: {
                type: String,
            }
        },
        watch: {
          dialogVisible(val) {
              if (val) {
                  this.findData()
              }
          }
        },
        methods: {
            findData() {
                find({}, res => {
                    const obj = res.reduce((acc, cur) => {
                        acc[cur.name] = cur.value;
                        return acc;
                    }, {});
                    this.form = obj
                })
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {
                let param = {
                    name:  this.editType,
                    value: this.form[this.editType]
                }
                console.log("param", param)
                update(param, res => {
                    if (res === 204) {
                        this.$message.success("设置成功！")
                        this.$emit('on-dialog-close')
                        this.$emit("onRefreshData")
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>