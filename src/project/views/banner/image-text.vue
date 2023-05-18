<template>
    <el-dialog
            title="新建广告"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="50%"
            :before-close="handleClose"
            v-dialogDrag
            :close-on-click-modal="false"
    >
        <el-row class="searchContent">
            <el-col :span="22" class="search-wrapper">
                <el-form ref="formValidate" :rules="rules" :model="form" label-width="100px">
                    <el-form-item label="标题" prop="topic">
                        <el-input v-model="form.topic" placeholder="请输入" style="width: 95%"></el-input>
                    </el-form-item>
                    <el-form-item label="图文详情" prop="content">
                        <i-editor :defaultContent="form.content" @on-change-content="onChangeEditor" style="width: 95%"/>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col style="display: flex;justify-content: center">
                <el-button size="small" style="margin-top: 20px;" @click="handleClose">取消</el-button>
                <el-button type="primary" size="small" style="margin-top: 20px;" @click="handleConfirm">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import {count, getUserList, batchEnable} from "../../service/user";
    import IEditor from '@/framework/components/editor/editor'
    import {getSlide} from "../../service/advertising";

    export default {
        name: "image-text",
        props: {
            dialogVisible: {
                type: Boolean,
                defalut: false
            },
            editId: {
                type: String,
                defalut: ""
            }
        },
        watch: {
            dialogVisible(val) {
                if ( val && this.editId){
                    this.find()
                }
            }
        },
        data() {
            return {
                userId: "",
                form: {},
                rules: {
                    topic:[
                        { required: true, message:"请输入", trigger:"blur"}
                    ],
                    content: [
                        { required: true, validator: this.validateContent, trigger: "blur" }
                    ]
                }

            }
        },
        components: {
            IEditor
        },
        methods: {
            find() {
                getSlide({id: this.editId}, res => {
                    this.form = res
                    console.log("tform", this.form)
                    console.log("res11", res)
                })
            },
            validateContent(rule, value, callback) {
                if (!value || value === '') {
                    callback(new Error('请输入图文详情'))
                } else {
                    callback()
                }
            },
            onChangeEditor(val) {
                this.form.content = val.html
            },
            handleConfirm() {
                this.$refs.formValidate.validate((valid) => {
                    if (!valid) return false
                    this.$emit("selectImageText", this.form)
                    this.$emit('on-dialog-close')
                })
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
            },
        }
    }
</script>

<style scoped>

</style>