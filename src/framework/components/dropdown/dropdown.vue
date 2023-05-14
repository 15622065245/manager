<template>
  <el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
    <el-button icon="el-icon-menu" class="more-btn">
      {{$t('project.更多操作')}}
      <i class="el-icon-caret-bottom" ref="rotate"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown" :class="{ en: isEnglish }">
      <el-dropdown-item
        v-for="(item, index) in dropdownItems"
        :key="index"
        :icon="item.icon"
        :command="item.action"
        :style="disabledCondition(item)?{'color':'rgba(255,255,255,0.4)'}:''"
        :disabled="disabledCondition(item)"
        >{{ $t(item.action) }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    dropdownItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isEnglish() {
      return this.$store.state.language === 'en'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick(command) {
      switch (command) {
        case '编辑':
          this.$emit('handleEdit', this.selectList[0].id)
          break
        case this.$t(`project.启用`):
          this.$emit('handleBatchEnable')
          break
        case '上架':
          this.$emit('handleBatchEnable')
          break
        case this.$t(`project.禁用`):
          this.$emit('handleBatchDisable')
          break
        case '下架':
          this.$emit('handleBatchDisable')
          break
        case this.$t(`project.删除`):
          this.$emit('handleBatchDelete')
          break
        case '审核':
          this.$emit('handleBatchCheck')
          break
        case '封禁会员':
          this.$emit('handleBatchBan')
          break
        case '解除封禁':
          this.$emit('handleBatchUnBan')
          break
      }
    },
    disabledCondition(item) {
      if (item.action === this.$t(`project.启用`)) {
        if (!item.key) item.key = 'enabled'
        return this.selectList.some(i => i[item.key]) || this.selectList.length == 0
      } else if (item.action === this.$t(`project.禁用`)) {
        if (!item.key) item.key = 'enabled'
        return this.selectList.some(i => !i[item.key]) || this.selectList.length == 0
      } else if (item.action === '上架') {
        if (!item.key) item.key = 'sellable'
        return this.selectList.some(i => i[item.key])
      } else if (item.action === '下架') {
        if (!item.key) item.key = 'sellable'
        return this.selectList.some(i => !i[item.key])
      } else if (item.action === '编辑') {
        return this.selectList.length != 1
      } else if (item.action === this.$t(`project.删除`)) {
        return this.selectList.length === 0
      } else if (item.action === '审核') {
        return this.selectList.some(i => i[item.key] === '已处理') || this.selectList.length == 0
      } else if (item.action === '封禁会员') {
        return this.selectList.some(i => i[item.key] === '会员封禁中') || this.selectList.length == 0
      } else if (item.action === '解除封禁') {
        return this.selectList.some(i => i[item.key] !== '会员封禁中') || this.selectList.length == 0
      }
    },
    onMenuChange(val) {
      if (val) {
        this.$refs.rotate.style.transform = 'rotate(180deg)'
      } else {
        this.$refs.rotate.style.transform = 'rotate(0deg)'
      }
    }
  }
}
</script>

<style lang="less">
.el-dropdown-menu {
  /deep/ .el-dropdown-menu__item {
    &.is-disabled {
      color: rgba(255, 255, 255, 0.4);
      cursor: not-allowed;
    }
  }
  &.en {
    width: 120px !important;
  }
}
/**
  更多操作下拉箭头动画
 */
.el-icon-caret-bottom {
  transition: all 0.3s ease;
}
</style>
