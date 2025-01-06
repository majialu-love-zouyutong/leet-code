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
