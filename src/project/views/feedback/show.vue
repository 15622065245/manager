<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>意见反馈详情</span>
            </div>
            <div style="display: flex;justify-content: start;margin-top: 30px">
                <div style="margin-left: 50px">
                    <el-form label-width="80px" style="color: #101010">
                        <el-form-item label="用户ID:">
                            <span>001</span>
                        </el-form-item>
                        <el-form-item label="昵称:">
                            <span>张飞</span>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <span>18307681234</span>
                        </el-form-item>
                        <el-form-item label="状态:">
                            <span>已处理</span>
                        </el-form-item>
                        <el-form-item label="反馈时间:">
                            <span>2022-01-18 15:00</span>
                        </el-form-item>
                        <el-form-item label="反馈内容:">
                            <span>您好，能咨询下商务合作吗? 有个bug我觉得你们需要修复....</span>
                        </el-form-item>
                        <el-form-item label="反馈图片:">
                            <el-image
                                    style="width: 200px; height: 100px"
                                    :src="url"
                                    fit="fill"></el-image>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-button @click="goBack" size="small" style="margin: 30px 0 0 30px">返回上一页</el-button>
                    </div>
                </div>

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

            }
        },
        methods: {
            goBack() {
                this.$router.back()
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
        /*height: 40px;*/
        font-size: 14px;
    }
</style>