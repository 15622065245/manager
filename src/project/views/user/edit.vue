<template>
    <div>
        <el-dialog
                title="主页信息"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="40%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="formValidate" :model="form" label-width="100px">
                <el-form-item label="主页封面" prop="image">
                    <upload
                            @on-transport-file-list="handleTransportFileList"
                            @handleRemove="handleRemove"
                            :file-list="form.image ? form.image.split(';') : []"
                            @handleSuccess="handleSuccess"
                            :max-size="5120"
                            :limit="1"
                    ></upload>
                </el-form-item>
                <el-form-item label="主页名称" prop="homepageName">
                    <el-input v-model="form.homepageName" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="contractPhone">
                    <el-input v-model="form.contractPhone" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechatNumber">
                    <el-input v-model="form.wechatNumber" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="qqNumber">
                    <el-input v-model="form.qqNumber" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="擅长" prop="advantage">
                    <el-input v-model="form.advantage" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item v-if="form.identity==='model'" label="身高" prop="height">
                    <el-input v-model="form.height" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item v-if="form.identity==='model'" label="体重" prop="weight">
                    <el-input v-model="form.weight" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item v-if="form.identity==='model'" label="三维" prop="threeDimensional">
                    <el-input v-model="form.threeDimensional" placeholder="请输入" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item v-if="form.identity==='model'" label="鞋码" prop="shoeSize">
                    <el-input v-model="form.shoeSize" placeholder="请输入" style="width: 95%"></el-input>
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
    import Upload from '@/framework/components/upload'
    import { get, update } from "../../service/works-classify";
    import { updateHomePage } from "../../service/user";

    export default {
        name: "edit",
        components:{
            Upload
        },
        data() {
            return {
                form: {},
                rules:{
                    homepageName: [
                        { required: true, message: "请输入", trigger: 'blur' }
                    ],
                    contractPhone: [
                        { required: true, message: "请输入", trigger: 'change' }
                    ],
                    wechatNumber: [
                        { required: true, message: "请输入", trigger: 'change' }
                    ],
                    qqNumber: [
                        { required: true, message: "请输入", trigger: 'change' }
                    ],
                    advantage: [
                        { required: true, message: "请输入", trigger: 'change' }
                    ],
                    address: [
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
            editData: {
                type: Object
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
                this.form = JSON.parse(JSON.stringify(this.editData))
                console.log("this.form", this.form)
            },
            handleClose() {
                this.$emit('on-dialog-close')
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
                console.log("fileList11", fileList)
                if (fileList.length > 0) {
                    this.form.image = fileList[0].response
                } else {
                    this.form.image = ''
                }
            },
            handleConfirm() {
                let param = {
                    user: {
                        id: this.form.id,
                        image: this.form.image,
                        homepageName: this.form.homepageName,
                        contractPhone: this.form.contractPhone,
                        wechatNumber: this.form.wechatNumber,
                        qqNumber: this.form.qqNumber,
                        advantage: this.form.advantage,
                        address: this.form.address,
                        height: this.form.height ? this.form.height : '',
                        weight: this.form.weight ? this.form.weight : '',
                        threeDimensional: this.form.threeDimensional ? this.form.threeDimensional : '',
                        shoeSize: this.form.shoeSize ? this.form.shoeSize : ''
                    }
                }
                updateHomePage(param, res => {
                    if (res) {
                        this.$message.success("修改成功!")
                        this.handleClose()
                        this.$emit('onRefreshData')
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>