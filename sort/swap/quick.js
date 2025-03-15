// 用第一个元素将待排序序列划分为左右两个部分
function partition(arr, low, high) {
  const pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] >= pivot) {
      high--;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      low++;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotPos = partition(arr, low, high);
    quickSort(arr, low, pivotPos - 1);
    quickSort(arr, pivotPos + 1, high);
  }
}


// 测试
const arr = [2,3,4,1,44,5,6,3,2,0,9,1];
console.time();
quickSort(arr);
console.timeEnd();
console.log(arr);