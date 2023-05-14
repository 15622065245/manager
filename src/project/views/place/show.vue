<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>作品基本信息</span>
            </div>
            <div style="display: flex;justify-content: space-around;margin-top: 30px">
                <div style="margin-left: 80px">
                    <el-descriptions :column="2">
                        <el-descriptions-item label="作品标题">实拍韩风2023新款韩版吊带内穿</el-descriptions-item>
                        <el-descriptions-item label="ID">001</el-descriptions-item>
                        <el-descriptions-item label="包时">99</el-descriptions-item>
                        <el-descriptions-item label="所属用户">小徐小徐是条咸鱼</el-descriptions-item>
                        <el-descriptions-item label="包天">{{'199'}}</el-descriptions-item>
                        <el-descriptions-item label="主页名称">{{'我是场地'}}</el-descriptions-item>
                        <el-descriptions-item label="衣品">{{'小清新'}}</el-descriptions-item>
                        <el-descriptions-item label="启用状态">
                            <el-switch
                                    v-model="value"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-descriptions-item>
                        <el-descriptions-item label="上/下架时间">{{'2022-1-18 15:00'}}</el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin: 5px 0">
            <div slot="header" class="clearfix">
                <span>作品图片</span>
            </div>
            <div style="padding-left: 30px">
                <div class="work-info">
                    <el-image v-for="(item,index) in imageList" :key="index"
                              style="width: 184px;height: 184px;margin: 0 5px 0 20px"
                              :src="item.url"
                              fit="fill"></el-image>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin: 5px 0">
            <div slot="header" class="clearfix">
                <span>作品图片</span>
            </div>
            <div style="margin: 30px 0 0 20px">
                <div style="display: flex">
                    <div style="margin-right: 15px; width: 70px">视频封面</div>
                    <el-image
                            style="width: 184px;height: 184px"
                            :src="url"
                            fit="fill"></el-image>
                </div>
                <div style="display: flex;margin-top: 20px">
                    <div style="margin-right: 15px;width: 70px;">视频</div>
                    <video controls src="https://cdn.modao.cc/Default_video.mp4"
                           style="width: 320px;height: 180px"></video>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" style="margin: 5px 0">
            <div slot="header" class="clearfix">
                <span>图文详情</span>
            </div>
            <div style="display: flex;flex-direction:column;justify-content: center;align-items: center">
                <div class="scroll-view">
                    <img v-for="image in imageList" :src="image.url"/>
                </div>
                <el-button size="small" style="margin-top: 10px;background-color: #ff1919;border: none">删除</el-button>
            </div>
        </el-card>


    </div>
</template>

<script>
    export default {
        name: "create",
        data() {
            return {
                value: "",
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                imageList: [{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }, {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }, {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }, {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }, {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }]
            }
        },
        methods: {}
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