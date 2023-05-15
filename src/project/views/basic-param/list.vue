<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>平台参数设置</span>
        </div>
        <div>
            <el-form label-position="left" label-width="150px" :model="formLabelAlign">
                <el-form-item label="平台联系电话">
                    <span>{{formLabelAlign.PlatformPhone}}</span>
                    <i @click="editHandle('PlatformPhone')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="作品上架上限数量">
                    <span>{{formLabelAlign.WorkLimit}}</span>
                    <i @click="editHandle('WorkLimit')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="作品自动下架时间">
                    <span>{{formLabelAlign.WorkDisableDay}}</span>
                    <i @click="editHandle('WorkDisableDay')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="平台客服微信">
                    <span>{{formLabelAlign.PlatformWechat}}</span>
                    <i @click="editHandle('PlatformWechat')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="分享海报图">
                    <el-image
                            style="width: 291px; height: 503px"
                            :src="`${$store.state.prefix}${formLabelAlign.SharePoster}`"
                            fit="fill"></el-image>
                    <el-button @click="editPicture" size="small" style="float: right">编辑</el-button>
                </el-form-item>
            </el-form>
        </div>
        <Iedit :editType="type" :dialog-visible="editVisible" @on-dialog-close="handleClose" @onRefreshData="findData"></Iedit>
        <editPicture :dialog-visible="editPictureVisible" @on-dialog-close="handleClose"></editPicture>
    </el-card>
</template>

<script>
    import Iedit from './edit'
    import editPicture from './edit-picture'
    import { find } from "../../service/dictionary";

    export default {
        name: "list",
        components:{
            Iedit,
            editPicture
        },
        data() {
            return {
                formLabelAlign: {},
                editVisible: false,
                editPictureVisible: false,
                type: "",
            }
        },
        mounted() {
            this.findData()
        },
        methods:{
            findData() {
                find({}, res => {
                    const obj = res.reduce((acc, cur) => {
                        acc[cur.name] = cur.value;
                        return acc;
                    }, {});
                    this.formLabelAlign = obj
                })
            },
            editHandle(type) {
                console.log(type)
                this.type = type
              this.editVisible = true
            },
            handleClose() {
                this.editVisible = false
                this.editPictureVisible = false
            },
            editPicture() {
                this.editPictureVisible = true
            }
        }
    }
</script>

<style scoped>
.el-card {
    box-sizing: border-box;
}
</style>