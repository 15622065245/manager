<template>
  <div class="preview">
    <el-dialog
      title="查看图片"
      :visible.sync="imgVisible"
      :append-to-body="true"
      width="50%"
      :before-close="handleClose"
    >
      <img :src="`${$store.state.prefix}${imgUrl}`" alt width="100%" v-if="isPrefix" />
      <img :src="`${imgUrl}`" alt width="100%" v-else />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'previewImg',
  props: {
    imgVisible: {
      type: Boolean,
      default() {
        return false
      },
    },
    imgUrl: {
      type: String,
      default() {
        return ''
      },
    },
    isPrefix: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('on-preview-cancel')
    },
  },
}
</script>

<style lang="less" scoped>
.preview/deep/.el-dialog__body {
  max-height: 100vh !important;
  overflow: auto;
}
</style>
