<template>
    <el-tabs v-else v-model="activeName">
        <el-tab-pane label="用户详情" name="first">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户基本信息</span>
                </div>
                <div style="display: flex;justify-content: space-around;margin-top: 30px">
                    <div>
                        <el-image
                                v-if="info.avatar"
                                style="width: 100px; height: 100px"
                                :src="`${$store.state.prefix}${info.avatar}`"
                                fit="fill"></el-image>
                    </div>
                    <div style="margin-left: 80px">
                        <el-descriptions :column="3">
                            <el-descriptions-item label="ID">{{String(info.id)}}</el-descriptions-item>
                            <el-descriptions-item label="昵称">{{info.nickname}}</el-descriptions-item>
                            <el-descriptions-item label="手机号">{{info.phone}}</el-descriptions-item>
                            <el-descriptions-item label="身份">{{info.identity}}</el-descriptions-item>
                            <el-descriptions-item label="注册时间">{{info.creationTime}}</el-descriptions-item>
                            <el-descriptions-item label="最近登录时间">{{info.loginTime}}</el-descriptions-item>
                            <el-descriptions-item label="启用状态">
                                <el-switch
                                        v-model="info.enabled"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="margin: 5px 0">
                <div slot="header" class="clearfix">
                    <span>主页信息</span>
                    <el-button @click="handleEdit" size="small" style="float: right">编辑</el-button>
                </div>
                <div style="display: flex;justify-content: space-around;margin-top: 30px">
                    <div style="margin-left: 80px">
                        <div v-if="enterYear">
                            <span>主页标签</span>
                            <el-tag style="margin-left: 5px" type="danger" size="small">入驻{{enterYear}}年</el-tag>
                        </div>
                        <div style="margin: 10px 0 30px">
                            <p style="margin-bottom: 5px">主页封面</p>
                            <el-image
                                    v-if="info.image"
                                    style="width: 320px;height: 150px"
                                    :src="`${$store.state.prefix}${info.image}`"
                                    fit="fill"></el-image>
                        </div>
                        <el-descriptions :column="info.identity ==='model' ? 2 : 1">
                            <el-descriptions-item label="主页名称">{{info.homepageName}}</el-descriptions-item>
                            <el-descriptions-item v-if="info.identity==='model'" label="身高">{{info.height}}</el-descriptions-item>
                            <el-descriptions-item label="手机号">{{info.contractPhone}}</el-descriptions-item>
                            <el-descriptions-item v-if="info.identity==='model'" label="体重">{{info.weight}}</el-descriptions-item>
                            <el-descriptions-item label="微信号">{{info.wechatNumber}}</el-descriptions-item>
                            <el-descriptions-item v-if="info.identity==='model'" label="三维">{{info.threeDimensional}}</el-descriptions-item>
                            <el-descriptions-item label="QQ号">{{info.qqNumber}}</el-descriptions-item>
                            <el-descriptions-item v-if="info.identity==='model'" label="鞋码">{{info.shoeSize}}</el-descriptions-item>
                            <el-descriptions-item label="擅长">{{info.advantage}}</el-descriptions-item>
                            <el-descriptions-item label="地址">{{info.address}}</el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions v-if="false" :column="1">
                            <el-descriptions-item label="主页名称">{{info.homepageName}}</el-descriptions-item>
                            <el-descriptions-item label="手机号">{{info.contractPhone}}</el-descriptions-item>
                            <el-descriptions-item label="微信号">{{info.wechatNumber}}</el-descriptions-item>
                            <el-descriptions-item label="QQ号">{{info.qqNumber}}</el-descriptions-item>
                            <el-descriptions-item label="擅长">{{info.advantage}}</el-descriptions-item>
                            <el-descriptions-item label="地址">{{info.address}}</el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>认证信息</span>
                </div>
                <div style="padding-left: 30px">
                    <div class="basic-info">
                        <div class="info">
                            <el-descriptions title="基本信息" :column="1">
                                <el-descriptions-item label="姓名">{{identification.realname}}</el-descriptions-item>
                                <el-descriptions-item label="身份证号">{{identification.iDCard}}</el-descriptions-item>
                                <el-descriptions-item label="地址地区">{{identification.address}}</el-descriptions-item>
                                <el-descriptions-item label="单模价格">{{identification.price}}</el-descriptions-item>
                                <el-descriptions-item label="全包价格">{{identification.amount}}</el-descriptions-item>
                                <el-descriptions-item label="性别">{{identification.gender}}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div class="idCard">
                            <div class="title">身份证正反面</div>
                            <el-image
                                    v-if="identification.frontIdCardImage"
                                    class="idCard-image"
                                    style="margin-bottom: 20px"
                                    :src="`${$store.state.prefix}${identification.frontIdCardImage}`"
                                    fit="fill"></el-image>
                            <el-image
                                    v-if="identification.frontIdCardImage"
                                    class="idCard-image"
                                    :src="`${$store.state.prefix}${identification.backIdCardImage}`"
                                    fit="fill"></el-image>
                        </div>
                    </div>
                    <div class="work-info">
                        <p class="title">作品信息</p>
                        <div v-if="identification.images">
                            <el-image v-for="(item,index) in identification.images" :key="index"
                                      style="width: 184px;height: 184px;margin: 0 5px 0 20px"
                                      :src="`${$store.state.prefix}${item}`"
                                      fit="fill"></el-image>
                        </div>
                    </div>
                </div>
            </el-card>
            <!--修改弹窗-->
            <Iedit :dialog-visible="editVisible" :editData="info" @on-dialog-close="editVisible = false" @onRefreshData="getData"></Iedit>
        </el-tab-pane>
        <el-tab-pane label="作品列表" name="second">
            <modelList v-if="info.identity === 'model'"></modelList>
            <cameraman v-if="info.identity === 'photographer'"></cameraman>
            <place v-if="info.identity === 'place'"></place>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import modelList from "./components/model/list";
    import cameraman from "./components/cameraman/list";
    import place from "./components/place/list";
    import Iedit from "./edit"
    import {get} from "../../service/user";
    import { getIdentification, passIdentification } from "../../service/identity";
    export default {
        name: "tabs",
        data() {
            return {
                activeName: 'first',
                value: "",
                info: {},
                identification:{},
                reject: "",
                rejectVisible: false,
                editVisible: false,
                enterYear: ""
            }
        },
        components:{
            modelList,
            cameraman,
            place,
            Iedit,
        },
        mounted() {
            if (this.$route.params.active) {
                this.activeName = "second"
            }
            console.log(this.$route.params)
            this.getData()
        },
        methods: {
            getData() {
                get({id: this.$route.params.id}, res => {
                    this.info = res
                    this.enterYear = this.getTimeDiff(this.info.creationTime)
                    console.log("this.enterYear", this.enterYear)
                    console.log("this.info", this.info)
                })
            },
            find() {
                getIdentification({id: this.$route.params.id}, res => {
                    this.identification = res
                    if (this.identification.images) {
                        this.identification.images = this.identification.images.split(',')
                    }
                })
            },
            handleEdit() {
                this.editVisible = true
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
            getTimeDiff(dateString) {
                // 将字符串时间转换为Date对象
                let targetDate = new Date(dateString);

                // 获取目标时间和当前时间的时间戳
                let targetTime = targetDate.getTime();
                let currentTime = new Date().getTime();

                // 计算两个时间戳之间的差值（单位：毫秒）
                let timeDiff = currentTime - targetTime;

                // 将差值转换为所需的时间单位
                let seconds = Math.floor(timeDiff / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                let days = Math.floor(hours / 24);
                let year = Math.floor(days/365)
                // 返回时间差结果
                return year;
            }

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
        .title {
            font-size: 14px;
            color: #303133;
            font-weight: 700;
            margin-bottom: 20px
        }
    }
    /deep/ .el-descriptions-item__container {
        display: -webkit-box;
        height: 40px;
        font-size: 14px;
    }
</style>