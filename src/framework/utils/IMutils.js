/*
 * @Author: your name
 * @Date: 2020-12-16 16:34:06
 * @LastEditTime: 2020-12-16 16:35:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鸣舞总后台\wang_shu_ming_wu_console\src\framework\utils\IMutils.js
 */
import emoji from '../../project/config/emoji'

export function renderText(val) {
  let regExp = /(\[.*?\])/g
  let list = []
  let result = null
  do {
    result = regExp.exec(val)
    result && list.push(result[1])
  } while (result)
  list.forEach(item => {
    val = val.replace(
      item,
      `<img style='margin: 0 1px;' width="20" src="http://demo3.wanjuanlink.com/attachment/emoji/${emoji.obj[item]}"/>`
    )
  })
  return val
}
