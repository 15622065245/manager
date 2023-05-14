<template>
        <el-aside
                width="200px"
                :style="{
              position: 'fixed',
              height: 'calc(100vh)',
              left: 0,
              overflow: 'auto',
              background: 'rgb(20, 31, 41)',
              boxSizing: 'border-box'
            }"
                class="aside"
        >
            <div class="sider-logo" style="padding-top: 20px;position: fixed;left: 0; top: 0;z-index: 1000;background-color: #141f29;color: white">
                <div>拍图网管理后台</div>
            </div>

            <el-menu
                    style="padding-top: 80px"
                    :default-active="activeRoute"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#141f29"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router>
                <el-submenu :index="String(item.id)" v-for="(item, index) in menuData">
                    <template slot="title">
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="String(item2.path)" v-for="(item2, index) in item.children">
                            {{item2.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

</template>

<script>
    export default {
        name: "layout-left",
        data() {
            return {
                activeRoute:"",
                menuData: []
            }
        },
        created() {

          this.getMenuList()
            console.log(this.menuData.length)
        },
        methods: {
            getMenuList() {
                if (localStorage.getItem("menuList")) {
                    this.menuData = JSON.parse(localStorage.getItem('menuList'))
                    console.log("this.menuData", this.menuData)
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        watch: {
            $route:{
                immediate:true,
                handler(val) {
                   this.activeRoute = val.path
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .sider-logo {
        width: 200px;
        height: 50px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;

    }
     .el-menu-vertical-demo {
        overflow-y: unset;
    }
    .el-menu {
        border: none;
    }
    .el-aside::-webkit-scrollbar {
        display: none;
    }




</style>