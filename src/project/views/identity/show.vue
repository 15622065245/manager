<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>认证信息</span>
        </div>
        <div style="padding-left: 30px">
            <div class="basic-info">
                <div class="info">
                    <el-descriptions title="基本信息" :column="1">
                        <el-descriptions-item label="姓名">{{info.realname}}</el-descriptions-item>
                        <el-descriptions-item label="身份证号">{{info.iDCard}}</el-descriptions-item>
                        <el-descriptions-item label="地址地区">{{info.address}}</el-descriptions-item>
                        <el-descriptions-item label="单模价格">99.99</el-descriptions-item>
                        <el-descriptions-item label="全包价格">199.99</el-descriptions-item>
                        <el-descriptions-item label="性别">{{info.gender}}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="idCard">
                    <div class="title">身份证正反面</div>
                    <el-image
                            v-if="info.frontIdCardImage"
                            class="idCard-image"
                            style="margin-bottom: 20px"
                            :src="`${$store.state.prefix}${info.frontIdCardImage}`"
                            fit="fill"></el-image>
                    <el-image
                            v-if="info.frontIdCardImage"
                            class="idCard-image"
                            :src="`${$store.state.prefix}${info.backIdCardImage}`"
                            fit="fill"></el-image>
                </div>
            </div>
            <div class="work-info">
                <p class="title">作品信息</p>
                <div v-if="info.images">
                    <el-image v-for="(item,index) in info.images" :key="index"
                              style="width: 184px;height: 184px;margin: 0 5px 0 20px"
                              :src="`${$store.state.prefix}${item}`"
                              fit="fill"></el-image>
                </div>
                <div style="height: 40px; margin-top: 40px">
                    <span>备注:</span>
                    <span>{{info.remark}}</span>
                </div>
                <div v-if="info.status === 'pending'" style="height: 30px;">
                    <span>审核状态:</span>
                    <span>待审核</span>
                    <div style="margin-top: 20px">
                        <el-button size="small" @click="handlePass">通过</el-button>
                        <el-button size="small" @click="rejectVisible = true" style="background-color: #ff1919;border: none">拒绝</el-button>
                    </div>
                </div>
                <div v-if="info.status === 'passed'" style="height: 40px">
                    <span>审核状态:</span>
                    <span>已通过</span>
                </div>
                <div v-if="info.status === 'rejected'" style="height: 40px">
                    <span>审核状态:</span>
                    <span>已拒绝</span>
                    <div style="margin-top: 20px">
                        <span>拒绝理由:</span>
                        <span>{{info.reason}}</span>
                    </div>
                </div>
            </div>
            <!-- 审核拒绝弹框-->
            <el-dialog
                    title="提示"
                    :modal-append-to-body="false"
                    :before-close="handleClose"
                    :visible.sync="rejectVisible"
                    width="30%">
                <div style="display: flex;align-items: center">
                    <span style="margin: 0 20px">请输入拒绝理由:</span>
                    <el-input v-model="reject" placeholder="拒绝理由"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="rejectVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="confirmReject">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </el-card>
</template>

<script>
    import { getIdentification, passIdentification } from "../../service/identity";

    export default {
        name: "create",
        data() {
            return {
                reject: "",
                info: {},
                rejectVisible: false
            }
        },
        mounted() {
          this.find()
        },
        methods: {
            find() {
                getIdentification({id: this.$route.params.id}, res => {
                    this.info = res
                    if (this.info.images) {
                        this.info.images = this.info.images.split(',')
                    }
                })
            },
            handlePass() {
                this.$confirm(`确定要审核通过吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    passIdentification({id: this.$route.params.id, passed: true}, res => {
                        if (res === 204) {
                            this.$message.success(`审核通过成功！`)
                            this.find()
                        }
                    })
                }).catch(() => {
                })
            },
            confirmReject() {
                let param = {
                    id: this.$route.params.id,
                    passed: false,
                    reason: this.reject
                }
                passIdentification(param, res => {
                    if (res === 204) {
                        this.$message.success(`审核拒绝成功！`)
                        this.handleClose()
                        this.find()
                    }
                })
            },
            handleClose() {
                this.rejectVisible = false
                this.reject = ""
            },
        }
    }
</script>

<style lang="less" scoped>
    .box-card {
        box-sizing: border-box;

        .basic-info {
            display: flex;

            .info {
                width: 800px;
                min-width: 300px;
            }

            .idCard {
                display: flex;
                flex-direction: column;
                justify-content: center;

                .idCard-image {
                    width: 310px;
                    height: 175px;
                }
            }
        }
        .work-info {
            font-size: 14px;
        }
        .title {
            font-size: 14px;
            color: #303133;
            font-weight: 700;
            margin-bottom: 20px
        }
    }
    /deep/ .el-card {
        min-height: 200px;
    }





    /deep/ .el-descriptions-item__container {
        display: -webkit-box;
        height: 40px;
        font-size: 14px;
    }
</style>