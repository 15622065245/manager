<template>
    <div>
        <el-input placeholder="请输入目录名称" class="search" v-model="filterText">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-tree
                v-if="defaultTree"
                class="filter-tree"
                :filter-node-method="filterNode"
                ref="tree"
                node-key="id"
                default-expand-all
                :data="list"
                :props="{
                        children: childrenName,
                        label: labelName
                    }"
                @node-click="handleNodeClick"
                highlight-current
                :current-node-key="defaultTree"
            >
        </el-tree>
    </div>

</template>

<script>
    export default {
        name: "tree-nav",
        props:{
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
            currentId:{
                type: String,
                default:''
            },
        },
        data() {
            return {
                filterText: "",
                defaultTree:"",
                timer:null,
            };
        },
        methods: {
            handleNodeClick(item) {
                if(this.timer) return;
                this.timer = setTimeout(()=>{
                    this.timer=null;
                },500);
                // emit 给父组件
                this.$emit('send-node-id',item.id);

            },
            // 原函数不能返回子节点,重写
            filterNode(value, data, node) {
                if (!value) return true;
                let _array = []; //这里使用数组存储 只是为了存储值。
                this.getReturnNode(node, _array, value);
                let result = false;
                _array.forEach(item => {
                    result = result || item;
                });
                return result;
            },
            getReturnNode(node, _array, value) {
                let isPass =
                    node.data &&
                    node.data[this.labelName] &&
                    node.data[this.labelName].indexOf(value) !== -1;
                isPass ? _array.push(isPass) : "";
                if (!isPass && node.level !== 1 && node.parent) {
                    this.getReturnNode(node.parent, _array, value);
                }
            },
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            // 判断当前哪个目录高亮
            list:{
                immediate:true,
                deep:true,
                handler(val) {
                    // 如果目录不为空
                    // console.log(val)
                    if (val.length!==0){
                       if (this.currentId===''){
                           // 如果第一层目录存在子目录
                           if (val[0].children&&val[0].children.length!==0){
                               // 都用第一层测试
                               // this.defaultTree = val[0].children[0].id
                               this.defaultTree = val[0].id
                           } else {
                               this.defaultTree = val[0].id
                           }
                       } else {
                           this.defaultTree = this.currentId
                       }
                       this.$nextTick(()=>{
                           this.$refs.tree.setCurrentKey(this.defaultTree);
                       });
                       this.$emit('send-node-id',this.defaultTree)
                    }
                }
            }
        },

    }
</script>

<style lang="less" scoped>
    .search {
        margin-bottom: 20px;
        width: 100%;
        min-width: 140px;
    }
    /deep/ .el-tree-node__label {
        font-size: 16px;
        color: #333333;
    }
    /deep/ .el-tree-node__content {
        padding: 8px 0;
    }
    /deep/ .el-tree-node:last-child {
        margin-bottom: 0px;
    }
</style>