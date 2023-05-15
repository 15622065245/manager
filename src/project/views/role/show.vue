<template>
    <div>
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
        <el-button @click="handleConfirm" size="small" style="margin: 20px 0 0 20px">保存</el-button>
    </div>
</template>

<script>
    import { findByAccountTypeAndClient, findByRoleAndClient } from "../../service/module"
    import { updateModule } from "../../service/role";

    export default {
        name: "show",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkedKeys: [],
                parentIdArr: []
            }
        },
        created() {
          this.find()
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
                        id: this.$route.params.id
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
                if (list.length === 0) {
                    this.$alert('请先选择一条数据')
                    return false
                }
                let idList = []
                list.forEach(item => {
                    idList.push({id: item.id.toString()})
                })
                let param = {
                    role: {
                        id: this.$route.params.id
                    },
                    moduleList: idList
                }
                updateModule(param, res => {
                    if (res === 204) {
                        this.$message.success("权限设置成功！")
                        this.$router.back()
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

</style>