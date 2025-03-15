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
const generateMatrix = function (n) {
  const result = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let rowBegin = 0,
    rowEnd = n - 1;
  let colBegin = 0,
    colEnd = n - 1;
  let num = 1;

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // 向右
    for (let i = colBegin; i <= colEnd; i++) {
      result[rowBegin][i] = num++;
    }
    rowBegin++;

    // 向下
    for (let i = rowBegin; i <= rowEnd; i++) {
      result[i][colEnd] = num++;
    }
    colEnd--;

    // 向左
    for (let i = colEnd; i >= colBegin; i--) {
      result[rowEnd][i] = num++;
    }
    rowEnd--;

    // 向上
    for (let i = rowEnd; i >= rowBegin; i--) {
      result[i][colBegin] = num++;
    }
    colBegin++;
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
  const visited = new Set();
  while (head !== null) {
    if (visited.has(head)) {
      return head;
    }
    visited.add(head);
    head = head.next;
  }
  return null;
};
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  // 如果链表为空,直接返回null
  if (head === null) {
    return null;
  }
  // 慢指针一次移动一格,快指针一次移动两格
  let slow = head;
  let fast = head;
  while (fast !== null) {
    slow = slow.next;
    if (fast.next !== null) {
      fast = fast.next.next;
    } else {
      // 如果快指针到了null,说明肯定无环
      return null;
    }
    if (fast === slow) {
      // 相遇的位置
      // x = z + (n - 1)(y+z)
      // 所以让一个指针从链表头开始,另一个从相遇点开始,速度
      // 均为1
      // 当两个指针再次相遇时,就是环的入口
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
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

## KMP 算法

寻找文本串中是否出现过模式串.

举例:

- 文本串: aabaabaaf
- 模式串: aabaaf

### 前缀表

- **前缀**: 包含首字母, 不包含尾字母的所有子串
- **后缀**: 包含尾字母, 不包含首字母的所有子串

最长相等前后缀

举例:

| 字符串 | 最长相等前后缀 |                   备注                    |
| :----: | :------------: | :---------------------------------------: |
|   a    |       0        |       a 只有一个字母,没有前缀和后缀       |
|   aa   |       1        | aa 有两个字母,只有一个前缀和后缀 a,且相等 |
|  aab   |       0        |       aab 的后缀中还有 b,前缀中没有       |
|  aaba  |       1        |         aaba 有一个相等的前后缀 a         |
| aabaa  |       2        |     aabaa 有两个相等的前后缀 a 和 aa      |
| aabaaf |       0        |      aabaaf 中后缀含有 f,前缀中没有       |

## 具体实现

```js
const str = 'aabaacaaf';

const kmp = 'aabaaf';

function getNextArr(s) {
  const next = new Array(s.length).fill(0); // 初始化数组
  let j = 0; // 前缀末尾指针,也代表当前最长相等的前后缀长度

  for (let i = 1; i < s.length; i++) {
    // 前后缀不同时回退
    while (j > 0 && s[i] !== s[j]) {
      j = next[j - 1]; // 核心回退操作
    }

    // 找到相同的前后缀
    if (s[i] === s[j]) {
      j++;
    }

    // 更新next数组
    next[i] = j;
  }
  return next;
}

// KMP算法实现
function kmpSearch(text, pattern) {
  const next = getNextArr(pattern); // 获取模式串的next数组
  let j = 0; // 模式串的指针

  // 遍历文本串
  for (let i = 0; i < text.length; i++) {
    // 当字符不匹配时，根据next数组回退模式串的指针
    while (j > 0 && text[i] !== pattern[j]) {
      j = next[j - 1];
    }

    // 字符匹配时，移动模式串指针
    if (text[i] === pattern[j]) {
      j++;
    }

    // 如果模式串完全匹配，返回匹配的起始位置
    if (j === pattern.length) {
      return i - pattern.length + 1;
    }
  }

  // 未找到匹配，返回-1
  return -1;
}

// 测试KMP算法
const result = kmpSearch(str, kmp);
console.log(result); // 输出匹配的起始位置
```

## 重复的子字符串

> leetcode 459

# 动态规划

## 理论基础

### 常见类型

- 动规基础
- 背包问题
- 打家劫舍
- 股票问题
- 子序列问题

### 动态规划误区

不要沉浸于具体的状态转移方程,而是掌握解题步骤.

### DP 数组的含义

- 搞清楚 dp 数组以及下标的含义

### 递推公(状态转移方程)

如何找到递推公式

### DP 数组初始化

如何初始化 DP 数组

### DP 数组遍历顺序

如何选择合适的遍历顺序

### 打印 DP 数组

在 Debug 的时候多打印 DP 数组,对应其含义.

### 动态规划五部曲

- DP 数组的含义
- 递推公式
- DP 数组初始化
- DP 数组遍历顺序
- 打印 DP 数组

## 斐波那契数列

> leetcode 509.

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  // 动规五部曲
  // 1. 确定dp数组及其下标的含义,dp[i]表示第i个斐波那契数列的值
  // 2. 递推公式: dp[i] = dp[i-1] + dp[i-2]
  // 3. 初始化dp数组
  const dp = [];
  dp[0] = 0;
  dp[1] = 1;
  // 4. 遍历dp数组
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  // 5. 打印dp数组调试
  // 返回
  return dp[n];
};
```

## 爬楼梯

> leetcode 70

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // 1. dp数组含义: dp[i]表示有爬到第i阶的方法总数
  // 2. 状态转移方程: dp[i] = dp[i-2] + dp[i-1]
  // 3. dp数组初始化: dp[1] = 1, dp[2] = 2;
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;
  // 4. dp数组遍历: 从前往后遍历
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
  // 5. dp数组打印调试
};
```

## 使用最小花费爬楼梯

> leetcode 746

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  // 1. dp数组的含义
  // dp[i]表示到达下标i的位置所需花费的最小值
  // 2. 状态转移方程
  // dp[i] = Math.min((dp[i-1] + cost[i-1]),(dp[i-2] + cost[i-2]))
  // 3. dp数组初始化
  const dp = [];
  dp[0] = 0;
  dp[1] = 0;
  // 4. dp数组遍历
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[cost.length];
  // 5. 打印调试
};
```

```js
// 优化空间复杂度

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  // 1. dp[i]表示达到i处的最小花费
  // 2. dp[i] = Math.min((dp[i-1] + cost[i-1]),(dp[i-2]+cost[i-2]))
  let front = 0;
  let mid = 0;
  let end;
  for (let i = 2; i <= cost.length; i++) {
    end = Math.min(mid + cost[i - 1], front + cost[i - 2]);
    front = mid;
    mid = end;
  }
  return end;
};
```

## 不同路径

> leetcode 62

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 1. dp[i][j]表示从start到i,j的不同路径数
  // 2. dp[i][j] = dp[i-1][j] + dp[i][j-1]
  // 3. 初始化dp数组
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  // 4. 遍历dp数组
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
```

```js
// 优化空间复杂度
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // dp[j]同时表示dp[i-1][j]和dp[i][j]
  const dp = new Array(n).fill(1);

  // 递推公式dp[j] = dp[j-1] + dp[j] 这里的dp[j-1]就是已经更新后的左边的值,dp[j]是尚未更新的上面的值
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
};
```

## 不同路径 II

> leetcode 63

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  // dp[i][j]表示达到i,j的不同路径数
  /**
   *   if obstacleGrid[i][j] === 1, dp[i][j] = 0
   *   else dp[i][j] = d[i-1][j] + dp[i][j-1]
   */
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1;
  }
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};
```

```js
// 优化空间复杂度
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = new Array(n).fill(0);

  // 初始化第一行
  dp[0] = obstacleGrid[0][0] === 1 ? 0 : 1;
  for (let j = 1; j < n; j++) {
    dp[j] = obstacleGrid[0][j] === 0 && dp[j - 1] === 1 ? 1 : 0;
  }

  for (let i = 1; i < m; i++) {
    // 处理当前行首列
    dp[0] = obstacleGrid[i][0] === 1 ? 0 : dp[0];

    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0;
      } else {
        dp[j] += dp[j - 1];
      }
    }
  }
  return dp[n - 1];
};
```

## 整数拆分

> leetcode 343

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  // dp[i]表示对i进行拆分得到的最大乘积
  // dp[i] = max(j * dp[i-j]),j=1,2...i-1;
  const dp = new Array(n + 1).fill(0);
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], j * dp[i - j], j * (i - j));
    }
  }
  return dp[n];
};
```

## TODO: 不同的二叉搜索树

> leetcode 96

## 0-1 背包问题理论基础

### 背包问题概述

- 0-1 背包: 有 n 种物品,每种物品只有一个,每个物品有自己的重量和价值,问最多价值
- 完全背包
- 多重背包

### 背包的暴力解法

|  维度  | 重量 | 价值 |
| :----: | :--: | :--: |
| 物品 0 |  1   |  15  |
| 物品 1 |  3   |  20  |
| 物品 2 |  4   |  30  |

背包的最大重量为 4

```js
// 1. dp数组的含义
// dp[i][j]表示下标为[0,i]的物品任取,放入重量为j的背包中所能得的最大价值
// 2. 递推公式
// dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-weight[i]] + value[i])
// 如果放物品i,则dp[i][j] = dp[i-1][j-weight[i]] + value[i]
// 如果不放物品i,则dp[i][j] = dp[i-1][j]
// 3. 初始化dp数组
// dp[0][j] = 0;
// dp[i][0] = j > weight[i] ? value[i] : 0;
// 4. 遍历dp数组
// 在使用二维数组的时候,既可以先遍历i,也可以先遍历j
```

```js
const rl = require('readline').createInterface({
  input: process.stdin,
});

var iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

void (async function () {
  const [n, bagWeight] = (await readline()).split(' ').map(Number);
  const weight = (await readline()).split(' ').map(Number);
  const value = (await readline()).split(' ').map(Number);

  // dp[i][j]表示从0到i的背包任选,放入容量为j的背包,所能有的最大价值
  // dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])
  // 初始化dp[0][j]如果j > weight[0],dp[i][j]=value[0],
  // dp[i][0] = 0
  // 遍历都可以
  const dp = new Array(n).fill(0).map(() => new Array(bagWeight + 1).fill(0));

  for (let j = weight[0]; j <= bagWeight; j++) {
    dp[0][j] = value[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= bagWeight; j++) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  console.log(dp[n - 1][bagWeight]);
})();
```

## 0-1 背包问题滚动数组优化

> 这里注意一定要从后往前遍历,否则会出错(因为要从后往前会读取到新值,而不是旧值 )

```js
const rl = require('readline').createInterface({
  input: process.stdin,
});

var iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

void (async function () {
  const [n, bagWeight] = (await readline()).split(' ').map(Number);
  const weight = (await readline()).split(' ').map(Number);
  const value = (await readline()).split(' ').map(Number);
  // dp[j]表示容量为j的背包最大价值
  const dp = new Array(bagWeight + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = bagWeight; j > 0; j--) {
      if (j >= weight[i]) {
        dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
      }
    }
  }
  console.log(dp[bagWeight]);
})();
```

## 分割等和子集

> leetcode 416

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  // dp[j]表示从0-i任选,能否组成j
  // dp[j] = dp[j] || dp[j-nums[i]]
  const dp = new Array(target + 1).fill(true);
  // dp[0] = true;
  for (let j = 1; j <= target; j++) {
    if (nums[0] !== j) {
      dp[j] = false;
    }
  }
  for (let i = 1; i < nums.length; i++) {
    for (let j = target; j > 0; j--) {
      if (nums[i] < j) {
        dp[j] = dp[j] || dp[j - nums[i]];
      }
    }
    // if (dp[target]) return true;
  }
  return dp[target];
};
```

## 最后一块石头的重量 II

> leetcode 1049

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const sum = stones.reduce((a, b) => a + b, 0);
  const target = Math.floor(sum / 2);
  const dp = new Array(target + 1).fill(true);
  // dp[j] 表示能否组成j
  for (let j = 1; j <= target; j++) {
    if (stones[0] !== j) {
      dp[j] = false;
    }
  }
  for (let i = 1; i < stones.length; i++) {
    for (let j = target; j > 0; j--) {
      if (stones[i] <= j) {
        dp[j] = dp[j] || dp[j - stones[i]];
      }
    }
  }
  for (let j = target; ; j--) {
    if (dp[j]) {
      return sum - 2 * j;
    }
  }
};
```
