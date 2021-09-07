export default function splitString(obj) {
// 双指针滑动分割驼峰字符
  let ans = []; // 需返回的值
  for (let key in obj) {
    let st = key;
    let left = 0; // 左指针
    let right = 0; // 右指针
    let arr = []; // 保存分割后的单词
    st = st.replace(
      String(st.charAt(0)),
      String(st.charAt(0)).toUpperCase()
    );
    let len = st.length;
    for (let i = 0; i < len; i++) {
      left = i;
      if (st.charAt(left) >= 'A' && st.charAt(left) <= 'Z') {
        right = left + 1;
        while (
          right < len &&
            (st.charAt(right) < 'A' || st.charAt(right) > 'Z')
        ) {
          right++;
        }
        st.replace(st.charAt(left), st.charAt(left).toUpperCase());
        arr.push(st.substring(left, right));
      }
    }
    let keyTemp = arr.join(' '); // 合并格式化后的字符串
    let tempObj = {};  
    tempObj[keyTemp] = obj[key]; // 创建新的对象并将值合并
    let temp = [];
    temp.push(keyTemp);
    temp.push(tempObj);
    ans.push(temp); // 保存组装后的数据
  }
  return ans;

}
