<template>
    <div class="page">
        <el-card>
            <div slot="header" class="clearfix">
                <span>消息推送</span>
            </div>
            <div class="card-content">
                <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
                    <el-form-item label="消息标题" prop="title">
                        <el-input v-model.trim="formValidate.title" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="消息详情" prop="content" class="editor">
                        <i-editor :defaultContent="formValidate.content" @on-change-content="onChangeEditor"/>
                    </el-form-item>
                </el-form>
                <div class="footer">
                    <el-button class="btn" type="info" @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import IEditor from '@/framework/components/editor/editor'
    import { saveMessage } from "../../service/system-message";

    export default {
        components: {IEditor},
        data() {
            let validateContent = (rule, value, callback) => {
                let val = value.replace(/<[^<>]?p>/g, "").replace(/&nbsp;/gi, "").replace(/ /g, "")
                if (value === '' || val.length < 1 ) {
                    callback(new Error('内容不能为空'))
                } else {
                    callback()
                }
            }
            return {
                model: 'notificationPacket',
                formValidate: {
                    title: '',
                    content: '',
                },
                ruleValidate: {
                    title: [{required: true, message: '不能为空', trigger: 'blur'}],
                    content: [
                        {required: true,validator: validateContent, trigger: 'blur'},
                    ]
                },
            }
        },
        methods: {
            //取消
            handleClose() {
                this.$refs.formValidate.resetFields()
                this.$router.back()
            },
            //确定
            handleConfirm() {
                this.$refs.formValidate.validate(valid => {
                    if (!valid) return false
                    console.log("this.formValidate", this.formValidate)
                    saveMessage({notificationPacket: this.formValidate},res=> {
                        this.$message.success('新建成功')
                        this.$refs.formValidate.resetFields()
                        this.$router.back()
                    })
                })
            },
            onChangeEditor(val) {
                this.formValidate.content = val.html
            }
        },
    }
</script>

<style scoped lang="less">
    .card-content {
        font-size: 14px;
        .footer {
            margin: 40px 0 40px 150px;
            .btn {
                margin-right: 40px;
            }
        }
    }
</style>
