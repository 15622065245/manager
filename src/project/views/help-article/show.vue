<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>系统文章管理详情</span>
        </div>
        <div style="margin: 30px 0 0 50px;height: 78vh">
            <div>
                <div class="box-describe">
                    <span>标题：</span>
                    <span style="font-size: 14px">{{info.title}}</span>
                </div>
                <div class="box-describe">
                    <span>图文详情：</span>
                    <div style="width: 800px;font-size: 14px;margin-top: 20px">
                        {{info.content}}
                    </div>
                </div>
            </div>
            <div style="width: 50%">
                <el-button @click="goBack" size="small" style="float: right">返回上一页</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
    import { get } from "../../service/system-article";


    export default {
        name: "show",
        data() {
            return {
                value: "",
                info: {}
            }
        },
        created() {
            console.log(this.$route.params)
            this.getData()
        },
        methods: {
            getData() {
                get({id: this.$route.params.id}, res => {
                    this.info = res
                    console.log("reeee", res)
                })
            },
            goBack() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>
    .box-describe {
        margin-bottom: 50px;
    }
    /deep/ .el-descriptions-item__container {
        display: -webkit-box;
        height: 40px;
        font-size: 14px;
    }
</style>