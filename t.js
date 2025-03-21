const partition = (arr, left, right) => {
  // 保存枢轴元素
  const pivot = arr[left];
  while (left < right) {
    // 移动右指针
    while (left < right && arr[right] >= pivot) {
      right--;
    }
    // 放置元素
    arr[left] = arr[right];
    // 移动左指针
    while (left < right && arr[left] <= pivot) {
      left++;
    }
    // 放置元素
    arr[right] = arr[left];
  }
  // 左右指针重合位置就是枢轴元素最终位置
  arr[left] = pivot;
  return left;
};

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivot = partition(arr, left, right);
    // 排序左子序列
    quickSort(arr, left, pivot - 1);
    // 排序右子序列
    quickSort(arr, pivot + 1, right);
  }
};

module.exports = {
  quickSort,
};
