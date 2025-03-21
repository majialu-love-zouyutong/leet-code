const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    // 递归结束条件
    const pivot = partition(arr, left, right);
    // 排序左子序列
    quickSort(arr, left, pivot - 1);
    // 排序右子序列
    quickSort(arr, pivot + 1, right);
  }
};

const partition = (arr, left, right) => {
  // 保存第一个元素为枢轴元素
  const pivot = arr[left];
  // 循环条件
  while (left < right) {
    // 移动右指针
    while (left < right && arr[right] >= pivot) {
      right--;
    }
    // 将右指针所指元素放到左指针位置
    arr[left] = arr[right];
    // 移动左指针
    while (left < right && arr[left] <= pivot) {
      left++;
    }
    // 将左指针所指元素放到右指针位置
    arr[right] = arr[left];
  }
  // 将枢轴元素放到最终位置
  arr[left] = pivot;
  return left;
};

module.exports = {
  quickSort,
};
