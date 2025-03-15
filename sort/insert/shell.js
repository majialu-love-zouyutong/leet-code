// 希尔排序
function shellSort(arr) {
  let len = arr.length;
  while (len > 1) {
    // 缩小增量
    len = Math.floor(len / 2);
    // 遍历增量
    for (let i = 0; i < len; i++) {
      // 遍历当前增量
      for (let j = i + len; j < arr.length; j += len) {
        // 记录当前值
        const current = arr[j];
        // 记录当前值前一位
        let k = j - len;
        while (k >= 0 && arr[k] > current) {
          // 将大于当前值的记录后移一位
          arr[k + len] = arr[k];
          // 指针前移一位
          k -= len;
        }
        arr[k + len] = current;
      }
    }
  }
}

const arr = [1, 3, 5, 7, 9, 2, 4, 6, 8, 0];
console.time();
shellSort(arr);
console.timeEnd();
console.log(arr);