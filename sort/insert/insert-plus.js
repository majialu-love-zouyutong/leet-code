function insertPlusSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // 从下标为1开始遍历
    // 保存当前值防止被覆盖
    const current = arr[i];
    // 折半查找插入位置
    let low = 0; 
    let high = i - 1;
    while (low <= high) {
      let mid = (low + high) >> 1;
      if (arr[mid] <= current) {
        low = mid + 1;
      }else {
        high = mid - 1;
      }
    }
    // [low,i-1]的所有数都右移一位
    for (let j = i - 1; j >= low; j--) {
      arr[j + 1] = arr[j];
    }
    // 将当前值插入low位置
    arr[low] = current;
  }
}

// 测试
let arr = [3, 4, 2, 1, 5, 6, 7, 8];
console.time();
insertPlusSort(arr);
console.log(arr);
console.timeEnd();

// Debugger attached.
// [
//   1, 2, 3, 4,
//   5, 6, 7, 8
// ]
// default: 6.676ms