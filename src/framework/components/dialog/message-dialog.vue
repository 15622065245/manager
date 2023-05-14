<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="40%">
        <div style="display: flex;align-items: center">
            <div>
                <img src="@/../static/images/delete.png" alt="" >
            </div>
            <div>
                <div style="margin-left: 20px;width: 450px" >{{message}}</div>
                <slot></slot>
            </div>

        </div>

        <span slot="footer" class="dialog-footer">
                <el-button class="theme" size="small" @click="onsubmit">确定</el-button>
                <el-button size="small" @click="handleClose">取消</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "message-dialog",
        data() {
            return {

            }
        },
        props: {
            title: {
                type: String,
                default: "新增"
            },
            dialogVisible: {
                type:Boolean,
                default: false
            },
            message: {
                type: String,
                default:"是否确定删除？"
            }
        },
        methods: {
            onsubmit() {
                this.$emit('on-submit',true)
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
        },
    }
</script>

<style lang="less" scoped>
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
    /deep/ .el-select>.el-input {
        width: 100%;
    }
    /deep/ .el-textarea .el-input__count {
        position: absolute;
        bottom: -40px;
        right: 0px;
    }
</style>