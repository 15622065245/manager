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
                        :default-checked-keys="checkedKeys"
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
    import { findByAccountTypeAndClient, findByRoleAndClient } from "../../service/module"
    import { updateModule } from "../../service/role";

    export default {
        name: "create",
        data() {
                return {
                    form: {},
                    data: [],
                    defaultProps: {
                        children: 'children',
                        label: 'name'
                    },
                    checkedKeys: [],
                    parentIdArr: []
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            roleId: {
                type: String
            }
        },
        watch:{
          dialogVisible(val) {
              if (val) {
                  this.find()
              }
          }
        },
        methods: {
            find() {
                findByAccountTypeAndClient({accountType: 'MANAGER', client: 'MANAGER_WEB'}, res => {
                    res.forEach(item => {
                        this.parentIdArr.push(item.id);
                    })
                    this.data = res
                    this.findByRoleId()
                    console.log("Res列表", res)
                })

            },
            findByRoleId() {
                let param = {
                    role: {
                        id: this.roleId
                    },
                    client: "MANAGER_WEB"
                }
                findByRoleAndClient(param, res => {
                    console.log("我的模块", res)
                    console.log(this.parentIdArr)
                    let arr = res.filter(item => {
                        //如果勾选到父节点，则会全部回显它的子节点，所以要排除
                        return !this.parentIdArr.includes(item.id)
                        // return item.id.toString()
                    })
                    console.log("arr",arr)
                    this.checkedKeys = arr.map(val => val.id.toString())
                    console.log("this.checkedKeys", this.checkedKeys)
                })
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handleClose() {
                this.$emit('on-dialog-close')
            },
            handleConfirm() {
                let list = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes())
                let idList = []
                list.forEach(item => {
                    idList.push({id: item.id.toString()})
                })
                let param = {
                    role: {
                        id: this.roleId
                    },
                    moduleList: idList
                }
                updateModule(param, res => {
                    if (res === 204) {
                        this.$message.success("权限设置成功！")
                        this.$emit("on-dialog-close")
                    }
                })
                console.log("list", list)
                console.log("idList", idList)
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