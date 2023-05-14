<template>
  <el-container>
    <el-aside width="200px" v-if="this.$route.meta.isShowLeftSider">
      <LayoutLeft></LayoutLeft>
    </el-aside>
    <el-container>
      <el-header  v-show="this.$route.meta.isShowHeader" >
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main style="padding: 0 20px">
        <transition name="fade-transform">
          <keep-alive>
            <router-view
                    v-if="this.$route.meta.keepAlive"
                    :style="{
						zIndex: 100,
						height: viewHeight + 'px',
						backgroundColor: 'rgba(255, 255, 255, 1)',
					}"
            ></router-view>
          </keep-alive>
        </transition>
        <transition name="fade-transform">
          <router-view
                  v-if="!this.$route.meta.keepAlive"
                  :style="{
						zIndex: 100,
						height: viewHeight + 'px',
						backgroundColor: 'rgba(255, 255, 255, 1)',
					}"
          ></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LayoutLeft from "./layout-left.vue";
  import LayoutHeader from "./layout-header.vue";

  export default {
    name: "layout",
    components:{
      LayoutHeader,LayoutLeft
    },
    data(){
      return{
        LayoutHeaderHeight: 50, // 50
        layoutMarginLeft: 200,
        viewWidth: 0,
        viewHeight: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        loading:true,
      }
    },
    created() {

      // watch window size change
      window.addEventListener(
              "resize",
              () => {
                this.windowWidth = window.innerWidth;
                this.windowHeight = window.innerHeight;
              },
              false
      );
      this.computedStyle();
    },

    watch: {
      windowWidth(val) {
        this.computedStyle();
      },
      windowHeight(val) {
        this.computedStyle();
      },
      route(val) {
        this.computedStyle();
      }
    },
    methods: {
      computedStyle() {
        let route = this.route;
        let meta = route.meta;
        let windowWidth = this.windowWidth;
        let windowHeight = this.windowHeight;
        if (meta.isShowLeftSider) {
          this.layoutMarginLeft = 200;
          this.viewWidth = windowWidth - this.layoutMarginLeft;
        } else {
          this.layoutMarginLeft = 0;
          this.viewWidth = windowWidth;
        }
        if (meta.isShowHeader) {
          // iview fix header heiget 64px
          this.LayoutHeaderHeight = 60;
          this.viewHeight = windowHeight - this.LayoutHeaderHeight;
        } else {
          this.LayoutHeaderHeight = 0;
          this.viewHeight = windowHeight;
        }
      },
      handleRefresh() {
        window.location.reload();
      },
    },
    computed: {
      path() {
        return this.$route.path;
      },
      route() {
        return this.$route;
      },
      user() {
        return this.$store.state.user;
      }
    }
  }
</script>

<style scoped>
 * {
   padding: 0;
   margin: 0;
 }
  /*/deep/ .el-main {*/
  /*  overflow: unset;*/
  /*}*/
</style>
