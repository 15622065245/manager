<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>平台参数设置</span>
        </div>
        <div>
            <el-form label-position="left" label-width="150px" :model="formLabelAlign">
                <el-form-item label="平台联系电话">
                    <span>{{formLabelAlign.phone}}</span>
                    <i @click="editHandle('phone')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="作品上架上限数量">
                    <span>{{formLabelAlign.number}}</span>
                    <i @click="editHandle('number')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="作品自动下架时间">
                    <span>{{formLabelAlign.time}}</span>
                    <i @click="editHandle('time')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="平台客服微信">
                    <span>{{formLabelAlign.WeChat}}</span>
                    <i @click="editHandle('WeChat')" class="el-icon-edit" style="margin-left: 10px"></i>
                </el-form-item>
                <el-form-item label="分享海报图">
                    <el-image
                            style="width: 291px; height: 503px"
                            src="../../../../static/images/haibao.jpg"
                            fit="fill"></el-image>
                    <el-button @click="editPicture" size="small" style="float: right">编辑</el-button>
                </el-form-item>
            </el-form>
        </div>
        <Iedit :editType="type" :dialog-visible="editVisible" @on-dialog-close="handleClose"></Iedit>
        <editPicture :dialog-visible="editPictureVisible" @on-dialog-close="handleClose"></editPicture>
    </el-card>
</template>

<script>
    import Iedit from './edit'
    import editPicture from './edit-picture'
    export default {
        name: "list",
        components:{
            Iedit,
            editPicture
        },
        data() {
            return {
                formLabelAlign: {
                    phone: '1380013800',
                    number: '200个',
                    time: '180天',
                    WeChat: "WX0001"
                },
                editVisible: false,
                editPictureVisible: false,
                type: "",
            }
        },
        methods:{
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