
// 分页参数以及分页方法的抽调代码
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      selectList: []
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      if (this.sortParam) {
        this.search(this.page, this.sortParam)
      } else {
        this.search(this.page, {})
      }

    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      if (this.sortParam) {
        this.search(this.page, this.sortParam)
      } else {
        this.search(this.page, {})
      }
    },

    handleSelectionChange(val) {
      this.selectList = val
    }
  }
}
