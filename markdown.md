# 数组

## 二分查找

> leetcode 704
> 重点：区间的开闭分析

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 左闭右闭写法
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (target < nums[mid]) right = mid - 1;
    else if (target > nums[mid]) left = mid + 1;
    else return mid;
  }
  return -1;
};
```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 左闭右开写法
  let left = 0,
    right = nums.length;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (target < nums[mid]) right = mid;
    else if (target > nums[mid]) left = mid + 1;
    else return mid;
  }
  return -1;
};
```

## 移除元素

> leetcode 27
> 重点：快慢指针

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  // 双指针解法
  let slow = 0;
  let fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) nums[slow++] = nums[fast];
    fast++;
  }
  return slow;
};
```

## 有序数组的平方

> leetcode 977
> 重点：左右双指针

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  // 因为原数组各个元素平方后
  // 呈现两头大，中间小的趋势
  // 所以使用双指针，分别指向首尾
  const n = nums.length;
  const result = new Array(n).fill(0);
  let left = 0;
  let right = n - 1;
  let position = n - 1;
  while (left <= right) {
    let l = nums[left] * nums[left];
    let r = nums[right] * nums[right];
    if (l >= r) {
      result[position] = l;
      left++;
    } else {
      result[position] = r;
      right--;
    }
    position--;
  }
  return result;
};
```

## 长度最小的子数组

> leetcode 209
> 重点：滑动窗口

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let len = Infinity; // 初始长度
  let sum = 0;
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // 滑动窗口右延
    while (sum >= target) {
      len = Math.min(len, right - left + 1);
      sum -= nums[left++]; // 滑动窗口左缩
    }
  }
  return len === Infinity ? 0 : len;
};
```

## 螺旋矩阵

> leetcode 59
> 重点：模拟

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const result = Array.from({ length: n }, () =>
    new Array(n).fill(0)
  );
  let num = 1;
  let rowBegin = 0,
    rowEnd = n - 1;
  let colBegin = 0,
    colEnd = n - 1;

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // 向右
    for (let j = colBegin; j <= colEnd; j++)
      result[rowBegin][j] = num++;
    rowBegin++;

    // 向下
    for (let i = rowBegin; i <= rowEnd; i++)
      result[i][colEnd] = num++;
    colEnd--;

    if (rowBegin <= rowEnd) {
      // 向左
      for (let j = colEnd; j >= colBegin; j--)
        result[rowEnd][j] = num++;
      rowEnd--;
    }

    if (colBegin <= colEnd) {
      // 向上
      for (let i = rowEnd; i >= rowBegin; i--)
        result[i][colBegin] = num++;
      colBegin++;
    }
  }

  return result;
};
```
