<template>
    <div>
        <!--未认证-->
        <el-card v-if="false" class="box-card">
            <div slot="header" class="clearfix">
                <span>用户基本信息</span>
            </div>
            <div style="display: flex;justify-content: space-around;margin-top: 30px">
                <div>
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            fit="fill"></el-image>
                </div>
                <div style="margin-left: 80px">
                    <el-descriptions :column="3">
                        <el-descriptions-item label="ID">{{info.id.toString()}}</el-descriptions-item>
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
        <!--已认证-->
        <el-tabs v-else v-model="activeName">
            <el-tab-pane label="用户详情" name="first">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>用户基本信息</span>
                    </div>
                    <div style="display: flex;justify-content: space-around;margin-top: 30px">
                        <div>
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="url"
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
                        <el-button size="small" style="float: right">编辑</el-button>
                    </div>
                    <div style="display: flex;justify-content: space-around;margin-top: 30px">
                        <div style="margin-left: 80px">
                            <div>
                                <span>主页标签</span>
                                <el-tag style="margin-left: 5px" type="danger" size="small">入驻3年</el-tag>
                            </div>
                            <div style="margin: 10px 0 30px">
                                <p style="margin-bottom: 5px">主页封面</p>
                                <el-image
                                        style="width: 320px;height: 150px"
                                        :src="info.image"
                                        fit="fill"></el-image>
                            </div>
                            <el-descriptions v-if="true" :column="2">
                                <el-descriptions-item label="主页名称">{{info.homepageName}}</el-descriptions-item>
                                <el-descriptions-item label="身高">{{info.height}}</el-descriptions-item>
                                <el-descriptions-item label="手机号">{{info.contractPhone}}</el-descriptions-item>
                                <el-descriptions-item label="体重">{{info.weight}}</el-descriptions-item>
                                <el-descriptions-item label="微信号">{{info.wechatNumber}}</el-descriptions-item>
                                <el-descriptions-item label="三维">{{info.threeDimensional}}</el-descriptions-item>
                                <el-descriptions-item label="QQ号">{{info.qqNmuber}}</el-descriptions-item>
                                <el-descriptions-item label="鞋码">{{info.shoeSiz}}</el-descriptions-item>
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
                                    <el-descriptions-item v-if="true" label="单模价格">99.99</el-descriptions-item>
                                    <el-descriptions-item v-if="false" label="摄影价格价格">99.99</el-descriptions-item>
                                    <el-descriptions-item v-if="true" label="全包价格">199.99</el-descriptions-item>
                                    <el-descriptions-item v-if="false" label="包时">99.99</el-descriptions-item>
                                    <el-descriptions-item v-if="false" label="包天">199.99</el-descriptions-item>
                                    <el-descriptions-item label="性别">{{identification.gender}}</el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="idCard">
                                <div class="title">身份证正反面</div>
                                <el-image
                                        class="idCard-image"
                                        style="margin-bottom: 20px"
                                        :src="url"
                                        fit="fill"></el-image>
                                <el-image
                                        class="idCard-image"
                                        :src="url"
                                        fit="fill"></el-image>
                            </div>
                        </div>
                        <div class="work-info">
                            <p class="title">作品信息</p>
                            <div>
                                <el-image v-for="(item,index) in imageList" :key="index"
                                          style="width: 184px;height: 184px;margin: 0 5px 0 20px"
                                          :src="item.url"
                                          fit="fill"></el-image>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="作品列表" name="second">
                <modelList v-if="true"></modelList>
                <cameraman v-if="false"></cameraman>
                <place v-if="false"></place>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import modelList from "./components/model/list";
    import cameraman from "./components/cameraman/list";
    import place from "./components/place/list";
    import {get} from "../../service/user";
    import {getIdentification} from "../../service/identity";

    export default {
        name: "create",
        components:{
            modelList,
            cameraman,
            place
        },
        data() {
            return {
                activeName: 'first',
                value: "",
                info: {},
                identification:{},
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                imageList: [{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }]
            }
        },
        created() {
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
                    console.log("this.info", this.info)
                })
                getIdentification({id: this.$route.params.id}, res => {
                    this.identification = res
                    console.log("identification", this.identification)
                })
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