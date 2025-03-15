function insertSort(arr) {
  // 第一个记录已经排好,因为只有它一个
  // 从第二个开始
  for (let i = 1; i < arr.length; i++) {
    // 记录当前值,方式被覆盖
    const current = arr[i];
    // 从当前值的前一位开始,如果大于当前值,则后移一位
    let j = i - 1;
    // 边界条件是数组开头
    while (j >= 0 && arr[j] > current) {
      // 将大于当前值的记录后移一位
      arr[j + 1] = arr[j];
      // 指针前移一位
      j--;
    }
    // 插入当前值
    arr[j + 1] = current;
  }
}
// 测试
let arr = [3, 4, 2, 1, 5, 6, 7, 8];
console.time();
insertSort(arr);
console.log(arr);
console.timeEnd();

// [
//   1, 2, 3, 4,
//   5, 6, 7, 8
// ]
// default: 1.196s