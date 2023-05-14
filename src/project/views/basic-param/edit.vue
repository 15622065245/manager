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
                <el-form-item v-if="editType==='phone'">
                        <span slot="label">
                            <span>平台联系电话</span>
                        </span>
                    <el-input v-model="form.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='number'">
                        <span slot="label">
                            <span>作品上架上限数量</span>
                        </span>
                    <el-input v-model="form.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='time'">
                        <span slot="label">
                            <span>作品自动下架时间</span>
                        </span>
                    <el-input v-model="form.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="editType==='WeChat'">
                        <span slot="label">
                            <span>平台客服微信</span>
                        </span>
                    <el-input v-model="form.WeChat" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <el-button class="theme" size="small" @click="handleConfirm('formValidate')">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
        methods: {
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {

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