function simpleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minPos = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minPos]) {
        minPos = j;
      }
    }
    [arr[i],arr[minPos]] = [arr[minPos], arr[i]];
  }
}

// 测试
const arr = [2,3,4,1,44,5,6,3,2,0,9,1];
console.time();
simpleSort(arr);
console.timeEnd();
console.log(arr);