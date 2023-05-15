<template>
    <div>
        <el-dialog
                title="新建广告"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
                    <el-form ref="formValidate" :rules="rules" :model="form" label-width="100px">
                        <el-form-item label="广告位" prop="location">
                            <el-input disabled v-model="form.location" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="广告标题" prop="title">
                            <el-input v-model="form.title" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="广告图片" prop="image">
                            <upload
                                    @on-transport-file-list="handleTransportFileList"
                                    @handleRemove="handleRemove"
                                    :file-list="form.image ? form.image.split(';') : []"
                                    @handleSuccess="handleSuccess"
                                    :max-size="5120"
                                    :limit="1"
                            ></upload>
                            <span>建议尺寸： 750*300</span>
                        </el-form-item>
                        <el-form-item label="开始时间" prop="effectiveTime">
                            <el-date-picker
                                    v-model="form.effectiveTime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="expirationTime">
                            <el-date-picker
                                    v-model="form.expirationTime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="排序数值" prop="position">
                            <el-input v-model="form.position" placeholder="请输入" style="width: 95%"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转类型" prop="type">
                            <el-radio v-model="form.type" label="work">作品详情</el-radio>
                            <el-radio v-model="form.type" label="content">图文详情</el-radio>
                            <el-radio v-model="form.type" label="user">用户主页</el-radio>
                        </el-form-item>
                    </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button class="theme" size="small" @click="handleConfirm('formValidate')">提交</el-button>
                <el-button size="small" @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
        <selectWorks :dialogVisible="seletctDialogVisible" @on-dialog-close="seletctHandleClose" @selectWork="selectWork"></selectWorks>
    </div>
</template>

<script>
    import Upload from '@/framework/components/upload'
    import selectWorks from "./select-works"
    import { saveSlide } from "../../service/advertising";

    export default {
        name: "create",
        components: {
            Upload,
            selectWorks
        },
        data() {
            const avatarValidate = (rule, value, callback) => {
                if (this.form.image === '') {
                    callback('请上传头像')
                } else {
                    callback()
                }
            }
            return {
                form: {
                    location: "banner"
                },
                seletctDialogVisible: false,
                workId: "",
                rules: {
                    location: [
                        { required: true, message: "请输入", trigger: "blur" }
                    ],
                    title: [
                        { required: true, message: "请输入", trigger: "blur" }
                    ],
                    image: [
                        { required: true, validator: avatarValidate }
                    ],
                    position: [
                        { required: true, message: "请输入", trigger: "change" }
                    ],
                    effectiveTime: [
                        { required: true, message: "请输入", trigger: "change" }
                    ],
                    expirationTime: [
                        { required: true, message: "请输入", trigger: "blur" }
                    ],
                    type: [
                        { required: true, message: "请输入", trigger: "change" }
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
        watch: {
            "form.type"(val) {
                if (val === "work") {
                    this.seletctDialogVisible = true
                }
            }
        },
        methods: {
            selectWork(id) {
                this.workId = id
                console.log("我拿到了", id)
            },
            handleTransportFileList(fileList) {
                if (fileList.length > 0) {
                    this.form.image = fileList[0].response
                } else {
                    this.form.image = ''
                }
            },
            handleRemove() {
                this.form.image = ''
            },
            handleSuccess(fileList) {
                if (fileList.length > 0) {
                    this.form.image = fileList[0].response
                } else {
                    this.form.image = ''
                }
            },
            seletctHandleClose() {
                this.seletctDialogVisible = false
            },
            handleClose() {
                this.$emit('on-dialog-close')
                this.$refs.formValidate.resetFields()
                this.form.image = ""
            },
            handleConfirm(name) {
                this.$refs[name].validate((valid) => {
                    if (!valid) return false
                    let param = {
                        slide:{
                            enabled: true,
                            title: this.form.title,
                            image: this.form.image,
                            position: this.form.position,
                            location: "banner",
                            effectiveTime: this.form.effectiveTime,
                            expirationTime: this.form.expirationTime,
                            type: this.form.type,
                            link: `${this.form.type}:${this.workId}`,
                            content:""
                        }
                    }
                    console.log("param", param)
                    saveSlide(param, res => {
                        if (res) {
                            this.$message.success("新增成功！")
                            this.handleClose()
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