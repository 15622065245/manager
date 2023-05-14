const options = {
  methods: {
    search: null,
    getTotal: null,
    handleDelete: null,
    handleDeleteCircle: null,
    batchDelete: null,
    searchBySearchItem,
    toDetail,
    toCreate,
    handleRowClick
  }
}

/**
 * author: cwlojako
 * @description: 抽调search,count,delete方法
 * @param: delFunc为不需要的方法名数组
 * @param {args}为传递过来的接口方法，遵循一定规则，第一个search,第二个count,第三个delete
 * @return {methods}
 */
export default (searchFunc, countFunc, deleteFunc, batchDeleteFunc, delFunc = []) => {
  const methods = Object.assign({}, options.methods)
  searchFunc ? (methods.search = bindSearch(searchFunc)) : delete methods.search
  countFunc ? (methods.getTotal = bindCount(countFunc)) : delete methods.getTotal
  deleteFunc ? (methods.handleDelete = bindDelete(deleteFunc)) : delete methods.handleDelete
  deleteFunc ? (methods.handleDeleteCircle = bindDeleteCircle(deleteFunc)) : delete methods.handleDeleteCircle
  batchDeleteFunc ? (methods.batchDelete = bindBatchDelete(batchDeleteFunc)) : delete methods.batchDelete
  delFunc.forEach(key => {
    delete methods[key]
  })
  return { methods }
}

/**
 * @author: cwlojako
 * @Date: 2020-09-28 13:33:29
 * @description: search方法
 * @param: page 页数
 * @param: model
 * @param: 是否需要分页参数(没有count时可使用)
 * @param: sort 排序规则（asc, desc(默认)）
 * @param: sortCondition 排序条件 默认id
 * betweenParams 时间搜索参数key值数组
 * specParams 特殊搜索参数key值数组
 * otherParams 其他关联model的搜索参数key值数组
 * additionParams search接口另外的传参参数（例 search(Report report, java.lang.Boolean isVideo, dev.paoding.longan.sql.Pageable pageable)）
 * defaultParams 当前model的默认参数（例如列表是只查找某一状态的数据 status: '直播中')
 */
const bindSearch = searchFunc => {
  return function(page = 1, { model = this.model, needPage = true, desc = this.desc===false?false:true, sortCondition = 'id' }) {
    let that = this
    this.page = page   //  =====> 更新12/30 这里为了防止在第二页搜索的时候页数还是显示第二页
    let betweenParams = that.betweenParams || []
    let specParams = that.specParams || []
    let otherParams = that.otherParams || []
    let roleParams = that.roleParams || []
    let multipleParams = that.multipleParams || [] // 多个model
    let additionParams = that.additionParams || []
    let defaultParams = that.defaultParams || []
    let param = needPage
      ? {
        pageable: {
          page,
          size: that.pageSize,
          sort: sortCondition,
          desc: desc
        },
        [model]: that.extraParam
      }
      : {
        [model]: that.extraParam
      }
    // 处理时间搜索参数
    if (betweenParams.length > 0) {
      betweenParams.forEach(item => {
        param = Object.assign(param, { [item]: that[`${item}Param`] })
      })
    }
    // 处理特殊搜索参数, 如年龄
    if (specParams.length > 0) {
      specParams.forEach(item => {
        param = Object.assign(param, { [item]: that[`${item}Param`] })
      })
    }

    // 处理其他关联model搜索参数
    if (otherParams.length > 0) {
      otherParams.forEach(item => {
        param = Object.assign(param, { [item.model]: that[`${item.model}Param`]})
      })
    }

    // 处理角色参数
    if (roleParams.length > 0) {
      roleParams.forEach(item => {
        param = Object.assign(param, { [item.model]: {"id": that[`${item.model}Param`]} })
      })
    }

    // 处理多个model的参数(目前一个只有一个地方使用)
    if (multipleParams.length > 0) {
      multipleParams.forEach(item => {
        if (param.distributor) {
          item.distributor.nickname = param.distributor.nickname
        }
        if (param.distributor) {
          item.product.name = param.distributor.name
        }
        param = Object.assign(param, item)
      })
    }

    // 处理另外参数
    if (additionParams.length > 0) {
      additionParams.forEach(item => {
        param = Object.assign(param, item)
      })
    }

    if (defaultParams.length > 0) {
      defaultParams.forEach(item => {
        that.extraParam = Object.assign(that.extraParam, item)
      })
    }

    searchFunc.call(that, param, res => {
      that.data = res
      if (that.getTotal) {
        that.getTotal(model, param)
      }
    })
  }
}

const bindCount = countFunc => {
  return function(model) {
    let that = this
    model = model || that.model
    let betweenParams = that.betweenParams || []
    let specParams = that.specParams || []
    let otherParams = that.otherParams || []
    let roleParams = that.roleParams || []
    let multipleParams = that.multipleParams || []
    let additionParams = that.additionParams || []
    let param = {
      [model]: that.extraParam
    }
    // 处理时间搜索参数
    if (betweenParams.length > 0) {
      betweenParams.forEach(item => {
        param = Object.assign(param, { [item]: that[`${item}Param`] })
      })
    }
    // 处理特殊搜索参数, 如年龄
    if (specParams.length > 0) {
      specParams.forEach(item => {
        param = Object.assign(param, { [item]: that[`${item}Param`] })
      })
    }

    // 处理其他关联model搜索参数
    if (otherParams.length > 0) {
      otherParams.forEach(item => {
        param = Object.assign(param, { [item.model]: that[`${item.model}Param`] })
      })
    }

    if (roleParams.length > 0) {
      roleParams.forEach(item => {
        param = Object.assign(param, { [item.model]: {"id": that[`${item.model}Param`]}  })
      })
    }

    if (multipleParams.length > 0) {
      multipleParams.forEach(item => {
        param = Object.assign(param, { [item.model]: {"id": that[`${item.model}Param`]}  })
      })
    }

    // 处理另外参数
    if (additionParams.length > 0) {
      additionParams.forEach(item => {
        param = Object.assign(param, item)
      })
    }

    countFunc.call(that, param, res => {
      that.total = parseInt(res)
    })
  }
}

/**
 * @description: 条件搜索函数
 * @param searchItems 搜索组件传递回来的数据对象
 * @param sortParam 包裹排序参数以及是否需要分页参数{sort: 'desc', sortCondition: 'id', needPage: true}
 * betweenParams 时间搜索参数key值数组
 * specParams 特殊搜索参数key值数组（如年龄等）
 * otherParams 其他关联model搜索参数
 */
function searchBySearchItem(searchItems, sortParam) {
  let that = this
  let betweenParams = that.betweenParams || []
  let specParams = that.specParams || []
  let otherParams = that.otherParams || []
  let roleParams = that.roleParams || []
  let multipleParams = that.multipleParams || []
  // 排序参数
  if (that.sortParam) sortParam = Object.assign({}, that.sortParam)
  // 暴露时间搜索参数
  if (betweenParams.length > 0) {
    betweenParams.forEach(item => {
      if (searchItems[item] != null || searchItems[item] != undefined) {
        let param = `${item}Param`
        that[param] = {
          start: searchItems[item][0],
          end: searchItems[item][1]
        }
      } else {
        delete that[`${item}Param`]
      }
    })
  }

  // 暴露特殊搜索参数
  if (specParams.length > 0) {
    specParams.forEach(item => {
      if (searchItems[item] != null || searchItems[item] != undefined) {
        let param = `${item}Param`
        if (item === 'age') {
          // 处理年龄搜索(0-20岁，21-40岁，60岁以上)
          let ageArr = searchItems[item].split('-')
          if (ageArr.length > 1) {
            ageArr[1] = ageArr[1].substr(0, ageArr[1].length - 1)
            that[param] = {
              start: parseInt(ageArr[0]),
              end: parseInt(ageArr[1])
            }
          } else {
            that[param] = {
              start: parseInt(ageArr[0].substr(0, 2)),
              end: 120
            }
          }
        }
      } else {
        delete that[`${item}Param`]
      }
    })
  }
  // 暴露关联model搜索参数
  if (otherParams.length > 0) {
    let emptyCount = 0
    otherParams.forEach(item => {
      if (Object.prototype.toString.call(item.value) === '[object Array]') {
        // 多个查询条件
        item.value.forEach((i, idx) => {
          // 初始化 ===
          var param = `${item.model}Param`
          if (idx === 0) that[param] = {}
          // 初始化 ===
          if (searchItems[i] != null || searchItems[i] != undefined) {
            that[param] = Object.assign(that[param], { [i]: searchItems[i] })
          } else {
            emptyCount++
            delete that[`${item.model}Param`][i]
          }
        })
        if (emptyCount === item.value.length) {
          if (Object.getOwnPropertyNames(that[`${item.model}Param`]).length == 0) {
            delete that[`${item.model}Param`]
          }
        }
      } else if (Object.prototype.toString.call(item.value) === '[object String]') {
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param` //labelParam
          that[param] = {
            [item.value]: searchItems[item.model]
          }
        } else {
          delete that[`${item.model}Param`]
        }
      } else if (!item.value) {  // ====================》更新12/30  没传value的时候，默认用传入model的名字作为发送请求的字段
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param`
          that[param] = searchItems[item.model]
        } else {
          delete that[`${item.model}Param`]
        }
      }
    })
  }

  if (roleParams.length > 0) {
    let emptyCount = 0
    roleParams.forEach(item => {
      if (Object.prototype.toString.call(item.value) === '[object Array]') {
        // 多个查询条件
        item.value.forEach((i, idx) => {
          // 初始化 ===
          var param = `${item.model}Param`
          if (idx === 0) that[param] = {}
          // 初始化 ===
          if (searchItems[i] != null || searchItems[i] != undefined) {
            that[param] = Object.assign(that[param], { [i]: searchItems[i] })
          } else {
            emptyCount++
            delete that[`${item.model}Param`][i]
          }
        })
        if (emptyCount === item.value.length) {
          delete that[`${item.model}Param`]
        }
      } else if (Object.prototype.toString.call(item.value) === '[object String]') {
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param` //labelParam
          that[param] = {
            [item.value]: searchItems[item.model]
          }
        } else {
          delete that[`${item.model}Param`]
        }
      } else if (!item.value) {  // ====================》更新12/30  没传value的时候，默认用传入model的名字作为发送请求的字段
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param`
          that[param] = searchItems[item.model]
        } else {
          delete that[`${item.model}Param`]
        }
      }
    })
  }

  if (multipleParams.length > 0) {
    let emptyCount = 0
    multipleParams.forEach(item => {
      if (Object.prototype.toString.call(item.value) === '[object Array]') {
        // 多个查询条件
        item.value.forEach((i, idx) => {
          // 初始化 ===
          var param = `${item.model}Param`
          if (idx === 0) that[param] = {}
          // 初始化 ===
          if (searchItems[i] != null || searchItems[i] != undefined) {
            that[param] = Object.assign(that[param], { [i]: searchItems[i] })
          } else {
            emptyCount++
            delete that[`${item.model}Param`][i]
          }
        })
        if (emptyCount === item.value.length) {
          delete that[`${item.model}Param`]
        }
      } else if (Object.prototype.toString.call(item.value) === '[object String]') {
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param` //labelParam
          that[param] = {
            [item.value]: searchItems[item.model]
          }
        } else {
          delete that[`${item.model}Param`]
        }
      } else if (!item.value) {  // ====================》更新12/30  没传value的时候，默认用传入model的名字作为发送请求的字段
        if (searchItems[item.model] != null || searchItems[item.model] != undefined) {
          let param = `${item.model}Param`
          that[param] = searchItems[item.model]
        } else {
          delete that[`${item.model}Param`]
        }
      }
    })
  }

  that.extraParam = Object.assign({}, searchItems)

  // ==============================清除extraParam其他关联model的搜索字段==============================
  betweenParams.forEach(item => {
    delete that.extraParam[item]
  })
  specParams.forEach(item => {
    delete that.extraParam[item]
  })

  otherParams.forEach(item => {
    if (Object.prototype.toString.call(item.value) === '[object Array]') {
      item.value.forEach(i => {
        delete that.extraParam[i]
      })
    } else {
      delete that.extraParam[item.model]
    }
  })
  roleParams.forEach(item => {
    if (Object.prototype.toString.call(item.value) === '[object Array]') {
      item.value.forEach(i => {
        delete that.extraParam[i]
      })
    } else {
      delete that.extraParam[item.model]
    }
  })

  multipleParams.forEach(item => {
    if (Object.prototype.toString.call(item.value) === '[object Array]') {
      item.value.forEach(i => {
        delete that.extraParam[i]
      })
    } else {
      delete that.extraParam[item.model]
    }
  })
  // ==============================清除extraParam其他关联model的搜索字段==============================
  that.search(1, sortParam)
}

// 单条删除
const bindDelete = deleteFunc => {
  return function(id, {sort = 'asc', sortCondition = 'id'}) {  // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
    let that = this
    let param = {
      id
    }
    that
      .$confirm(that.$t('project.删除后不可恢复，是否确认删除'), '提示', {
        confirmButtonText: that.$t('project.确定'),
        cancelButtonText: that.$t('project.取消'),
        type: 'warning'
      })
      .then(() => {
        deleteFunc.call(that, param, res => {
          that.$message.success(that.$t('project.删除成功'))
          that.search(that.page, {sort, sortCondition}) // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
        })
      })
      .catch(() => {
        that.$message.info(that.$t('project.已取消操作'))
      })
  }
}

// 批量删除
const bindBatchDelete = batchDeleteFunc => {
  return function(row, { paramKey = 'idList', sort = 'asc', sortCondition = 'id' }) {  // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
    let that = this
    let idList = row && row.id ? [row.id] : that.selectList.map(s => s.id)
    this.$confirm(that.$t('project.删除后不可恢复，是否确认删除'), '提示', {
      confirmButtonText: that.$t('project.确定'),
      cancelButtonText: that.$t('project.取消'),
      type: 'warning'
    })
      .then(() => {
        batchDeleteFunc({ [paramKey]: idList }, res => {
          that.$message.success(that.$t('project.删除成功'))
          that.search(that.page, { sort, sortCondition }) // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
        })
      })
      .catch(() => {
        this.$message.info(that.$t('project.已取消操作'))
      })
  }
}

// 单条循环删除
const bindDeleteCircle = deleteFunc => {
  return function({ paramKey = 'id', sort = 'asc', sortCondition = 'id' }) {  // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
    let that = this
    that
      .$confirm(that.$t('project.删除后不可恢复，是否确认删除'), '提示', {
        confirmButtonText: that.$t('project.确定'),
        cancelButtonText: that.$t('project.取消'),
        type: 'warning'
      })
      .then(() => {
        let idList = that.selectList.map(s => s.id)
        let promises = idList.map(
          id =>
            new Promise(resolve => {
              deleteFunc({ [paramKey]: id }, res => {
                resolve(res)
              })
            })
        )
        // 全部成功后再显示弹框
        Promise.all(promises).then(res => {
          that.$message.success(that.$t('project.删除成功'))
          that.search(that.page, {sort, sortCondition}) // ====================》更新12/30 删除之后列表也可以根据排序规则来排序
        })
      })
      .catch(() => {
        this.$message.info(that.$t('project.已取消操作'))
      })
  }
}

// 到详情页
function toDetail(row, route, query = {}) {
  this.$router.push({
    query,
    path: `${route}${row.id}`
  })
}

// 新建
function toCreate() {
  this.createVisible = true
}

// 双击表格行
function handleRowClick(row) {
  this.editId = row.id
  this.row = row
  this.editVisible = true
}
