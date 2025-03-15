/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle.length === 0) return 0;
  
  for (let start = 0; start <= haystack.length - needle.length; start++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[start + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) return start;
  }
  return -1;
};

const str = 'aabaabaaf';

const kmp = 'aabaaf';

console.log(strStr(str, kmp));
