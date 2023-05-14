<template>
    <div>
        <el-select
                v-model="superior"
                placeholder="请选择上级目录"
                clearable
                @clear="handleClear"
                style="width: 95%"
        >
            <el-option :value="list" class="select-tree" >
                <el-tree
                        ref="tree"
                        :data="list"
                        :accordion="true"
                        node-key="id"
                        :default-expanded-keys="[defaultNode]"
                        highlight-current
                        check-on-click-node
                        :props="{
                              label: labelName,
                              children: childrenName
                            }"
                        @node-click="handleCheck"
                        :current-node-key="defaultTree"
                />
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "select-tree",
        props:{
            dialogVisible:{
                type:Boolean,
                default: false,
            },
            list:{
                type:Array,
                default: function () {
                    return []
                }
            },
            // 由于可能存在多个数据结果使用该结构，绑定的变量名不确定
            childrenName: {
                type: String,
                default:'children'
            },
            labelName:{
                type: String,
                default:'name'
            },
            // 接收编辑时tree的初始值
            parent:{
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                superior: "",
                // 默认展开的树节点
                defaultNode: '',
                defaultTree: '',
            };
        },
        methods: {
            // 点击下拉框的树节点
            handleCheck: function (val) {
                this.superior = val[this.labelName];
                this.$emit('send-select-value',val)

            },
            // 清空下拉框的内容
            handleClear: function (val) {
                this.superior = "";
                // 清空也要把结果提交给父组件
                this.$emit('send-select-value',val)
            },
        },
        watch:{
            list:{
                immediate:true,
                handler(val) {
                    if (val.length!==0) {
                        this.defaultNode = val[0].id
                    }
                }
            },
            parent:{
                immediate:true,
                handler(val) {
                    if (val.id) {
                        this.superior = val.name;
                        let id = val.id;
                        this.defaultTree = id;
                        this.defaultNode = id;
                        this.$nextTick(()=>{
                            this.$refs.tree.setCurrentKey(this.defaultTree);
                        });
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    //下拉框的树形结构
    .el-select-dropdown__item {
        line-height: 26px!important;
    }
    .select-tree {
        height: auto;
        max-height: 200px;
        overflow-y: auto;
        background-color: white;
        padding: 0;
    }
</style>