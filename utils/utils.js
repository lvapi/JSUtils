// 将多维数组转换成一维数组进行
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
