<template>
    <div>
        <el-row>
            <el-col v-if="info.identity === 'pending'" :span="24">
                <!--未认证-->
                <el-card  class="box-card">
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
            </el-col>
            <el-col v-else :span="24">
                <Tabs></Tabs>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    import Tabs from "./tabs";
    import {get} from "../../service/user";
    import { getIdentification, passIdentification } from "../../service/identity";

    export default {
        name: "show",
        components:{
            Tabs
        },
        data() {
            return {
                info: {},
            }
        },
        mounted() {
          if (this.$route.params.active) {
              this.activeName = "second"
          }
            this.getData()
        },
        methods: {
            getData() {
                get({id: this.$route.params.id}, res => {
                    this.info = res
                    this.enterYear = this.getTimeDiff(this.info.creationTime)
                })
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