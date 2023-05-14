<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>认证信息</span>
        </div>
        <div style="padding-left: 30px">
            <div class="basic-info">
                <div class="info">
                    <el-descriptions title="基本信息" :column="1">
                        <el-descriptions-item label="姓名">张小凡</el-descriptions-item>
                        <el-descriptions-item label="身份证号">4411111111111111111</el-descriptions-item>
                        <el-descriptions-item label="地址地区">广东天河</el-descriptions-item>
                        <el-descriptions-item label="单模价格">99.99</el-descriptions-item>
                        <el-descriptions-item label="全包价格">199.99</el-descriptions-item>
                        <el-descriptions-item label="性别">男</el-descriptions-item>
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
                <div style="height: 40px; margin-top: 40px">
                    <span>备注:</span>
                    <span>我的淘宝链接是： xxxxx</span>
                </div>
                <div v-if="false" style="height: 40px">
                    <span>审核状态:</span>
                    <span>待审核</span>
                    <div style="margin-top: 20px">
                        <el-button size="small">通过</el-button>
                        <el-button size="small" style="background-color: #ff1919;border: none">拒绝</el-button>
                    </div>
                </div>
                <div v-if="false" style="height: 40px">
                    <span>审核状态:</span>
                    <span>已通过</span>
                </div>
                <div v-if="true" style="height: 40px">
                    <span>审核状态:</span>
                    <span>已拒绝</span>
                    <div style="margin-top: 20px">
                        <span>拒绝理由:</span>
                        <span>XXXXX</span>
                    </div>
                </div>

            </div>
        </div>
    </el-card>
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