/**
 * @author: cwlojako
 * @Date: 2020-09-10 11:10:46
 * @description: 启禁用的抽调方法
 */

const options = {
  batchChange: null,
  singleChange: null,
  singleChangeCircle: null,
  batchChangeGoods: null
}

/**
 * @author: cwlojako
 * @Date: 2020-09-10 11:15:24
 * @param: 参数1： 方法名
 * @param: 参数2： 启用接口
 * @param: 参数3： 禁用接口
 * return 返回methods混入到页面中
 */
export default (optionKeys, enableFunc, disableFunc) => {
  if (enableFunc && disableFunc) {
    // 如果后端启禁用接口是分开的， 也即是是2个接口
    options.batchChange = bindBatchChange(enableFunc, disableFunc)
    options.batchChangeGoods = bindBatchChangeGoods(enableFunc, disableFunc)
    options.singleChange = bindSingleChange(enableFunc, disableFunc)
    options.singleChangeCircle = bindSingleChangeCircle(enableFunc, disableFunc)
  } else if (enableFunc && !disableFunc) {
    // 如果后端启禁用是统一一个接口
    options.batchChange = bindBatchChange_ONE(enableFunc)
    options.singleChange = bindSingleChange_ONE(enableFunc)
    options.singleChangeNotes = bindSingleChangeNotes_ONE(enableFunc)

    // 处理其他不是启禁用的接口，但传的参数一致，参数名不一样而已
    if (optionKeys[0] !== 'batchChange' && optionKeys[0] !== 'singleChange' && optionKeys[0] !== 'singleChangeNotes') {
      options[optionKeys[0]] = bindBatchChange_ONE(enableFunc)
    }
  }
  const methods = {}
  optionKeys.forEach(key => {
    methods[key] = options[key]
  })
  return { methods }
}

/**
 * @author: cwlojako
 * @Date: 2020-09-10 14:16:03
 * @description: 批量启禁用接口,且是分开的两个接口
 */
const bindBatchChange = (_enabledFunc, _disabledFunc) => {
  return function(row, enabled, { txt, tipTxt, type, paramKey = 'idList', sort = 'desc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? this.$t(`project.启用`) : this.$t(`project.禁用`)
    tipTxt = tipTxt || `确认要${txt}所选内容?`
    type = type || 'warning'
    if (!row) {
      that.$confirm(tipTxt, '提示', { type }).then(() => {
        let idList = that.selectList.map(s => s.id)
        if (enabled) {
          _enabledFunc({ [paramKey]: idList }, res => {
            that.$message.success(`${txt}成功`)
            that.search(that.page, { sort, sortCondition })
          })
        } else {
          _disabledFunc({ [paramKey]: idList }, res => {
            that.$message.success(`${txt}成功`)
            that.search(that.page, { sort, sortCondition })
          })
        }
      })
    } else {
      let idList = [row.id]
      if (enabled) {
        _enabledFunc({ [paramKey]: idList }, res => {
          that.$message.success(`${txt}成功`)
          if (that.$route.params.id) {
            that.get()
          } else {
            that.search(that.page, { sort, sortCondition })
          }
        })
      } else {
        _disabledFunc({ [paramKey]: idList }, res => {
          that.$message.success(`${txt}成功`)
          if (that.$route.params.id) {
            that.get()
          } else {
            that.search(that.page, { sort, sortCondition })
          }
        })
      }
    }

  }
}

const bindBatchChangeGoods = (_enabledFunc, _disabledFunc) => {
  return function(row, enabled, { txt, tipTxt, type, paramKey = 'idList',booleanKey = 'sellable', sort = this.sort?this.sort:'asc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? '上架' : '下架'
    tipTxt = tipTxt || `确认要${txt}所选内容?`
    type = type || 'warning'
    if (!row) {
      that.$confirm(tipTxt, '提示', { type }).then(() => {
        let idList = that.selectList.map(s => s.id)
        if (enabled) {
          _enabledFunc({ [paramKey]: idList,[booleanKey]: enabled }, res => {
            that.$message.success(`${txt}成功`)
            that.search(that.page, { sort, sortCondition })
          })
        } else {
          _disabledFunc({ [paramKey]: idList,[booleanKey]: enabled }, res => {
            that.$message.success(`${txt}成功`)
            that.search(that.page, { sort, sortCondition })
          })
        }
      })
    } else {
      let idList = [row.id]
      if (enabled) {
        _enabledFunc({ [paramKey]: idList,[booleanKey]: enabled }, res => {
          that.$message.success(`${txt}成功`)
          if (that.$route.params.id) {
            that.get()
          } else {
            that.search(that.page, { sort, sortCondition })
          }
        })
      } else {
        _disabledFunc({ [paramKey]: idList,[booleanKey]: enabled }, res => {
          that.$message.success(`${txt}成功`)
          if (that.$route.params.id) {
            that.get()
          } else {
            that.search(that.page, { sort, sortCondition })
          }
        })
      }
    }

  }
}


/**
 * @author: cwlojako
 * @Date: 2020-09-10 14:16:03
 * @description: 批量启禁用接口,且只有一个接口
 */
const bindBatchChange_ONE = _Func => {
  return function(
    row,
    enabled,
    { txt, tipTxt, type, paramKey = 'idList', booleanKey = 'enabled', sort = this.sort?this.sort:'asc', sortCondition = 'id' }
  ) {
    let that = this
    txt = txt ? txt : enabled ? '启用' : '禁用'
    tipTxt = tipTxt || `确认要${txt}所选内容?`
    type = type || 'warning'
    that.$confirm(tipTxt, '提示', { type }).then(() => {
      let idList = row && row.id ? [row.id] : that.selectList.map(s => s.id)
      _Func({ [paramKey]: idList, [booleanKey]: enabled }, res => {
        that.$message.success(`${txt}成功`)
        if (that.$route.params.id) {
          that.get()
        } else {
          that.search(that.page, { sort, sortCondition })
        }
      })
    })
  }
}

/**
 * @author: cwlojako
 * @Date: 2020-09-10 14:16:10
 * @description: 单独启禁用 且是分开两个接口
 */
const bindSingleChange = (_enabledFunc, _disabledFunc) => {
  return function(row, enabled, { txt, paramKey = 'id', sort = this.sort?this.sort:'asc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? '启用' : '禁用'
    let func = enabled ? _enabledFunc : _disabledFunc
    func({ [paramKey]: row.id }, res => {
      if (res == undefined) {
        // 控制开关启用失败则切换原来状态
        row.enabled = !row.enabled
        return false
      }
      that.$message.success(`${txt}成功`)
      if (this.$route.params.id) {
        that.get()
      } else {
        that.search(that.page, { sort, sortCondition })
      }
    })
  }
}

/**
 * @author: zjj
 * @Date: 2021-08-17 10:58:10
 * @description: 单独启禁用 且是一个接口
 */
const bindSingleChangeNotes_ONE = _Func => {
  return function(row, enabled, { txt, paramKey = 'id', sort = this.sort?this.sort:'asc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? '启用' : '禁用'
    _Func({ [paramKey]: row.id, enabled: !enabled }, res => {
      that.$message.success(`${txt}成功`)
      if (this.$route.params.id) {
        that.get()
      } else {
        that.search(that.page, { sort, sortCondition })
      }
    })
  }
}

/**
 * @author: cwlojako
 * @Date: 2020-09-10 14:16:10
 * @description: 单独启禁用 且是一个接口
 */
const bindSingleChange_ONE = _Func => {
  return function(row, enabled, { txt, paramKey = 'id', sort = this.sort?this.sort:'asc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? '启用' : '禁用'
    _Func({ [paramKey]: row.id, enabled: enabled }, res => {
      that.$message.success(this.$t(`information.${txt}成功`))
      if (this.$route.params.id) {
        that.get()
      } else {
        that.search(that.page, { sort, sortCondition })
      }
    })
  }
}

/**
 * @author: cwlojako
 * @Date: 2020-09-10 14:16:10
 * @description: 没有批量启禁用  循环启禁用
 */
const bindSingleChangeCircle = (_enabledFunc, _disabledFunc) => {
  return function(row, enabled, { txt, tipTxt, type, paramKey = 'id', sort = this.sort?this.sort:'asc', sortCondition = 'id' }) {
    let that = this
    txt = txt ? txt : enabled ? '启用' : '禁用'
    tipTxt = tipTxt || `确认要${txt}所选内容?`
    type = type || 'warning'
    that.$confirm(tipTxt, '提示', { type }).then(() => {
      let idList = that.selectList.map(s => s.id)
      let func = enabled ? _enabledFunc : _disabledFunc
      let promises = idList.map(
        id =>
          new Promise(resolve => {
            func({ [paramKey]: id }, res => {
              resolve(res)
            })
          })
      )
      // 全部成功后再显示弹框
      Promise.all(promises).then(res => {
        that.$message.success(`${txt}成功`)
        that.search(that.page, { sort, sortCondition })
      })
    })
  }
}
