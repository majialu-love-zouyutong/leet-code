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
  const result = Array.from({ length: n }, () => new Array(n).fill(0));
  let num = 1;
  let rowBegin = 0,
    rowEnd = n - 1;
  let colBegin = 0,
    colEnd = n - 1;

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // 向右
    for (let j = colBegin; j <= colEnd; j++) result[rowBegin][j] = num++;
    rowBegin++;

    // 向下
    for (let i = rowBegin; i <= rowEnd; i++) result[i][colEnd] = num++;
    colEnd--;

    if (rowBegin <= rowEnd) {
      // 向左
      for (let j = colEnd; j >= colBegin; j--) result[rowEnd][j] = num++;
      rowEnd--;
    }

    if (colBegin <= colEnd) {
      // 向上
      for (let i = rowEnd; i >= rowBegin; i--) result[i][colBegin] = num++;
      colBegin++;
    }
  }

  return result;
};
```

# 链表

## 移除链表元素

> leetcode 203

```js
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let dummy = new ListNode(0, head); // 创建虚拟头节点
  let cur = dummy; // 初始化当前节点为虚拟头节点
  while (cur.next) {
    if (cur.next.val === val) {
      // 删除节点
      cur.next = cur.next.next;
    } else {
      // 继续遍历
      cur = cur.next;
    }
  }
  return dummy.next;
};
```

## 设计链表

> leetcode707
> 重点：要先设计一个`ListNode`类，再设计一个`MyLinkedList`类，实现`MyLinkedList`类中的方法。
> **虚拟头节点**

```js
/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 */

// @lc code=start

var ListNode = function (val, next) {
  this.val = val;
  this.next = next;
};
var MyLinkedList = function () {
  this.size = 0;
  this.dummyHead = new ListNode(0);
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) return -1;
  let cur = this.dummyHead;
  while (index-- >= 0) cur = cur.next;
  return cur.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.size) return;
  let node = new ListNode(val);
  let cur = this.dummyHead;
  while (index-- > 0) cur = cur.next;
  node.next = cur.next;
  cur.next = node;
  this.size++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) return;
  let cur = this.dummyHead;
  while (index-- > 0) cur = cur.next;
  cur.next = cur.next.next;
  this.size--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

## 翻转链表

> leetcode 206
> 递归 | 迭代

```js
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 递归实现
  if (!head || !head.next) return head;
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
// @lc code=end
```

```js
var reverseList = function (head) {
  if (!head) return head; // 迭代实现 - 双指针
  let pre = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
```

## 两两交换链表中的节点

> leetcode 24
> 虚拟头节点

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 如果链表为空或者只有一个节点，直接返回原链表
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    let node1 = cur.next;
    let node2 = cur.next.next;
    cur.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    cur = node1;
  }
  return dummy.next;
};
```

## 删除链表倒数第 N 个节点

> leetcode 19
> 链表的单向性

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 思路1: 先从头到尾遍历一遍获得链表长度n, 再从头遍历到目标节点的前一位
var removeNthFromEnd = function (head, n) {
  // 先遍历到末尾，获得节点长度
  let length = 0;
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next) {
    cur = cur.next;
    length++;
  }
  // 遍历到倒数第n个节点的前一个节点
  cur = dummy;
  while (length > n) {
    cur = cur.next;
    length--;
  }
  // 此时cur指向倒数第n个节点的前一个节点
  cur.next = cur.next.next;
  return dummy.next;
};
```

```js
// 思路2: 快慢指针,先让快指针走n步,再让快慢指针一起移动,当快指针指向最后一个节点时,慢指针就时目标节点的前一位
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0, head);
  let slow = dummy;
  let fast = dummy;
  while (n > 0) {
    fast = fast.next;
    n--;
  }
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
```

## 环形链表

> leetcode 142
> 循环链表的判断

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 暴利解法
var detectCycle = function (head) {
  // 如果是空链表或者只有一个节点,肯定无法成环
  if (!head || !head.next) return null;
  let cur = new ListNode(0);
  cur.next = head;
  const nodes = []; // 存储遍历过的节点
  while (cur.next) {
    if (nodes.includes(cur.next)) {
      return cur.next;
    } else {
      nodes.push(cur.next);
      cur = cur.next;
    }
  }
  // 如果跳出了循环,说明没有成环
  return null;
};
```

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  // 边界情况直接返回
  if (!head || !head.next) return null;
  let fast = head;
  let slow = head;
  // 只需判断快指针是否出界即可
  while (fast.next && fast.next.next) {
    // 快指针速度为2,慢指针速度为1
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      // 两指针相遇时,让慢指针回到起点,并调整快指针速度为1,两者再次相遇的地方即为入口
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  // 如果没有在循环中返回结果,说明快慢指针没有相遇,说明链表没有环
  return null;
};
```

# 哈希表

## 有效的字母异位词

> leetcode 242
> 哈希表 数组 ASCII 码

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const hash = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    hash[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }
  for (let i = 0; i < t.length; i++) {
    hash[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
  }
  for (let i = 0; i < 26; i++) {
    if (hash[i] !== 0) return false;
  }
  return true;
};
```

## 两个数组的交集

> leetcode 349
> Set 对象

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set();
  nums2.forEach((item) => {
    if (set1.has(item)) {
      set2.add(item);
    }
  });
  return Array.from(set2);
};
```

## 两数之和

> leetcode 1
> map 对象

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const value = target - nums[i];
    if (map.has(value)) {
      return [i, map.get(value)];
    } else {
      map.set(nums[i], i);
    }
  }
};
```

## 四数相加

> leetcode 454
> map

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const map = new Map();
  // 遍历前两个数组,将所有的和的出现次数记录到map中
  for (let num1 of nums1) {
    for (let num2 of nums2) {
      const sum = num1 + num2;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  let count = 0; // 计数结果
  // 遍历后两个数组,判断其和的相反数是否在map中,如果在,则将count加上对应的value值
  for (let num3 of nums3) {
    for (let num4 of nums4) {
      const target = -(num3 + num4);
      count += map.get(target) || 0;
    }
  }
  return count;
};
```

## 三数之和

> leetcode 15
> 排序后双指针

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b); // 排序
  if (nums[0] > 0) return []; // 如果排序后最小的都大于0,则不可能有组合
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // 如果第一个大于0,则不可能有组合
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 放置i对应的值重复
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) right--; // 大了必须让right左移
      else if (sum < 0) left++; // 小了必须让left右移
      else {
        result.push([nums[i], nums[left], nums[right]]);
        // 跳过重复值
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
  }
  return result;
};
```

## 四数之和

> leetcode 18
> 双指针

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const len = nums.length;
  if (len < 4) return [];
  const res = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 3; i++) {
    // 剪枝
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target)
      continue;
    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < len - 2; j++) {
      // 剪枝
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (nums[i] + nums[j] + nums[len - 2] + nums[len - 1] < target) continue;
      // 去重
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1;
      let r = len - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum > target) {
          r--;
        } else if (sum < target) {
          l++;
        } else {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          // 去重
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        }
      }
    }
  }
  return res;
};
```

# 字符串

## 反转字符串

> leetcode 344

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  const len = s.length;
  if (len < 2) {
    return;
  }
  let left = 0;
  let right = len - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};
```

## 反转字符串 II

> lettcode 541

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  // 将字符串转换为数组以便原地修改
  const arr = s.split('');
  for (let i = 0; i < arr.length; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, arr.length - 1); // 确保 right 不超出数组范围
    // 翻转 k 个字符
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  // 将修改后的数组转回字符串
  return arr.join('');
};
```

## 反转字符串里的单词

> leetcode 151

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s.replace(/\s+/g, ' ').trim().split(' ').reverse().join(' ');
};
```
## KMP算法

寻找文本串中是否出现过模式串.

### 前缀表
