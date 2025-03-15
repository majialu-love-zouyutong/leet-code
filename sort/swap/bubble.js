// 冒泡排序
function bubbleSort(arr) {
  // 从后往前,把小的交换到最前面
  // 遍历结束位置
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        // 如果小于前一位,则交换
        [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
      }
    }
  }
}

// 测试
const arr = [2,3,4,1,44,5,6,3,2,0,9,1];
console.time();
bubbleSort(arr);
console.timeEnd();
console.log(arr);