const threeSum = require('./t.js');

test('测试三数之和，处理重复元素', () => {
  // 测试用例1：包含重复元素，但结果不应有重复三元组
  const nums1 = [-1, 0, 1, 2, -1, -4];
  expect(threeSum(nums1)).toEqual([[-1, -1, 2], [-1, 0, 1]]);

  // 测试用例2：所有元素相同，但结果应为空数组
  const nums2 = [0, 0, 0, 0];
  expect(threeSum(nums2)).toEqual([[0, 0, 0]]);

  // 测试用例3：包含多个重复元素，但结果不应有重复三元组
  const nums3 = [-2, 0, 0, 2, 2];
  expect(threeSum(nums3)).toEqual([[-2, 0, 2]]);

  // 测试用例4：无解的情况
  const nums4 = [1, 2, 3, 4];
  expect(threeSum(nums4)).toEqual([]);
});