/*
* 将多维数组转换成一维数组进行
*/
const flat = function() {
  var arr = [1, [[2, 3], 4], 5]
  var ans = []
  function toLineArr(arr, ans) {
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'number') {
        ans.push(arr[i])
      } else {
        toLineArr(arr[i], ans)
      }
    }
  }
  toLineArr(arr, ans)
  console.log(ans)
}
/*
* 深拷贝
*/
/*
* 使用JSON 先转字符串(JS中为基本类型值) 然后转数组
* 缺点无法拷贝方法数据
*/
const cloneByJson = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}
/*
* 使用递归进行简单的拷贝
*/
const deepClone = function() {
  var arr = [1, [2, 3], { a: 111, b: 222 }, function() {
  }, null, undefined]
  function cloneDeep(set) {
    if (arr === null) {
      return null
    } else if (typeof arr === 'undefined') {
      return undefined
    }
    const obj = Array.isArray(arr) ? [] : {}
    for (const key in arr) {
      if (typeof arr[key] !== 'object') {
        obj[key] = arr[key]
      } else {
        obj[key] = cloneDeep(arr[key])
      }
    }
    return obj
  }
  console.log(cloneDeep(arr))
  console.log(arr)
}
/*
 *返回给定数据的类型
 */
const valueType = function(val) {
  if (typeof val !== 'object') {
    return typeof val
  } else {
    // typof null 为object
    if (val === null) {
      return 'null'
    } else {
      return Object.prototype.toString.call(val)
    }
  }
}
