/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  // 边界条件: 空字符串直接返回0
  if (needle.length === 0) return 0;
  // 获取next数组
  const getNextArr = (s) => {
    const next = new Array(s.length).fill(0);
    let j = 0;    // 前缀末尾指针,也代表当前最长相等的前后缀长度
    // 遍历模式串
    for (let i = 1; i < s.length; i++) {
      // 当不匹配时,根据next数组进行回退
      while (j > 0 && s[i] !== s[j]) {
        j = next[j-1];
      }

      // 匹配时前缀指针后移一位
      if (s[i] === s[j]) {
        j++;
      }

      // 更新next数组
      next[i] = j;
    }
    return next;
  }
  // KMP算法
  const next = getNextArr(needle);

  let j = 0;    // 模式串指针
  // 遍历文本串
  for (let i = 0; i < haystack.length; i++) {
    // 不匹配时,根据next数组进行回退
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j-1];
    }

    // 匹配时模式串指针后移一位
    if (haystack[i] === needle[j]) {
      j++;
    }

    // 如果完全匹配,则返回匹配的起始位置
    if (j === needle.length) {
      return i - needle.length + 1;
    }
  }
  // 不匹配返回-1
  return -1;
};