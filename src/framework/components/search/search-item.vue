<template>
  <div class="search-item">
    <div class="label">{{ $t(item.name) }}</div>
    <div class="content" v-if="item.type === 'string'">
      <el-input
        v-model="value"
        :clearable="true"
        :placeholder="$t('请输入')"
        @change="onChange"
      ></el-input>
    </div>
    <div class="content" v-if="item.type === 'select'">
      <el-select
        v-model="value"
        :placeholder="$t(item.name)"
        @change="onChange"
        @focus="onFocus"
        :loading="loading"
        :loading-text="$t('search.加载中')+'...'"
        :clearable="true"
        style="width: 200px"
      >
        <el-option :value="-1" label="全部"></el-option>
        <el-option v-for="(d, i) in item.displayValue" :value="i" :key="i" :label="$t(d)">{{ $t(d) }}</el-option>
      </el-select>
    </div>
    <div class="content" v-if="item.type === 'datetime'">
      <el-date-picker
        v-model="value"
        type="datetime"
        @change="onChange"
        style="width: 200px"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        :placeholder="$t(item.name)"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'dateMinute'">
      <el-date-picker
        v-model="value"
        type="datetime"
        @change="onChange"
        style="width: 200px"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm:ss"
        :placeholder="$t(item.name)"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'date'">
      <el-date-picker
        v-model="value"
        @change="onChange"
        format="yyyy-MM-dd"
        type="date"
        :placeholder="$t(item.name)"
        style="width:200px"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'daterange'">
      <el-date-picker
        v-model="value"
        @change="onChange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="daterange"
        :placeholder="$t(item.name)"
        :start-placeholder="$t('开始日期')"
        :end-placeholder="$t('结束日期')"
        style="width: 350px"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'datetimerange'">
      <el-date-picker
        v-model="value"
        @change="onChange"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :placeholder="$t(item.name)"
        :start-placeholder="$t('开始日期')"
        :end-placeholder="$t('结束日期')"
        style="width: 400px"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'cascader'">
      <el-cascader
        ref="cascader"
        @change="onChange"
        @focus="onCascaderFocus"
        v-model="value"
        :show-all-levels="false"
        :props="{
          label: item.displayValue,
          value: item.value,
          checkStrictly: true
        }"
        :options="options"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SiSearchItem',
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      },
      clear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: false,
        value: '',
        options: []
      }
    },
    watch: {
      clear(clear) {
        if (clear) {
          this.value = ''
        }
      }
    },
    methods: {
      onCascaderFocus() {
        const item = this.item
        if (item.callback) {
          const cb = item.callback
          cb().then(res => {
            this.options = res
          })
        }
      },
      // 当为select下拉选项时，获得焦点再获取选项
      onFocus() {
        const item = this.item
        if (item.callback && !item.value) {
          this.loading = true
          const cb = item.callback
          cb().then(res => {
            // 返回的res作为select的选项
            item.displayValue = res.displayValue
            item.value = res.value
            this.loading = false
          })
        }
      },
      // 首先分类型监听表单的数据变动，并把最新的value值赋值给定义的obj对象中
      onChange(e) {
        let obj = {}
        obj.key = this.item.key
        let type = this.item.type
        if (type === 'string') {
          let value = e
          if (value) {
            obj.value = value
          }
        } else if (type === 'select') {
          let value = e
          if (value !== -1) {
            obj.value = this.item.value[value]
          } else {
            obj.value = undefined
          }
        } else if (type === 'date') {
          obj.value = e
        } else if (type === 'datetime') {
          obj.value = e
        } else if (type === 'dateMinute') {
          obj.value = e
        } else if (type === 'daterange') {
          if (!e) {
            obj.value = undefined
          } else {
            obj.value = e
          }
        } else if (type === 'datetimerange') {
          if (!e) {
            obj.value = undefined
          } else {
            obj.value = e
          }
        } else if (type === 'cascader') {
          let eArr = [...e]
          if (eArr && eArr.length > 0) {
            obj.value = eArr[eArr.length - 1]
            this.$refs.cascader.dropDownVisible = false
          } else {
            obj.value = undefined
          }
        }
        // 最后通过$emit的形式通知父组件接受obj对象
        this.$emit('on-change', obj) // emit
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;

    .label,
    .content {
      display: inline-block;
    }

    .label {
      font-size: 14px;
      text-align: center;
      margin-right: 15px;
    }
  }
</style>
