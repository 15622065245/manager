<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/framework/layout';

  export default {
    name: 'App',
    components: {
      Layout
    },
    mounted() {
      // this.$store.dispatch('getCatalogueList')
    }
  }
</script>

<style lang="less">
  @import "./framework/style/dialog.less";
  @import "./framework/style/table.less";
  @import "./framework/style/layoutLeft.less";
  @import "./framework/style/descriptions.less";
  @import "./framework/style/transition.css";
  @import "./framework/style/button.less";
  @import "./framework/style/card.less";
  @import "./framework/style/form";
  @import "./framework/style/tabs";
  @import "./framework/style/step";
  @import "./project/styles/style";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    border: 1px solid #e4e4e4;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ffffff;
    color: #000000;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #000000;
  }

</style>
