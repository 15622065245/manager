<template>
    <div>
        <el-dialog
                title="上传图片"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="30%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item>
                    <upload
                            @on-transport-file-list="handleTransportFileList"
                            @handleRemove="handleRemove"
                            :file-list="form.SharePoster ? form.SharePoster.split(';') : []"
                            @handleSuccess="handleSuccess"
                            :max-size="5120"
                            :limit="1"
                            v-if="isFinished"
                    ></upload>
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
    import Upload from '@/framework/components/upload'
    export default {
        name: "create",
        data() {
            return {
                form: {},
                isFinished: false
            }
        },
        components:{
            Upload
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
                    this.isFinished = true
                    console.log("this.form", this.form)
                })
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {
                let param = {
                    name:  "SharePoster",
                    value: this.form.SharePoster
                }
                update(param, res => {
                    if (res === 204) {
                        this.$message.success("设置成功！")
                        this.$emit('on-dialog-close')
                    }
                })
            },
            handleTransportFileList(fileList) {
                if (fileList.length > 0) {
                    this.form.SharePoster = fileList[0].response
                } else {
                    this.form.SharePoster = ''
                }
            },
            handleRemove() {
                this.form.SharePoster = ''
            },
            handleSuccess(fileList) {
                console.log("fileList11", fileList)
                if (fileList.length > 0) {
                    this.form.SharePoster = fileList[0].response
                } else {
                    this.form.SharePoster = ''
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>