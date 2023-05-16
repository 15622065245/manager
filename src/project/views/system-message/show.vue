<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>APP推送</span>
            </div>
            <div style="margin: 5px 50px 0 50px;">
                <div  style="line-height: 30px">
                    <span style="display: flex;justify-content: center;margin-bottom: 20px">欢迎您成为紫鲸互联集团客户 (这是消息标题)</span>
                    <p>紫鲸互联集团平台是一个信息分享、传播及获取的平台，用户通过知乎发表的信息为公开的信息，其他第三方均可以通过紫鲸互联集团获取用户发表的信息，
                        用户对任何信息的发表即认可该信息为公开的信息，并单独对此行为承担法律责任;任何用户不愿被其他第三人获知的信息都不应该在紫鲸互联集团平台上进行发表。
                        用户承诺不得以任何方式利用紫鲸互联集团百接或间接从事违反中国法律以及社会公德的行为，紫鲸互联集团有权对违反上述承诺的内容予以删除。
                        用户不得利用紫鲸互联集团服务制作、上载、复制、发布、传播或者转戟如下内容:</p>
                    <p>Lorem ipsum dolor sit amet.consectetur adipiscine elit, Aenean euismod bibendum laoret. Proin eravida dolor sit amet lacus acumsan et vivera justocommodo.
                        Proin sodales pulvinar tempor. Cum socis natoque penatbus et maenis dis parturient montes, nasctur ridiculus mus. Mam fermentum, nula luctuspharetra vulputate,
                        felis tellus mollis orci, sed rhoncus sapien nunc eget.
                        </p>
                    <p>(这是消息详情)</p>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>推送用户</span>
            </div>
            <div style="margin: 5px 0 0 50px;">
                <div>
                    <span class="labelText" style="margin-right: 10px">手机号</span>
                    <el-input placeholder="请输入" style="margin-right: 20px"></el-input>
                    <el-button class="find btn" size="small">查询</el-button>
                </div>
                <div style="margin-top: 30px">
                    <el-button class="btn addButton" size="small" @click="addHandle">添加推送用户</el-button>
                    <el-button class="btn addButton" size="small" @click="addHandle">取消</el-button>
                </div>
                <div style="margin-top: 30px">
                    <el-table
                            stripe
                            :data="tableData"
                            :header-cell-style="{background:'#f2f2f2'}"
                            style="width: 70%">
                        <el-table-column
                                prop="code"
                                label="昵称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="手机号"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="datetime"
                                align="center"
                                label="推送时间">
                        </el-table-column>
                        <el-table-column
                                prop="option"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" class="optionButton" @click="cancelHandle">取消</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div>
                    <el-button @click="goBack" size="small" style="float: right;margin: 40px 0">返回上一页</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "show",
        props: ['userList'],
        data() {
            const item = {
                code: "001",
                datetime: '2016-05-02 12:00:00',
                title: '王小虎',
                name: '交易板块'
            }
            return {
                tableData: new Array(3).fill(item),
                value: "",
            }
        },
        mounted() {
            console.log("userList", this.userList)
        },
        methods: {
            goBack() {
                this.$router.back()
            },
            addHandle() {

            },
            cancelHandle() {

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