<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>作品基本信息</span>
                    </div>
                    <div style="display: flex;justify-content: space-around;margin-top: 30px">
                        <div style="margin-left: 80px">
                            <el-descriptions :column="2">
                                <el-descriptions-item label="作品标题">
                                    {{info.title}}
                                </el-descriptions-item>
                                <el-descriptions-item label="ID">
                                    {{info.id}}
                                </el-descriptions-item>
                                <el-descriptions-item label="模特价格">
                                    {{info.price}}
                                </el-descriptions-item>
                                <el-descriptions-item label="所属用户">
                            <span v-if="info.user">
                                {{info.user.nickname}}
                            </span>
                                </el-descriptions-item>
                                <el-descriptions-item label="全包价格">
                                    {{info.amount}}
                                </el-descriptions-item>
                                <el-descriptions-item label="主页名称">
                            <span v-if="info.user">
                                {{info.user.homepageName}}
                            </span>
                                </el-descriptions-item>
                                <el-descriptions-item label="衣品">
                                    <span v-for="(item, index) in info.garmentProductsList">
                                        {{item.name}}
                                        <span v-if="index !== info.garmentProductsList.length - 1">、</span>
                                    </span>
                                </el-descriptions-item>
                                <el-descriptions-item label="启用状态">
                                    <el-switch
                                            v-model="info.enabled"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949">
                                    </el-switch>
                                </el-descriptions-item>
                                <el-descriptions-item label="风格">
                                    <span v-for="(item, index) in info.styleList">
                                        {{item.name}}
                                        <span v-if="index !== info.styleList.length - 1">、</span>
                                    </span>
                                </el-descriptions-item>
                                <el-descriptions-item label="上/下架时间">{{info.sellTime}}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card" style="margin: 5px 0">
                    <div slot="header" class="clearfix">
                        <span>作品图片</span>
                    </div>
                    <div style="padding-left: 30px">
                        <div class="work-info">
                            <el-image v-for="(item,index) in info.worksImages" :key="index"
                                      style="width: 184px;height: 184px;margin: 0 5px 0 20px"
                                      :src="`${$store.state.prefix}${item}`"
                                      fit="fill"></el-image>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card" style="margin: 5px 0">
                    <div slot="header" class="clearfix">
                        <span>作品图片</span>
                    </div>
                    <div style="margin: 30px 0 0 20px">
                        <div style="display: flex">
                            <div style="margin-right: 15px; width: 70px">视频封面:</div>
                            <el-image
                                    v-if="info.videoCover"
                                    style="width: 184px;height: 184px"
                                    :src="`${$store.state.prefix}${info.videoCover}`"
                                    fit="fill"></el-image>
                        </div>
                        <div style="display: flex;margin-top: 20px">
                            <div style="margin-right: 15px;width: 70px;">视频:</div>
                            <video v-if="info.video" controls :src="`${$store.state.prefix}${info.video}`"
                                   style="width: 320px;height: 180px"></video>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card" style="margin: 5px 0">
                    <div slot="header" class="clearfix">
                        <span>图文详情</span>
                    </div>
                    <div style="display: flex;flex-direction:column;justify-content: center;align-items: center">
                        <div class="scroll-view">
                            <img v-for="image in info.contentImages" :src="`${$store.state.prefix}${image}`"/>
                        </div>
                        <el-button v-if="!info.sellable" size="small" style="margin-top: 10px;background-color: #ff1919;border: none">删除</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>






    </div>
</template>

<script>
    import { get } from "../../service/model";

    export default {
        name: "create",
        data() {
            return {
                value: "",
                info:{}
            }
        },
        created() {
            this.find()
        },
        methods: {
            find() {
                get({id: this.$route.params.id}, res => {
                    this.info = res
                    console.log(res)
                    if (this.info.worksImages) {
                        this.info.worksImages = this.info.worksImages.split(',')
                    }
                    if (this.info.contentImages) {
                        this.info.contentImages = this.info.contentImages.split(',')
                    }
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

    .scroll-view {
        height: 800px; /* 设置视窗高度 */
        overflow-y: scroll; /* 允许滚动 */
    }

    .scroll-view::-webkit-scrollbar {
        width: 4px;
        background-color: white;
    }

    /*!* 滚动条滑块 *!*/
    .scroll-view::-webkit-scrollbar-thumb {
        background-color: #d2d2d8;
    }

    img {
        display: block; /* 确保图像不会重叠 */
        width: 500px; /* 图像占滚动视窗的宽度 */
        height: 620px; /* 图像高度根据宽度自适应 */
    }

    /deep/ .el-descriptions-item__container {
        display: -webkit-box;
        height: 40px;
        font-size: 14px;
    }
</style>