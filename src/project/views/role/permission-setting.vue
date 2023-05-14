<template>
    <div>
        <el-dialog
                title="角色设置"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="50%"
                :before-close="handleClose"
                v-dialogDrag
                :close-on-click-modal="false"
        >
            <el-form ref="form" :model="form" label-width="100px">
                <el-tree
                        :data="data"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                </el-tree>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button class="theme" size="small" @click="handleConfirm('formValidate')">提交</el-button>
                <el-button size="small" @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "create",
        data() {
                return {
                    form: {
                        name: "",
                        superior: "",
                        desc: "",
                    },
                    data: [{
                        id: 1,
                        label: '系统管理',
                        children: [{
                            id: 8,
                            label: '管理员管理'
                        }, {
                            id: 9,
                            label: '角色权限'
                        }, {
                            id: 10,
                            label: '基本参数'
                        }]
                    }, {
                        id: 2,
                        label: '用户管理',
                        children: [{
                            id: 11,
                            label: '用户列表'
                        }, {
                            id: 12,
                            label: '身份认证列表'
                        }]
                    }, {
                        id: 3,
                        label: '作品管理',
                        children: [{
                            id: 13,
                            label: '模特作品列表'
                        }, {
                            id: 14,
                            label: '摄影师作品列表'
                        }, {
                            id: 15,
                            label: '场地作品列表'
                        }, {
                            id: 16,
                            label: '模特作品审核列表'
                        }, {
                            id: 17,
                            label: '摄影师作品审核列表'
                        }, {
                            id: 18,
                            label: '场地作品审核列表'
                        }]
                    },{
                        id: 4,
                        label: '作品属性管理',
                        children: [{
                            id: 19,
                            label: '作品风格管理'
                        }, {
                            id: 20,
                            label: '作品衣品管理'
                        }]
                    },{
                        id: 5,
                        label: '内容管理',
                        children: [{
                            id: 21,
                            label: '系统文章管理'
                        }, {
                            id: 22,
                            label: '帮助文章管理'
                        }]
                    },{
                        id: 6,
                        label: '广告管理',
                        children: [{
                            id: 23,
                            label: 'banner广告管理'
                        }, {
                            id: 24,
                            label: '启动页广告管理'
                        }]
                    },{
                        id: 7,
                        label: '互动管理',
                        children: [{
                            id: 25,
                            label: '意见反馈'
                        }, {
                            id: 26,
                            label: '客服留言'
                        }, {
                            id: 27,
                            label: '举报列表'
                        }]
                    },],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    }
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{name: 'region1'}, {name: 'region2'}]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 500);
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {

            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            addLabelHandleClose() {
                this.addDialogVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .dialog-footer {
        .theme {
            margin-left: 30px;
        }
    }

    /deep/ .el-dialog {
        border-radius: 10px;

        .el-dialog__header {
            font-weight: 600;
            border-bottom: 1px solid #e4e4e4;
        }

        .el-form-item {
            margin-top: 15px;
        }

        .el-form-item:first-child {
            margin-top: 0px;
        }

        .el-dialog__footer {
            margin-top: 40px;
        }
    }

    /deep/ .el-select > .el-input {
        width: 90%;
    }

    /deep/ .el-textarea .el-input__count {
        position: absolute;
        bottom: -40px;
        right: 0px;
    }
</style>